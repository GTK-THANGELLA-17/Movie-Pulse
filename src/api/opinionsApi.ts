
import { getBrowserFingerprint } from "@/lib/utils";

const API_URL = 'https://moviepulse-api-snfl.onrender.com/api';

export interface OpinionData {
  category: 'film' | 'television' | 'youtube' | 'streaming';
  question: string;
  answer: string;
  demographics?: {
    age?: number;
    region?: string;
    gender?: string;
  };
  tags?: string[];
}

export interface AnalyticsData {
  totalOpinions: number;
  categoryBreakdown: Array<{ _id: string; count: number }>;
  sentimentAnalysis: Array<{ _id: string; count: number }>;
  regionalDistribution: Array<{ _id: string; count: number }>;
  timeData: Array<{ _id: { year: number; month: number; day: number }; count: number }>;
  categoryTrends: Array<{ 
    _id: { 
      category: string; 
      year: number; 
      month: number; 
      day: number 
    }; 
    count: number 
  }>;
}

export interface TrendingTopic {
  _id: string;
  count: number;
}

export const submitOpinion = async (opinionData: OpinionData) => {
  try {
    const userId = await getBrowserFingerprint();
    
    console.log('Submitting opinion to:', `${API_URL}/opinions`);
    console.log('Opinion data:', { ...opinionData, userId });
    
    const response = await fetch(`${API_URL}/opinions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...opinionData,
        userId
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server response error:', errorData);
      throw new Error(errorData.message || 'Failed to submit opinion');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting opinion:', error);
    throw error;
  }
};

export const getAnalytics = async (): Promise<AnalyticsData> => {
  try {
    const response = await fetch(`${API_URL}/opinions/analytics`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch analytics');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
};

export const getOpinionsByCategory = async (
  category: string, 
  filters?: { region?: string; timeframe?: string; sentiment?: string }
) => {
  try {
    let url = `${API_URL}/opinions/category/${category}`;
    
    // Add query parameters if filters provided
    if (filters) {
      const params = new URLSearchParams();
      if (filters.region) params.append('region', filters.region);
      if (filters.timeframe) params.append('timeframe', filters.timeframe);
      if (filters.sentiment) params.append('sentiment', filters.sentiment);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to fetch ${category} opinions`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${category} opinions:`, error);
    throw error;
  }
};

export const getTrendingTopics = async (): Promise<TrendingTopic[]> => {
  try {
    const response = await fetch(`${API_URL}/opinions/trending`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch trending topics');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching trending topics:', error);
    throw error;
  }
};
