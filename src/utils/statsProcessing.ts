import { ProcessedStats } from "@/types/stats";

const createEmptyStats = (): ProcessedStats => ({
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

export const processServerOpinions = (opinions: any[]): ProcessedStats => {
  if (!opinions) {
    return createEmptyStats();
  }

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
    return date > sevenDaysAgo;
  }).length;

  opinions.forEach(op => {
    if (op.projectType) {
      stats.byProjectType[op.projectType] = (stats.byProjectType[op.projectType] || 0) + 1;
    }
    if (op.country) {
      stats.byCountry[op.country] = (stats.byCountry[op.country] || 0) + 1;
    }
    if (op.genre) {
      stats.byGenre[op.genre] = (stats.byGenre[op.genre] || 0) + 1;
    }
    if (op.youtubeContentCategory) {
      stats.byYoutubeCategory[op.youtubeContentCategory] = (stats.byYoutubeCategory[op.youtubeContentCategory] || 0) + 1;
    }
    if (op.ottPlatform) {
      stats.byOttPlatform[op.ottPlatform] = (stats.byOttPlatform[op.ottPlatform] || 0) + 1;
    }
    if (op.filmIndustry) {
      stats.byFilmIndustry[op.filmIndustry] = (stats.byFilmIndustry[op.filmIndustry] || 0) + 1;
    }
     if (op.tvChannel) {
       stats.byTvChannel[op.tvChannel] = (stats.byTvChannel[op.tvChannel] || 0) + 1;
     }
    if (op.musicGenre) {
      stats.byMusicGenre[op.musicGenre] = (stats.byMusicGenre[op.musicGenre] || 0) + 1;
    }
    if (op.musicMood) {
      stats.byMusicMood[op.musicMood] = (stats.byMusicMood[op.musicMood] || 0) + 1;
    }
    if (op.musicLanguage) {
      stats.byMusicLanguage[op.musicLanguage] = (stats.byMusicLanguage[op.musicLanguage] || 0) + 1;
    }
    if (op.televisionContentType) {
      stats.byTelevisionContentType[op.televisionContentType] = (stats.byTelevisionContentType[op.televisionContentType] || 0) + 1;
    }
     if (op.youtubeChannelType) {
       stats.byYoutubeChannelType[op.youtubeChannelType] = (stats.byYoutubeChannelType[op.youtubeChannelType] || 0) + 1;
     }
    if (op.ottSeriesType) {
      stats.byOttSeriesType[op.ottSeriesType] = (stats.byOttSeriesType[op.ottSeriesType] || 0) + 1;
    }
    if (op.instagramContentType) {
      stats.byInstagramCategory[op.instagramContentType] = (stats.byInstagramCategory[op.instagramContentType] || 0) + 1;
    }

    //Demographics
    if (op.demographics) {
      const { gender, age, region } = op.demographics;
      if (gender) {
        stats.byDemographics.gender[gender] = (stats.byDemographics.gender[gender] || 0) + 1;
      }
      if (age) {
        stats.byDemographics.age[age] = (stats.byDemographics.age[age] || 0) + 1;
      }
      if (region) {
        stats.byDemographics.region[region] = (stats.byDemographics.region[region] || 0) + 1;
      }
    }
  });

  return stats;
};

export const processLocalOpinions = (opinions: any[]): ProcessedStats => {
  if (!opinions) {
    return createEmptyStats();
  }

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
    return date > sevenDaysAgo;
  }).length;

  opinions.forEach(op => {
    if (op.projectType) {
      stats.byProjectType[op.projectType] = (stats.byProjectType[op.projectType] || 0) + 1;
    }
    if (op.country) {
      stats.byCountry[op.country] = (stats.byCountry[op.country] || 0) + 1;
    }
    if (op.genre) {
      stats.byGenre[op.genre] = (stats.byGenre[op.genre] || 0) + 1;
    }
    if (op.youtubeContentCategory) {
      stats.byYoutubeCategory[op.youtubeContentCategory] = (stats.byYoutubeCategory[op.youtubeContentCategory] || 0) + 1;
    }
    if (op.ottPlatform) {
      stats.byOttPlatform[op.ottPlatform] = (stats.byOttPlatform[op.ottPlatform] || 0) + 1;
    }
    if (op.filmIndustry) {
      stats.byFilmIndustry[op.filmIndustry] = (stats.byFilmIndustry[op.filmIndustry] || 0) + 1;
    }
    if (op.televisionChannel) {
      stats.byTvChannel[op.televisionChannel] = (stats.byTvChannel[op.televisionChannel] || 0) + 1;
    }
    if (op.musicGenre) {
      stats.byMusicGenre[op.musicGenre] = (stats.byMusicGenre[op.musicGenre] || 0) + 1;
    }
    if (op.musicMood) {
      stats.byMusicMood[op.musicMood] = (stats.byMusicMood[op.musicMood] || 0) + 1;
    }
    if (op.musicLanguage) {
      stats.byMusicLanguage[op.musicLanguage] = (stats.byMusicLanguage[op.musicLanguage] || 0) + 1;
    }
     if (op.televisionContentType) {
       stats.byTelevisionContentType[op.televisionContentType] = (stats.byTelevisionContentType[op.televisionContentType] || 0) + 1;
     }
     if (op.youtubeChannelType) {
       stats.byYoutubeChannelType[op.youtubeChannelType] = (stats.byYoutubeChannelType[op.youtubeChannelType] || 0) + 1;
     }
    if (op.ottSeriesType) {
      stats.byOttSeriesType[op.ottSeriesType] = (stats.byOttSeriesType[op.ottSeriesType] || 0) + 1;
    }
    if (op.instagramContentType) {
      stats.byInstagramCategory[op.instagramContentType] = (stats.byInstagramCategory[op.instagramContentType] || 0) + 1;
    }

    //Demographics
    if (op.demographics) {
      const { gender, age, region } = op.demographics;
      if (gender) {
        stats.byDemographics.gender[gender] = (stats.byDemographics.gender[gender] || 0) + 1;
      }
      if (age) {
        stats.byDemographics.age[age] = (stats.byDemographics.age[age] || 0) + 1;
      }
      if (region) {
        stats.byDemographics.region[region] = (stats.byDemographics.region[region] || 0) + 1;
      }
    }
  });

  return stats;
};
