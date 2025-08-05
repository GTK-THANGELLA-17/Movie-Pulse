
export interface ProcessedStats {
  total: number;
  recent: number;
  byProjectType: Record<string, number>;
  byCountry: Record<string, number>;
  byGenre: Record<string, number>;
  byYoutubeCategory: Record<string, number>;
  byOttPlatform: Record<string, number>;
  byFilmIndustry: Record<string, number>;
  byTvChannel: Record<string, number>;
  byMusicGenre: Record<string, number>;
  byMusicMood: Record<string, number>;
  byMusicLanguage: Record<string, number>;
  byTelevisionContentType: Record<string, number>;
  byYoutubeChannelType: Record<string, number>;
  byOttSeriesType: Record<string, number>;
  byInstagramCategory: Record<string, number>;
  byDemographics: {
    gender: Record<string, number>;
    age: Record<string, number>;
    region: Record<string, number>;
  };
  userNotes: any[];
}

export interface SummaryCardsProps {
  stats: ProcessedStats;
}
