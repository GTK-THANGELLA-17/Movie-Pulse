
import { useState, useEffect, useMemo, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { extractUserNotesFromOpinions } from "@/components/stats/utils/dataPreparation";

export const useLocalStats = (opinions: any[], sectionType: string = "local") => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Stable memoized data processing to prevent flickering
  const processedStats = useMemo(() => {
    console.log('useLocalStats: Processing stats for section:', sectionType, 'with opinions:', opinions?.length || 0);
    
    if (!opinions || opinions.length === 0) {
      console.log('useLocalStats: No opinions, returning empty stats');
      return {
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
        byDemographics: { gender: {}, age: {}, region: {} },
        userNotes: [],
        byYoutubeChannelType: {},
        byInstagramCategory: {},
        byInstagramProfileType: {},
        byOttSeriesType: {},
        byTelevisionContentType: {}
      };
    }

    try {
      const stats: any = {
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
        byDemographics: { gender: {}, age: {}, region: {} },
        byYoutubeChannelType: {},
        byInstagramCategory: {},
        byInstagramProfileType: {},
        byOttSeriesType: {},
        byTelevisionContentType: {}
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

      // Enhanced safe increment function with validation
      const safeIncrement = (obj: any, key: string) => {
        if (key && typeof key === 'string' && key !== 'undefined' && key !== 'null' && key.trim() !== '') {
          obj[key] = (obj[key] || 0) + 1;
        }
      };

      // Process each opinion with section-specific logic
      opinions.forEach(op => {
        if (!op) return;

        // Core data collection
        safeIncrement(stats.byProjectType, op.projectType);
        safeIncrement(stats.byCountry, op.country);
        
        // Section-specific data processing based on project type
        switch (op.projectType) {
          case 'Films':
            safeIncrement(stats.byGenre, op.genre);
            safeIncrement(stats.byFilmIndustry, op.filmIndustry);
            break;
            
          case 'YouTubeContent':
            safeIncrement(stats.byYoutubeCategory, op.youtubeContentCategory);
            safeIncrement(stats.byYoutubeChannelType, op.youtubeChannelType);
            break;
            
          case 'OTTPlatform':
            safeIncrement(stats.byGenre, op.genre);
            safeIncrement(stats.byOttPlatform, op.ottPlatform);
            safeIncrement(stats.byOttSeriesType, op.ottSeriesType);
            break;
            
          case 'Television':
            safeIncrement(stats.byTvChannel, op.televisionChannel);
            safeIncrement(stats.byTelevisionContentType, op.televisionContentType);
            break;
            
          case 'MusicContent':
            safeIncrement(stats.byMusicGenre, op.musicGenre);
            safeIncrement(stats.byMusicMood, op.musicMood);
            safeIncrement(stats.byMusicLanguage, op.musicLanguage);
            break;
            
          case 'InstagramContent':
            safeIncrement(stats.byInstagramCategory, op.instagramContentType);
            safeIncrement(stats.byInstagramProfileType, op.instagramProfileType);
            break;
            
          default:
            // For local stats, collect all available data
            if (sectionType === 'local') {
              safeIncrement(stats.byGenre, op.genre);
              safeIncrement(stats.byYoutubeCategory, op.youtubeContentCategory);
              safeIncrement(stats.byOttPlatform, op.ottPlatform);
              safeIncrement(stats.byFilmIndustry, op.filmIndustry);
              safeIncrement(stats.byTvChannel, op.televisionChannel);
              safeIncrement(stats.byMusicGenre, op.musicGenre);
              safeIncrement(stats.byMusicMood, op.musicMood);
              safeIncrement(stats.byMusicLanguage, op.musicLanguage);
              safeIncrement(stats.byYoutubeChannelType, op.youtubeChannelType);
              safeIncrement(stats.byInstagramCategory, op.instagramContentType);
              safeIncrement(stats.byOttSeriesType, op.ottSeriesType);
              safeIncrement(stats.byTelevisionContentType, op.televisionContentType);
            }
        }

        // Demographics with safe access
        if (op.demographics) {
          safeIncrement(stats.byDemographics.gender, op.demographics.gender);
          safeIncrement(stats.byDemographics.age, op.demographics.age);
          safeIncrement(stats.byDemographics.region, op.demographics.region);
        }
      });

      // Extract user notes with stable processing
      try {
        stats.userNotes = extractUserNotesFromOpinions(opinions, sectionType);
        console.log('useLocalStats: Extracted user notes:', stats.userNotes.length);
      } catch (error) {
        console.warn('useLocalStats: Error extracting user notes:', error);
        stats.userNotes = [];
      }

      console.log('useLocalStats: Final processed stats:', {
        total: stats.total,
        recent: stats.recent,
        userNotesCount: stats.userNotes.length,
        sectionType,
        projectTypeKeys: Object.keys(stats.byProjectType)
      });

      return stats;
    } catch (error) {
      console.error('useLocalStats: Error processing stats:', error);
      toast({
        title: "Stats Processing Error",
        description: "There was an issue processing the statistics. Please try again.",
        variant: "destructive",
      });
      
      return {
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
        byDemographics: { gender: {}, age: {}, region: {} },
        userNotes: [],
        byYoutubeChannelType: {},
        byInstagramCategory: {},
        byInstagramProfileType: {},
        byOttSeriesType: {},
        byTelevisionContentType: {}
      };
    }
  }, [opinions, sectionType, toast]);

  // Minimal loading state management to prevent flickering
  useEffect(() => {
    if (opinions?.length > 0) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 100);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [opinions]);

  return {
    filteredOpinions: opinions || [],
    totalCount: processedStats.total,
    recentCount: processedStats.recent,
    byProjectType: processedStats.byProjectType,
    byCountry: processedStats.byCountry,
    byGenre: processedStats.byGenre,
    byYoutubeCategory: processedStats.byYoutubeCategory,
    byOttPlatform: processedStats.byOttPlatform,
    byFilmIndustry: processedStats.byFilmIndustry,
    byTvChannel: processedStats.byTvChannel,
    byMusicGenre: processedStats.byMusicGenre,
    byMusicMood: processedStats.byMusicMood,
    byMusicLanguage: processedStats.byMusicLanguage,
    byDemographics: processedStats.byDemographics,
    userNotes: processedStats.userNotes,
    byYoutubeChannelType: processedStats.byYoutubeChannelType,
    byInstagramCategory: processedStats.byInstagramCategory,
    byInstagramProfileType: processedStats.byInstagramProfileType,
    byOttSeriesType: processedStats.byOttSeriesType,
    byTelevisionContentType: processedStats.byTelevisionContentType,
    isLoading,
  };
};
