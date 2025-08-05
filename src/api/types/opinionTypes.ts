
export interface OpinionData {
  category: 'film' | 'television' | 'youtube' | 'streaming' | 'instagram';
  projectType: string;
  question: string;
  answer: string;
  notes?: string;
  country?: string;
  filmIndustry?: string;
  genre?: string;
  televisionChannel?: string;
  televisionContentType?: string;
  ottPlatform?: string;
  youtubeContentCategory?: string;
  instagramContentType?: string;
  demographics?: {
    age?: number;
    region?: string;
    gender?: string;
  };
  tags?: string[];
  deviceInfo?: {
    browser?: string;
    os?: string;
    device?: string;
    screenResolution?: string;
    timezone?: string;
  };
}

export interface EnhancedAnalyticsData {
  totalOpinions: number;
  categoryBreakdown: Array<{ _id: string; count: number }>;
  sentimentAnalysis: Array<{ _id: string; count: number }>;
  regionalDistribution: Array<{ _id: string; count: number }>;
  timeData: Array<{ _id: { year: number; month: number; day: number }; count: number }>;
  categoryTrends: Array<{ 
    _id: { category: string; year: number; month: number; day: number }; 
    count: number 
  }>;
  metadata: {
    includesRemoteData: boolean;
    generatedAt: string;
    dataSource: 'combined' | 'local-only' | 'remote';
  };
}
