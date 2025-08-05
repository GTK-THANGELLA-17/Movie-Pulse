
import { ProcessedStats } from "@/types/stats";

export interface ChartDataSet {
  name: string;
  value: number;
}

export interface SectionChartData {
  projectTypeData: ChartDataSet[];
  countryData: ChartDataSet[];
  regionData: ChartDataSet[];
  genreData: ChartDataSet[];
  musicGenreData: ChartDataSet[];
  musicMoodData: ChartDataSet[];
  musicLanguageData: ChartDataSet[];
  youtubeData: ChartDataSet[];
  tvChannelData: ChartDataSet[];
  ottPlatformData: ChartDataSet[];
  filmIndustryData: ChartDataSet[];
  tvContentTypeData: ChartDataSet[];
  youtubeChannelTypeData: ChartDataSet[];
  ottSeriesTypeData: ChartDataSet[];
  instagramCategoryData: ChartDataSet[];
}

const objectToChartData = (obj: Record<string, number>): ChartDataSet[] => 
  Object.entries(obj || {})
    .map(([name, value]) => ({ name, value }))
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value);

export const processSectionChartData = (stats: ProcessedStats, sectionType: string): SectionChartData => {
  const baseData: SectionChartData = {
    projectTypeData: objectToChartData(stats.byProjectType),
    countryData: objectToChartData(stats.byCountry),
    regionData: objectToChartData(stats.byDemographics?.region || {}),
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

  // Section-specific data processing
  switch (sectionType) {
    case "films":
      baseData.genreData = objectToChartData(stats.byGenre);
      baseData.filmIndustryData = objectToChartData(stats.byFilmIndustry);
      break;
      
    case "youtube-content":
      baseData.youtubeData = objectToChartData(stats.byYoutubeCategory);
      baseData.youtubeChannelTypeData = objectToChartData(stats.byYoutubeChannelType);
      break;
      
    case "ott":
      baseData.genreData = objectToChartData(stats.byGenre);
      baseData.ottPlatformData = objectToChartData(stats.byOttPlatform);
      baseData.ottSeriesTypeData = objectToChartData(stats.byOttSeriesType);
      break;
      
    case "television":
      baseData.tvChannelData = objectToChartData(stats.byTvChannel);
      baseData.tvContentTypeData = objectToChartData(stats.byTelevisionContentType);
      break;
      
    case "music":
      baseData.musicGenreData = objectToChartData(stats.byMusicGenre);
      baseData.musicMoodData = objectToChartData(stats.byMusicMood);
      baseData.musicLanguageData = objectToChartData(stats.byMusicLanguage);
      break;
      
    case "instagram-content":
      baseData.instagramCategoryData = objectToChartData(stats.byInstagramCategory);
      break;
      
    default: // local - all data
      baseData.genreData = objectToChartData(stats.byGenre);
      baseData.musicGenreData = objectToChartData(stats.byMusicGenre);
      baseData.youtubeData = objectToChartData(stats.byYoutubeCategory);
      baseData.ottPlatformData = objectToChartData(stats.byOttPlatform);
      baseData.filmIndustryData = objectToChartData(stats.byFilmIndustry);
      baseData.tvChannelData = objectToChartData(stats.byTvChannel);
      baseData.tvContentTypeData = objectToChartData(stats.byTelevisionContentType);
      baseData.youtubeChannelTypeData = objectToChartData(stats.byYoutubeChannelType);
      baseData.ottSeriesTypeData = objectToChartData(stats.byOttSeriesType);
      baseData.instagramCategoryData = objectToChartData(stats.byInstagramCategory);
      break;
  }

  return baseData;
};

export const getSectionSpecificCharts = (sectionType: string, chartData: SectionChartData) => {
  const charts = [];

  // Section-specific charts
  switch (sectionType) {
    case "films":
      if (chartData.genreData.length > 0) {
        charts.push({ data: chartData.genreData, label: "Film Genres", key: "genres", category: "Genre" });
      }
      if (chartData.filmIndustryData.length > 0) {
        charts.push({ data: chartData.filmIndustryData, label: "Film Industries", key: "industries", category: "Industry" });
      }
      if (chartData.countryData.length > 0) {
        charts.push({ data: chartData.countryData, label: "Country Distribution", key: "countries", category: "Demographics" });
      }
      if (chartData.regionData.length > 0) {
        charts.push({ data: chartData.regionData, label: "Regional Distribution", key: "regions", category: "Demographics" });
      }
      break;
      
    case "youtube-content":
      if (chartData.youtubeData.length > 0) {
        charts.push({ data: chartData.youtubeData, label: "YouTube Categories", key: "categories", category: "Content" });
      }
      if (chartData.youtubeChannelTypeData.length > 0) {
        charts.push({ data: chartData.youtubeChannelTypeData, label: "Channel Types", key: "channelTypes", category: "Channel" });
      }
      if (chartData.countryData.length > 0) {
        charts.push({ data: chartData.countryData, label: "Country Distribution", key: "countries", category: "Demographics" });
      }
      if (chartData.regionData.length > 0) {
        charts.push({ data: chartData.regionData, label: "Regional Distribution", key: "regions", category: "Demographics" });
      }
      break;
      
    case "ott":
      if (chartData.genreData.length > 0) {
        charts.push({ data: chartData.genreData, label: "OTT Genres", key: "genres", category: "Genre" });
      }
      if (chartData.ottPlatformData.length > 0) {
        charts.push({ data: chartData.ottPlatformData, label: "OTT Platforms", key: "platforms", category: "Platform" });
      }
      if (chartData.ottSeriesTypeData.length > 0) {
        charts.push({ data: chartData.ottSeriesTypeData, label: "Series Types", key: "seriesTypes", category: "Content" });
      }
      if (chartData.countryData.length > 0) {
        charts.push({ data: chartData.countryData, label: "Country Distribution", key: "countries", category: "Demographics" });
      }
      if (chartData.regionData.length > 0) {
        charts.push({ data: chartData.regionData, label: "Regional Distribution", key: "regions", category: "Demographics" });
      }
      break;
      
    case "television":
      if (chartData.tvChannelData.length > 0) {
        charts.push({ data: chartData.tvChannelData, label: "TV Channels", key: "channels", category: "Channel" });
      }
      if (chartData.tvContentTypeData.length > 0) {
        charts.push({ data: chartData.tvContentTypeData, label: "Content Types", key: "contentTypes", category: "Content" });
      }
      if (chartData.countryData.length > 0) {
        charts.push({ data: chartData.countryData, label: "Country Distribution", key: "countries", category: "Demographics" });
      }
      if (chartData.regionData.length > 0) {
        charts.push({ data: chartData.regionData, label: "Regional Distribution", key: "regions", category: "Demographics" });
      }
      break;
      
    case "music":
      if (chartData.musicGenreData.length > 0) {
        charts.push({ data: chartData.musicGenreData, label: "Music Genres", key: "musicGenres", category: "Genre" });
      }
      if (chartData.musicMoodData.length > 0) {
        charts.push({ data: chartData.musicMoodData, label: "Music Moods", key: "musicMoods", category: "Mood" });
      }
      if (chartData.musicLanguageData.length > 0) {
        charts.push({ data: chartData.musicLanguageData, label: "Music Languages", key: "musicLanguages", category: "Language" });
      }
      if (chartData.countryData.length > 0) {
        charts.push({ data: chartData.countryData, label: "Country Distribution", key: "countries", category: "Demographics" });
      }
      if (chartData.regionData.length > 0) {
        charts.push({ data: chartData.regionData, label: "Regional Distribution", key: "regions", category: "Demographics" });
      }
      break;
      
    case "instagram-content":
      if (chartData.instagramCategoryData.length > 0) {
        charts.push({ data: chartData.instagramCategoryData, label: "Content Categories", key: "categories", category: "Content" });
      }
      if (chartData.countryData.length > 0) {
        charts.push({ data: chartData.countryData, label: "Country Distribution", key: "countries", category: "Demographics" });
      }
      if (chartData.regionData.length > 0) {
        charts.push({ data: chartData.regionData, label: "Regional Distribution", key: "regions", category: "Demographics" });
      }
      break;
      
    default: // local - comprehensive data
      if (chartData.genreData.length > 0) {
        charts.push({ data: chartData.genreData, label: "Film Genres", key: "genres", category: "Film Content" });
      }
      if (chartData.musicGenreData.length > 0) {
        charts.push({ data: chartData.musicGenreData, label: "Music Genres", key: "musicGenres", category: "Music Content" });
      }
      if (chartData.youtubeData.length > 0) {
        charts.push({ data: chartData.youtubeData, label: "YouTube Categories", key: "youtubeCategories", category: "YouTube Content" });
      }
      if (chartData.ottPlatformData.length > 0) {
        charts.push({ data: chartData.ottPlatformData, label: "OTT Platforms", key: "ottPlatforms", category: "OTT Content" });
      }
      if (chartData.filmIndustryData.length > 0) {
        charts.push({ data: chartData.filmIndustryData, label: "Film Industries", key: "filmIndustries", category: "Film Industry" });
      }
      if (chartData.tvChannelData.length > 0) {
        charts.push({ data: chartData.tvChannelData, label: "TV Channels", key: "tvChannels", category: "Television Content" });
      }
      if (chartData.countryData.length > 0) {
        charts.push({ data: chartData.countryData, label: "Country Distribution", key: "countries", category: "Demographics" });
      }
      if (chartData.regionData.length > 0) {
        charts.push({ data: chartData.regionData, label: "Regional Distribution", key: "regions", category: "Demographics" });
      }
      break;
  }

  return charts;
};
