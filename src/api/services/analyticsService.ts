
import { fetchWithRetries, API_URL } from '../core/apiClient';
import { EnhancedAnalyticsData } from '../types/opinionTypes';

export const getAnalytics = async (includeRemoteData = true): Promise<EnhancedAnalyticsData> => {
  try {
    console.log('📈 Fetching enhanced analytics...');
    
    const url = `${API_URL}/opinions/analytics?includeRemote=${includeRemoteData}`;
    const response = await fetchWithRetries(url, { method: 'GET' });
    
    console.log('✅ Enhanced analytics received:', response.metadata);
    return response;
  } catch (error) {
    console.error('❌ Enhanced analytics error:', error);
    
    // Return local-only fallback structure
    return {
      totalOpinions: 0,
      categoryBreakdown: [],
      sentimentAnalysis: [],
      regionalDistribution: [],
      timeData: [],
      categoryTrends: [],
      metadata: {
        includesRemoteData: false,
        generatedAt: new Date().toISOString(),
        dataSource: 'local-only'
      }
    };
  }
};

export const getVotingStatistics = async () => {
  try {
    return await fetchWithRetries(`${API_URL}/opinions/voting-stats`, { method: 'GET' });
  } catch (error) {
    console.error('❌ Voting stats error:', error);
    throw error;
  }
};

export const getRealTimeStats = async () => {
  try {
    return await fetchWithRetries(`${API_URL}/opinions/realtime-stats`, { method: 'GET' });
  } catch (error) {
    console.error('❌ Real-time stats error:', error);
    throw error;
  }
};
