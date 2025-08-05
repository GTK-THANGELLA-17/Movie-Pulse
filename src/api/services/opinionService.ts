
import { getBrowserFingerprint } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { fetchWithRetries, API_URL } from '../core/apiClient';
import { OpinionData } from '../types/opinionTypes';
import { getDeviceInfo } from '../utils/deviceUtils';
import { generateAnswerFromOpinionData, updateEnhancedVotesTracker } from '../utils/opinionHelpers';

export const submitOpinion = async (opinionData: OpinionData) => {
  try {
    const userId = await getBrowserFingerprint();
    const deviceInfo = getDeviceInfo();
    
    console.log('📝 Enhanced opinion submission to:', `${API_URL}/opinions`);
    
    if (!opinionData.projectType || !opinionData.category) {
      throw new Error("Required fields missing");
    }
    
    const enhancedOpinionData = {
      ...opinionData,
      userId,
      deviceInfo,
      question: opinionData.question || `What's your preference for ${opinionData.projectType}?`,
      answer: opinionData.answer || generateAnswerFromOpinionData(opinionData),
      timestamp: new Date().toISOString(),
      sessionId: sessionStorage.getItem('session-id') || Date.now().toString()
    };
    
    console.log('🚀 Enhanced submission data ready');
    
    // Enhanced local backup
    const backupKey = `moviepulse-opinion-enhanced-${Date.now()}`;
    localStorage.setItem(backupKey, JSON.stringify({
      ...enhancedOpinionData,
      backupTimestamp: new Date().toISOString(),
      enhanced: true
    }));
    
    const response = await fetchWithRetries(`${API_URL}/opinions`, {
      method: 'POST',
      body: JSON.stringify(enhancedOpinionData),
    });
    
    // Remove backup on success
    localStorage.removeItem(backupKey);
    
    // Enhanced vote tracking
    const voteKey = `moviepulse-vote-enhanced-${userId}-${opinionData.projectType}`;
    localStorage.setItem(voteKey, JSON.stringify({
      voted: true,
      timestamp: new Date().toISOString(),
      voteRecordId: response.voteRecord,
      enhanced: true
    }));
    
    // Update enhanced votes tracker
    updateEnhancedVotesTracker(opinionData.projectType, response);
    
    return response;
  } catch (error) {
    console.error('❌ Enhanced opinion submission error:', error);
    toast({
      title: "Submission issue",
      description: "Opinion saved locally with enhanced tracking. Will sync when connection is restored.",
      variant: "destructive",
    });
    throw error;
  }
};

export const checkVoteStatus = async (projectType: string) => {
  try {
    const userId = await getBrowserFingerprint();
    console.log(`🔍 Enhanced vote status check for ${projectType}`);
    
    const response = await fetchWithRetries(`${API_URL}/opinions/user-voted/${userId}/${projectType}`, {
      method: 'GET',
    });
    
    console.log(`✅ Enhanced vote status:`, response);
    return response;
  } catch (error) {
    console.error(`❌ Enhanced vote check error:`, error);
    
    // Enhanced local fallback
    const userId = await getBrowserFingerprint();
    const enhancedVoteKey = `moviepulse-vote-enhanced-${userId}-${projectType}`;
    const legacyVoteKey = `moviepulse-vote-${userId}-${projectType}`;
    
    const enhancedVote = localStorage.getItem(enhancedVoteKey);
    const legacyVote = localStorage.getItem(legacyVoteKey);
    
    const hasVoted = !!(enhancedVote || legacyVote);
    
    return {
      hasVoted,
      votedAt: enhancedVote ? JSON.parse(enhancedVote).timestamp : legacyVote,
      isLocalData: true,
      enhanced: !!enhancedVote
    };
  }
};

export const getOpinionsByCategory = async (category: string, filters: any = {}) => {
  try {
    console.log(`🔍 Fetching opinions for category: ${category} with filters:`, filters);
    
    const queryParams = new URLSearchParams();
    queryParams.append('category', category);
    
    if (filters.timeframe) queryParams.append('timeframe', filters.timeframe);
    if (filters.region) queryParams.append('region', filters.region);
    if (filters.projectType) queryParams.append('projectType', filters.projectType);
    
    const response = await fetchWithRetries(`${API_URL}/opinions/category/${category}?${queryParams}`, {
      method: 'GET',
    });
    
    console.log(`✅ Retrieved ${response.length} opinions for category ${category}`);
    return response;
  } catch (error) {
    console.error(`❌ Error fetching opinions for category ${category}:`, error);
    return [];
  }
};
