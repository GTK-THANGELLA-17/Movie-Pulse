
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { ProcessedStats } from "@/types/stats";
import { useOpinionStorage } from "@/hooks/useOpinionStorage";

interface StatsDataOptions {
  sectionType: string;
  dataSource: 'local' | 'server';
  filters: any;
}

export const useStatsData = ({ sectionType, dataSource, filters }: StatsDataOptions) => {
  const { toast } = useToast();
  const { getOpinions, isLoaded } = useOpinionStorage();
  const [stats, setStats] = useState<ProcessedStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Section-specific project type mapping
  const getSectionProjectTypes = useCallback((section: string): string[] => {
    const sectionProjectTypeMap: Record<string, string[]> = {
      films: ["Films"],
      "youtube-films": ["YouTubeFilm"],
      "youtube-content": ["YouTubeContent"],
      "instagram-content": ["InstagramContent"],
      ott: ["OTTPlatform"],
      television: ["Television"],
      music: ["MusicContent"]
    };
    return sectionProjectTypeMap[section] || [];
  }, []);

  // Enhanced processing to capture ALL opinion data fields
  const processOpinionsToStats = useCallback((opinions: any[]): ProcessedStats => {
    console.log('Processing opinions to stats:', opinions);
    
    const stats: ProcessedStats = {
      total: opinions.length,
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
    };

    // Calculate recent opinions (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    stats.recent = opinions.filter(op => {
      const timestamp = op.timestamp || op.submittedAt || op.createdAt;
      if (!timestamp) return false;
      const date = new Date(timestamp);
      return date > sevenDaysAgo && !isNaN(date.getTime());
    }).length;

    // Safe increment function
    const safeIncrement = (obj: any, key: string) => {
      if (key && typeof key === 'string' && key !== 'undefined' && key !== 'null' && key.trim() !== '') {
        obj[key] = (obj[key] || 0) + 1;
        console.log(`Incremented ${key} to ${obj[key]}`);
      }
    };

    // Process each opinion with comprehensive field mapping
    opinions.forEach((op, index) => {
      if (!op) return;
      
      console.log(`Processing opinion ${index}:`, op);

      // Core data that applies to all opinions
      safeIncrement(stats.byProjectType, op.projectType);
      safeIncrement(stats.byCountry, op.country);
      
      // Genre field - applicable to multiple project types
      if (op.genre) {
        safeIncrement(stats.byGenre, op.genre);
      }
      
      // Films specific data
      if (op.projectType === 'Films') {
        safeIncrement(stats.byFilmIndustry, op.filmIndustry);
        // Films might have additional genre info
        if (op.genre) safeIncrement(stats.byGenre, op.genre);
      }
      
      // YouTube Content specific data
      if (op.projectType === 'YouTubeContent') {
        safeIncrement(stats.byYoutubeCategory, op.youtubeContentCategory);
        safeIncrement(stats.byYoutubeChannelType, op.youtubeChannelType);
      }
      
      // YouTube Films specific data
      if (op.projectType === 'YouTubeFilm') {
        safeIncrement(stats.byYoutubeCategory, op.youtubeContentCategory);
        safeIncrement(stats.byYoutubeChannelType, op.youtubeChannelType);
        if (op.genre) safeIncrement(stats.byGenre, op.genre);
      }
      
      // OTT Platform specific data
      if (op.projectType === 'OTTPlatform') {
        safeIncrement(stats.byOttPlatform, op.ottPlatform);
        safeIncrement(stats.byOttSeriesType, op.ottSeriesType);
        if (op.genre) safeIncrement(stats.byGenre, op.genre);
      }
      
      // Television specific data
      if (op.projectType === 'Television') {
        safeIncrement(stats.byTvChannel, op.televisionChannel);
        safeIncrement(stats.byTelevisionContentType, op.televisionContentType);
        if (op.genre) safeIncrement(stats.byGenre, op.genre);
      }
      
      // Music specific data
      if (op.projectType === 'MusicContent') {
        safeIncrement(stats.byMusicGenre, op.musicGenre);
        safeIncrement(stats.byMusicMood, op.musicMood);
        safeIncrement(stats.byMusicLanguage, op.musicLanguage);
      }
      
      // Instagram specific data
      if (op.projectType === 'InstagramContent') {
        safeIncrement(stats.byInstagramCategory, op.instagramContentType);
      }

      // Demographics processing
      if (op.demographics) {
        safeIncrement(stats.byDemographics.gender, op.demographics.gender);
        safeIncrement(stats.byDemographics.age, op.demographics.age);
        safeIncrement(stats.byDemographics.region, op.demographics.region);
      }

      // User notes collection
      if (op.notes && op.notes.trim()) {
        stats.userNotes.push({
          notes: op.notes.trim(),
          createdAt: op.createdAt || op.timestamp || op.submittedAt || new Date().toISOString(),
          genre: op.genre || op.filmIndustry || op.youtubeContentCategory || op.ottPlatform || 'General',
          projectType: op.projectType || 'Unknown',
          country: op.country || 'Unknown',
          demographics: op.demographics || {}
        });
      }
    });

    console.log('Final processed stats:', stats);
    return stats;
  }, []);

  // Enhanced server data fetching
  const fetchServerData = useCallback(async () => {
    try {
      console.log('Fetching server data for section:', sectionType);
      const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      console.log('Using API URL:', baseURL);
      
      // Try section-specific endpoint first
      const sectionEndpoint = `${baseURL}/opinions/stats/${sectionType}`;
      console.log('Trying section endpoint:', sectionEndpoint);
      
      try {
        const sectionResponse = await fetch(sectionEndpoint);
        console.log('Section endpoint response status:', sectionResponse.status);
        
        if (sectionResponse.ok) {
          const sectionData = await sectionResponse.json();
          console.log('Server section data:', sectionData);
          return sectionData;
        }
      } catch (sectionError) {
        console.log('Section endpoint failed:', sectionError);
      }
      
      // Fallback to general opinions endpoint
      const generalEndpoint = `${baseURL}/opinions`;
      console.log('Trying general endpoint:', generalEndpoint);
      const generalResponse = await fetch(generalEndpoint);
      console.log('General endpoint response status:', generalResponse.status);
      
      if (generalResponse.ok) {
        const allOpinions = await generalResponse.json();
        console.log('Server general data length:', allOpinions?.length || 0);
        
        // Filter by section if needed
        const sectionProjectTypes = getSectionProjectTypes(sectionType);
        const filteredOpinions = sectionProjectTypes.length > 0 
          ? allOpinions.filter((op: any) => sectionProjectTypes.includes(op.projectType))
          : allOpinions;
          
        console.log('Filtered opinions length:', filteredOpinions?.length || 0);
        return filteredOpinions;
      }
      
      throw new Error(`Server responded with status: ${generalResponse.status}`);
    } catch (error) {
      console.error('Server data fetch error:', error);
      throw error;
    }
  }, [sectionType, getSectionProjectTypes]);

  const loadStats = useCallback(async () => {
    console.log('useStatsData: Loading stats for section:', sectionType, 'dataSource:', dataSource);
    console.log('useStatsData: API_URL:', import.meta.env.VITE_API_URL || 'http://localhost:5000/api');
    setIsLoading(true);
    
    try {
      let opinions: any[] = [];
      
      if (dataSource === 'local') {
        // For local data, check if opinion storage is loaded
        if (!isLoaded) {
          console.log('useStatsData: Opinion storage not loaded, setting empty stats');
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
          setIsLoading(false);
          return;
        }
        
        const localOpinions = getOpinions();
        console.log('useStatsData: Retrieved local opinions:', localOpinions.length, localOpinions);
        
        const sectionProjectTypes = getSectionProjectTypes(sectionType);
        
        opinions = sectionProjectTypes.length > 0 
          ? localOpinions.filter((opinion: any) => sectionProjectTypes.includes(opinion.projectType))
          : localOpinions;

        console.log('useStatsData: Filtered opinions by section:', opinions.length, opinions);
      } else {
        // For server data, fetch from MongoDB
        console.log('useStatsData: Fetching server data...');
        try {
          const serverData = await fetchServerData();
          console.log('useStatsData: Server response received:', serverData);
          
          if (Array.isArray(serverData)) {
            opinions = serverData;
            console.log('useStatsData: Server data is array, length:', opinions.length);
          } else if (serverData && typeof serverData === 'object') {
            // Handle structured server response
            opinions = serverData.opinions || serverData.data || [];
            console.log('useStatsData: Server data is object, extracted opinions:', opinions.length);
          }
          
          console.log('useStatsData: Server opinions retrieved:', opinions.length);
        } catch (serverError) {
          console.error('useStatsData: Server fetch error:', serverError);
          throw serverError;
        }
      }

      // Apply filters
      opinions = opinions.filter((opinion: any) => {
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

      console.log('useStatsData: Final filtered opinions:', opinions.length);

      const processedStats = processOpinionsToStats(opinions);
      setStats(processedStats);
      
      console.log('useStatsData: Processed stats:', processedStats);
      
      if (isRefreshing) {
        toast({
          title: "Statistics Updated",
          description: `Loaded ${opinions.length} opinions from ${dataSource === 'local' ? 'local storage' : 'server'}.`,
        });
      }
    } catch (error) {
      console.error('useStatsData: Error loading stats:', error);
      toast({
        title: "Error Loading Statistics",
        description: `Failed to load statistics from ${dataSource === 'local' ? 'local storage' : 'server'}. Please try again.`,
        variant: "destructive"
      });
      
      // Set empty stats on error
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
      setIsRefreshing(false);
    }
  }, [sectionType, dataSource, filters, isLoaded, getOpinions, getSectionProjectTypes, processOpinionsToStats, isRefreshing, toast, fetchServerData]);

  const handleRefresh = useCallback(async () => {
    console.log('useStatsData: Manual refresh triggered');
    setIsRefreshing(true);
    await loadStats();
  }, [loadStats]);

  // Load stats when dependencies change
  useEffect(() => {
    console.log('useStatsData: Effect triggered with:', { sectionType, dataSource, isLoaded });
    loadStats();
  }, [loadStats]);

  // Listen for refresh events
  useEffect(() => {
    const handleRefreshEvent = () => {
      console.log('useStatsData: Refresh event received');
      handleRefresh();
    };

    window.addEventListener('refreshAllStats', handleRefreshEvent);
    window.addEventListener('refreshLocalStats', handleRefreshEvent);
    
    return () => {
      window.removeEventListener('refreshAllStats', handleRefreshEvent);
      window.removeEventListener('refreshLocalStats', handleRefreshEvent);
    };
  }, [handleRefresh]);

  return {
    stats,
    isLoading,
    isRefreshing,
    loadStats,
    handleRefresh
  };
};
