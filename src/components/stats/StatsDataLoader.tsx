
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { getOpinionsByCategory } from "@/api/opinionsApi";
import { processServerOpinions, processLocalOpinions } from "@/utils/statsProcessing";
import { ProcessedStats } from "@/types/stats";
import { useOpinionStorage } from "@/hooks/useOpinionStorage";
import { fetchWithRetries, API_URL } from "@/api/core/apiClient";
import { useStatsEventHandlers } from "@/hooks/useStatsEventHandlers";
import { getSectionCategory, getSectionProjectTypes } from "@/utils/statsMapping";

export const useStatsDataLoader = (activeSection: string, dataSource: string, filters: any) => {
  const { toast } = useToast();
  const { getOpinions, isLoaded } = useOpinionStorage();
  const [stats, setStats] = useState<ProcessedStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Get section-specific stats from server
  const getSectionStats = async (section: string) => {
    try {
      const response = await fetchWithRetries(`${API_URL}/opinions/stats/${section}`, { method: 'GET' });
      return response;
    } catch (error) {
      console.error(`Error fetching ${section} stats:`, error);
      throw error;
    }
  };

  const loadStats = async () => {
    console.log('StatsDataLoader: Loading stats for section:', activeSection, 'with data source:', dataSource);
    setIsLoading(true);
    
    try {
      let opinions: any[] = [];
      let userNotes: any[] = [];
      
      if (dataSource === 'local') {
        // Wait for opinion storage to be loaded before processing
        if (!isLoaded) {
          console.log('StatsDataLoader: Opinion storage not loaded yet, waiting...');
          setIsLoading(false);
          return;
        }
        
        // Use local storage data
        const localOpinions = getOpinions();
        console.log('StatsDataLoader: Retrieved local opinions for stats:', localOpinions);
        
        const sectionProjectTypes = getSectionProjectTypes(activeSection);
        opinions = sectionProjectTypes.length > 0 
          ? localOpinions.filter((opinion: any) => sectionProjectTypes.includes(opinion.projectType))
          : localOpinions;

        // Extract notes from local opinions
        userNotes = opinions.filter((opinion: any) => opinion.notes && opinion.notes.trim());
        
        console.log('StatsDataLoader: Filtered local opinions for section:', opinions.length);
      } else {
        // Use server data - try section-specific endpoint first
        try {
          const sectionData = await getSectionStats(activeSection);
          
          if (sectionData && sectionData.userNotes) {
            userNotes = sectionData.userNotes;
            
            // Convert section data to opinion format for processing
            opinions = [];
            
            // Handle different section data structures
            if (activeSection === 'films' && sectionData.industryStats) {
              opinions = sectionData.industryStats.map((stat: any) => ({
                projectType: 'Films',
                filmIndustry: stat._id,
                count: stat.count
              }));
            } else if (activeSection === 'television' && sectionData.channelStats) {
              opinions = sectionData.channelStats.map((stat: any) => ({
                projectType: 'Television',
                televisionChannel: stat._id,
                count: stat.count
              }));
            } else if (activeSection === 'youtube-content' && sectionData.categoryStats) {
              opinions = sectionData.categoryStats.map((stat: any) => ({
                projectType: 'YouTubeContent',
                youtubeContentCategory: stat._id,
                count: stat.count
              }));
            } else if (activeSection === 'ott' && sectionData.platformStats) {
              opinions = sectionData.platformStats.map((stat: any) => ({
                projectType: 'OTTPlatform',
                ottPlatform: stat._id,
                count: stat.count
              }));
            }
          }
        } catch (sectionError) {
          console.log('StatsDataLoader: Section-specific endpoint not available, falling back to category endpoint');
          
          // Fallback to category-based data
          const apiFilters: any = {};
          
          if (filters.dateRange !== "all") {
            apiFilters.timeframe = filters.dateRange;
          }
          
          if (filters.selectedCountry !== "all") {
            apiFilters.region = filters.selectedCountry;
          }

          const category = getSectionCategory(activeSection);
          console.log('StatsDataLoader: Fetching opinions for category:', category, 'with filters:', apiFilters);
          
          opinions = await getOpinionsByCategory(category, apiFilters);
          console.log('StatsDataLoader: Received server opinions:', opinions);
          
          const sectionProjectTypes = getSectionProjectTypes(activeSection);
          opinions = sectionProjectTypes.length > 0 
            ? opinions.filter((opinion: any) => sectionProjectTypes.includes(opinion.projectType))
            : opinions;

          // Extract notes from opinions
          userNotes = opinions.filter((opinion: any) => opinion.notes && opinion.notes.trim());
        }
      }

      // Apply additional filters
      let finalOpinions = opinions.filter((opinion: any) => {
        if (filters.selectedCountry !== "all" && opinion.country !== filters.selectedCountry) return false;
        if (filters.selectedGender !== "all" && opinion.demographics?.gender !== filters.selectedGender) return false;
        if (filters.selectedAge !== "all" && opinion.demographics?.age !== filters.selectedAge) return false;
        if (filters.selectedFilmIndustry !== "all" && opinion.filmIndustry !== filters.selectedFilmIndustry) return false;
        if (filters.selectedOttPlatform !== "all" && opinion.ottPlatform !== filters.selectedOttPlatform) return false;
        if (filters.selectedYoutubeCategory !== "all" && opinion.youtubeContentCategory !== filters.selectedYoutubeCategory) return false;
        if (filters.selectedProjectType !== "all" && opinion.projectType !== filters.selectedProjectType) return false;
        if (filters.selectedTvChannel !== "all" && opinion.televisionChannel !== filters.selectedTvChannel) return false;
        
        return true;
      });

      console.log('StatsDataLoader: Final filtered opinions for stats:', finalOpinions.length);

      const processedStats = dataSource === 'local' 
        ? processLocalOpinions(finalOpinions)
        : processServerOpinions(finalOpinions);
      
      // Add user notes to stats
      processedStats.userNotes = userNotes;
      
      console.log('StatsDataLoader: Processed stats result:', processedStats);
      
      setStats(processedStats);
      
      if (isRefreshing) {
        toast({
          title: "Statistics Updated",
          description: `Loaded ${finalOpinions.length} opinions from ${dataSource === 'local' ? 'local storage' : 'the server'}.`,
        });
        setIsRefreshing(false);
      }
    } catch (error) {
      console.error('StatsDataLoader: Error loading stats:', error);
      toast({
        title: "Error Loading Statistics",
        description: `Failed to load statistics from ${dataSource === 'local' ? 'local storage' : 'the server'}. Please try again.`,
        variant: "destructive"
      });
      
      setStats({
        total: 0,
        recent: 0,
        byProjectType: {},
        byCountry: {},
        byGenre: {},
        byYoutubeCategory: {},
        byOttPlatform: {},
        byFilmIndustry: {},
        byTvChannel: {},
        byMusicGenre: {},
        byMusicMood: {},
        byMusicLanguage: {},
        byTelevisionContentType: {},
        byYoutubeChannelType: {},
        byOttSeriesType: {},
        byInstagramCategory: {},
        byDemographics: { gender: {}, age: {}, region: {} },
        userNotes: []
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    console.log('StatsDataLoader: Manual refresh triggered');
    setIsRefreshing(true);
    await loadStats();
  };

  // Use the extracted event handlers hook
  useStatsEventHandlers({ activeSection, dataSource, loadStats, isLoaded });

  // Initial load - wait for opinion storage to be ready for local data
  useEffect(() => {
    if (dataSource === 'local' && !isLoaded) {
      console.log('StatsDataLoader: Waiting for opinion storage to load...');
      return;
    }
    loadStats();
  }, [activeSection, dataSource, JSON.stringify(filters), isLoaded]);

  return {
    stats,
    isLoading,
    isRefreshing,
    loadStats,
    handleRefresh
  };
};
