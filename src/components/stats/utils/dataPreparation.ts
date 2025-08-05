import {
  FILM_GENRES,
  GENRES,
  MUSIC_GENRES,
  MUSIC_LANGUAGES,
  MUSIC_MOODS,
  OTT_GENRES,
  TELEVISION_CONTENT_TYPES,
  YOUTUBE_CONTENT_CATEGORIES,
} from "@/lib/data";

// Utility function to safely extract and count data
const extractAndCount = (data: any[], key: string, filter?: (item: any) => boolean) => {
  const filteredData = filter ? data.filter(filter) : data;

  return filteredData.reduce((acc: { [key: string]: number }, item: any) => {
    const value = item[key];
    if (value) {
      acc[value] = (acc[value] || 0) + 1;
    }
    return acc;
  }, {});
};

// Utility to convert a count object to sorted chart data
export const prepareChartData = (countsObj: { [key: string]: number }) => {
  if (!countsObj || typeof countsObj !== "object") return [];
  return Object.entries(countsObj)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

// Prepare project type data
export const prepareProjectTypeData = (stats: any) => {
  if (!stats || !stats.byProjectType) {
    console.warn('prepareProjectTypeData: No stats or stats.byProjectType provided, returning empty array');
    return [];
  }

  return Object.entries(stats.byProjectType)
    .map(([name, value]) => ({ name, value: value as number }))
    .sort((a, b) => b.value - a.value);
};

// Prepare country data
export const prepareCountryData = (stats: any) => {
  if (!stats || !stats.byCountry) {
    console.warn('prepareCountryData: No stats or stats.byCountry provided, returning empty array');
    return [];
  }

  return Object.entries(stats.byCountry)
    .map(([name, value]) => ({ name, value: value as number }))
    .sort((a, b) => b.value - a.value);
};

// Prepare region data
export const prepareRegionData = (stats: any) => {
  console.log('prepareRegionData: Processing stats:', stats);
  
  if (!stats) {
    console.warn('prepareRegionData: No stats provided, returning empty array');
    return [];
  }

  // Check multiple possible sources for region data
  const regionSources = [
    stats.byRegion,
    stats.byDemographics?.region,
    stats.byCountry // fallback to country data if region not available
  ];

  let regionData: Record<string, number> = {};

  // Try each source until we find data
  for (const source of regionSources) {
    if (source && typeof source === 'object' && Object.keys(source).length > 0) {
      regionData = source;
      break;
    }
  }

  if (Object.keys(regionData).length === 0) {
    console.warn('prepareRegionData: No region data found in any source');
    return [];
  }

  const result = Object.entries(regionData)
    .map(([region, count]) => ({
      name: region,
      value: typeof count === 'number' ? count : 0
    }))
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value);

  console.log('prepareRegionData: Final result:', result);
  return result;
};

// --- FIXED: Improved user notes extraction with proper genre detection and section filtering ---
export function extractUserNotesFromOpinions(opinions: any[], sectionType: string = "local") {
  console.log('extractUserNotesFromOpinions called with:', { opinionsLength: opinions?.length, sectionType });
  
  if (!opinions || !Array.isArray(opinions)) {
    console.warn('extractUserNotesFromOpinions: Invalid opinions array');
    return [];
  }

  // Map section types to project types for filtering
  const sectionToProjectTypeMap: Record<string, string[]> = {
    "films": ["Films"],
    "youtube-films": ["YouTubeFilm"],
    "youtube-content": ["YouTubeContent"],
    "instagram-content": ["InstagramContent"],
    "ott": ["OTTPlatform"],
    "television": ["Television"],
    "music": ["MusicContent"],
    "local": [] // local shows all
  };

  const relevantProjectTypes = sectionToProjectTypeMap[sectionType] || [];
  console.log('Filtering for project types:', relevantProjectTypes, 'for section:', sectionType);

  const filteredOpinions = opinions.filter(op => {
    // Check if opinion has notes - must have actual content
    if (!op.notes || typeof op.notes !== 'string' || op.notes.trim().length === 0 || op.notes.trim() === '""' || op.notes === 'undefined') {
      return false;
    }

    // For local stats, show all notes
    if (sectionType === "local") {
      return true;
    }

    // For specific sections, filter by project type
    const hasCorrectProjectType = relevantProjectTypes.includes(op.projectType);
    console.log(`Opinion projectType: ${op.projectType}, relevant types: ${relevantProjectTypes}, matches: ${hasCorrectProjectType}`);
    return hasCorrectProjectType;
  });

  console.log(`Filtered opinions with valid notes: ${filteredOpinions.length} out of ${opinions.length} for section: ${sectionType}`);

  const extractedNotes = filteredOpinions.map((op) => {
    // Clean the notes content
    let cleanNotes = op.notes.trim();
    if (cleanNotes.startsWith('"') && cleanNotes.endsWith('"')) {
      cleanNotes = cleanNotes.slice(1, -1);
    }
    
    // Better genre detection based on project type and available data
    let genre = op.genre || null;
    if (!genre || genre === 'Unknown' || genre === 'undefined') {
      switch (op.projectType) {
        case 'Films':
          genre = op.filmIndustry ? `${op.filmIndustry} Film` : 'Film';
          break;
        case 'YouTubeFilm':
          genre = op.filmIndustry ? `YouTube ${op.filmIndustry} Film` : 'YouTube Film';
          break;
        case 'YouTubeContent':
          genre = op.youtubeContentCategory || 'YouTube Content';
          break;
        case 'InstagramContent':
          genre = op.instagramContentType || 'Instagram Content';
          break;
        case 'OTTPlatform':
          genre = op.ottPlatform ? `${op.ottPlatform} Series` : 'OTT Content';
          break;
        case 'Television':
          genre = op.televisionChannel || op.televisionContentType || 'TV Content';
          break;
        case 'MusicContent':
          genre = op.musicGenre || op.musicMood || 'Music';
          break;
        default:
          genre = op.projectType || 'Content';
      }
    }

    const noteObj = {
      notes: cleanNotes,
      createdAt: op.createdAt || op.timestamp || op.submittedAt || new Date().toISOString(),
      genre,
      projectType: op.projectType || 'Unknown',
      filmIndustry: op.filmIndustry || null,
      televisionChannel: op.televisionChannel || null,
      youtubeContentCategory: op.youtubeContentCategory || null,
      ottPlatform: op.ottPlatform || null,
      instagramContentType: op.instagramContentType || null,
      musicGenre: op.musicGenre || null,
      musicMood: op.musicMood || null,
      country: op.country || null,
      demographics: op.demographics || {},
    };

    console.log(`Extracted note for section ${sectionType}:`, noteObj);
    return noteObj;
  });

  console.log(`Final extracted notes for section ${sectionType}:`, extractedNotes.length);
  return extractedNotes;
}

// --- IMPROVED: Enhanced section data processing for comprehensive stats ---
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

export function prepareLocalStats(opinions: any[], sectionType: string) {
  // Log incoming opinions for debugging
  console.log('[prepareLocalStats] opinions input:', opinions);

  // Aggregate stats by project type and country
  const byProjectType = extractAndCount(opinions, 'projectType');
  const byCountry = extractAndCount(opinions, 'country');
  const byRegion = extractAndCount(opinions, 'demographics.region');

  // Aggregate stats based on the section type
  let byGenre = {};
  let byFilmIndustry = {};
  let byYoutubeCategory = {};
  let byInstagramCategory = {};
  let byOttPlatform = {};
  let byTelevisionChannel = {};
  let byMusicGenre = {};
  let byMusicMood = {};
  let byMusicLanguage = {};
  let byTelevisionContentType = {};
  let byYoutubeChannelType = {};

  switch (sectionType) {
    case "films":
      byGenre = extractAndCount(opinions, 'genre', op => op.projectType === 'Films');
      byFilmIndustry = extractAndCount(opinions, 'filmIndustry', op => op.projectType === 'Films');
      break;
    case "youtube-films":
      byGenre = extractAndCount(opinions, 'genre', op => op.projectType === 'YouTubeFilm');
      byFilmIndustry = extractAndCount(opinions, 'filmIndustry', op => op.projectType === 'YouTubeFilm');
      break;
    case "youtube-content":
      byYoutubeCategory = extractAndCount(opinions, 'youtubeContentCategory', op => op.projectType === 'YouTubeContent');
      byYoutubeChannelType = extractAndCount(opinions, 'youtubeChannelType', op => op.projectType === 'YouTubeContent');
      break;
    case "instagram-content":
      byInstagramCategory = extractAndCount(opinions, 'instagramContentType', op => op.projectType === 'InstagramContent');
      break;
    case "ott":
      byGenre = extractAndCount(opinions, 'genre', op => op.projectType === 'OTTPlatform');
      byOttPlatform = extractAndCount(opinions, 'ottPlatform', op => op.projectType === 'OTTPlatform');
      break;
    case "television":
      byTelevisionChannel = extractAndCount(opinions, 'televisionChannel', op => op.projectType === 'Television');
      byTelevisionContentType = extractAndCount(opinions, 'televisionContentType', op => op.projectType === 'Television');
      break;
    case "music":
      byMusicGenre = extractAndCount(opinions, 'musicGenre', op => op.projectType === 'MusicContent');
      byMusicMood = extractAndCount(opinions, 'musicMood', op => op.projectType === 'MusicContent');
      byMusicLanguage = extractAndCount(opinions, 'musicLanguage', op => op.projectType === 'MusicContent');
      break;
    default:
      break;
  }

  // Use the reusable extractor everywhere for consistency!
  const userNotes = extractUserNotesFromOpinions(opinions, sectionType);

  const stats = {
    total: opinions.length,
    byProjectType,
    byCountry,
    byRegion,
    byGenre,
    byFilmIndustry,
    byYoutubeCategory,
    byInstagramCategory,
    byOttPlatform,
    byTelevisionChannel,
    byMusicGenre,
    byMusicMood,
    byMusicLanguage,
    byTelevisionContentType,
    byYoutubeChannelType,
    userNotes, // always an array of objects!
  };

  // Log out stats for debugging purposes
  console.log('[prepareLocalStats] final stats output:', stats);

  return stats;
}
