
// Enhanced section-specific data processing for comprehensive stats
export const processSectionData = (stats: any, sectionType: string) => {
  if (!stats) {
    console.warn('processSectionData: No stats provided, returning empty data');
    return {
      genreData: [],
      musicGenreData: [],
      musicMoodData: [],
      musicLanguageData: [],
      youtubeData: [],
      tvChannelData: [],
      ottPlatformData: [],
      filmIndustryData: [],
      tvContentTypeData: [],
      youtubeChannelTypeData: [],
      ottSeriesTypeData: [],
      instagramCategoryData: []
    };
  }

  try {
    let genreData = [];
    let musicGenreData = [];
    let musicMoodData = [];
    let musicLanguageData = [];
    let youtubeData = [];
    let tvChannelData = [];
    let ottPlatformData = [];
    let filmIndustryData = [];
    let tvContentTypeData = [];
    let youtubeChannelTypeData = [];
    let ottSeriesTypeData = [];
    let instagramCategoryData = [];

    switch (sectionType) {
      case "films":
        genreData = Object.entries(stats.byGenre || {})
          .map(([name, value]) => ({ name, value: value as number }))
          .filter(item => item.value > 0)
          .sort((a, b) => b.value - a.value);
        filmIndustryData = Object.entries(stats.byFilmIndustry || {})
          .map(([name, value]) => ({ name, value: value as number }))
          .filter(item => item.value > 0)
          .sort((a, b) => b.value - a.value);
        break;
        
      case "youtube-films":
        genreData = Object.entries(stats.byGenre || {})
          .map(([name, value]) => ({ name, value: value as number }))
          .filter(item => item.value > 0)
          .sort((a, b) => b.value - a.value);
        filmIndustryData = Object.entries(stats.byFilmIndustry || {})
          .map(([name, value]) => ({ name, value: value as number }))
          .filter(item => item.value > 0)
          .sort((a, b) => b.value - a.value);
        break;
        
      case "youtube-content":
        youtubeData = Object.entries(stats.byYoutubeCategory || {})
          .map(([name, value]) => ({ name, value: value as number }))
          .filter(item => item.value > 0)
          .sort((a, b) => b.value - a.value);
        youtubeChannelTypeData = Object.entries(stats.byYoutubeChannelType || {})
          .map(([name, value]) => ({ name, value: value as number }))
          .filter(item => item.value > 0)
          .sort((a, b) => b.value - a.value);
        break;
        
      case "instagram-content":
        instagramCategoryData = Object.entries(stats.byInstagramCategory || {})
          .map(([name, value]) => ({ name, value: value as number }))
          .filter(item => item.value > 0)
          .sort((a, b) => b.value - a.value);
        break;
        
      case "ott":
        genreData = Object.entries(stats.byGenre || {})
          .map(([name, value]) => ({ name, value: value as number }))
          .filter(item => item.value > 0)
          .sort((a, b) => b.value - a.value);
        ottPlatformData = Object.entries(stats.byOttPlatform || {})
          .map(([name, value]) => ({ name, value: value as number }))
          .filter(item => item.value > 0)
          .sort((a, b) => b.value - a.value);
        ottSeriesTypeData = Object.entries(stats.byOttSeriesType || {})
          .map(([name, value]) => ({ name, value: value as number }))
          .filter(item => item.value > 0)
          .sort((a, b) => b.value - a.value);
        break;
        
      case "television":
        tvChannelData = Object.entries(stats.byTvChannel || {})
          .map(([name, value]) => ({ name, value: value as number }))
          .filter(item => item.value > 0)
          .sort((a, b) => b.value - a.value);
        tvContentTypeData = Object.entries(stats.byTelevisionContentType || {})
          .map(([name, value]) => ({ name, value: value as number }))
          .filter(item => item.value > 0)
          .sort((a, b) => b.value - a.value);
        break;
        
      case "music":
        musicGenreData = Object.entries(stats.byMusicGenre || {})
          .map(([name, value]) => ({ name, value: value as number }))
          .filter(item => item.value > 0)
          .sort((a, b) => b.value - a.value);
        musicMoodData = Object.entries(stats.byMusicMood || {})
          .map(([name, value]) => ({ name, value: value as number }))
          .filter(item => item.value > 0)
          .sort((a, b) => b.value - a.value);
        musicLanguageData = Object.entries(stats.byMusicLanguage || {})
          .map(([name, value]) => ({ name, value: value as number }))
          .filter(item => item.value > 0)
          .sort((a, b) => b.value - a.value);
        break;
        
      case "local":
        // For local stats, show all available data
        genreData = Object.entries(stats.byGenre || {})
          .map(([name, value]) => ({ name, value: value as number }))
          .filter(item => item.value > 0)
          .sort((a, b) => b.value - a.value);
        musicGenreData = Object.entries(stats.byMusicGenre || {})
          .map(([name, value]) => ({ name, value: value as number }))
          .filter(item => item.value > 0)
          .sort((a, b) => b.value - a.value);
        youtubeData = Object.entries(stats.byYoutubeCategory || {})
          .map(([name, value]) => ({ name, value: value as number }))
          .filter(item => item.value > 0)
          .sort((a, b) => b.value - a.value);
        ottPlatformData = Object.entries(stats.byOttPlatform || {})
          .map(([name, value]) => ({ name, value: value as number }))
          .filter(item => item.value > 0)
          .sort((a, b) => b.value - a.value);
        filmIndustryData = Object.entries(stats.byFilmIndustry || {})
          .map(([name, value]) => ({ name, value: value as number }))
          .filter(item => item.value > 0)
          .sort((a, b) => b.value - a.value);
        tvChannelData = Object.entries(stats.byTvChannel || {})
          .map(([name, value]) => ({ name, value: value as number }))
          .filter(item => item.value > 0)
          .sort((a, b) => b.value - a.value);
        break;
        
      default:
        console.warn('processSectionData: Unknown section type:', sectionType);
    }

    return {
      genreData,
      musicGenreData,
      musicMoodData,
      musicLanguageData,
      youtubeData,
      tvChannelData,
      ottPlatformData,
      filmIndustryData,
      tvContentTypeData,
      youtubeChannelTypeData,
      ottSeriesTypeData,
      instagramCategoryData
    };
  } catch (error) {
    console.error('Error processing section data:', error);
    return {
      genreData: [],
      musicGenreData: [],
      musicMoodData: [],
      musicLanguageData: [],
      youtubeData: [],
      tvChannelData: [],
      ottPlatformData: [],
      filmIndustryData: [],
      tvContentTypeData: [],
      youtubeChannelTypeData: [],
      ottSeriesTypeData: [],
      instagramCategoryData: []
    };
  }
};
