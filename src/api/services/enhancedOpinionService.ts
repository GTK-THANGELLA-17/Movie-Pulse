import { getBrowserFingerprint } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { fetchWithRetries, API_URL } from '../core/apiClient';
import { OpinionData } from '../types/opinionTypes';
import { generateAnswerFromOpinionData, updateEnhancedVotesTracker } from '../utils/opinionHelpers';

// Enhanced device fingerprinting for better duplicate prevention
const getEnhancedDeviceInfo = async () => {
  try {
    const deviceInfo: any = {
      browser: navigator.userAgent,
      os: navigator.platform,
      device: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      colorDepth: screen.colorDepth,
      deviceMemory: (navigator as any).deviceMemory || 0,
      hardwareConcurrency: navigator.hardwareConcurrency || 0
    };

    // Canvas fingerprinting for enhanced security
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('MoviePulse fingerprint test 🎬', 2, 2);
        deviceInfo.canvasFingerprint = canvas.toDataURL().slice(-50); // Last 50 chars
      }
    } catch (e) {
      console.warn('Canvas fingerprinting failed:', e);
    }

    // WebGL fingerprinting with proper TypeScript casting
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl && 'getParameter' in gl) {
        const glContext = gl as WebGLRenderingContext;
        const renderer = glContext.getParameter(glContext.RENDERER);
        const vendor = glContext.getParameter(glContext.VENDOR);
        deviceInfo.webglFingerprint = `${vendor}-${renderer}`.slice(-50);
      }
    } catch (e) {
      console.warn('WebGL fingerprinting failed:', e);
    }

    return deviceInfo;
  } catch (error) {
    console.warn('Enhanced device info collection failed:', error);
    return {
      browser: navigator.userAgent,
      os: navigator.platform,
      device: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  }
};

export const submitEnhancedOpinion = async (opinionData: OpinionData) => {
  const submissionStartTime = Date.now();
  
  try {
    const userId = await getBrowserFingerprint();
    const deviceInfo = await getEnhancedDeviceInfo();
    
    console.log('📝 Enhanced opinion submission v2.0 to:', `${API_URL}/opinions/v2`);
    
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
      sessionId: sessionStorage.getItem('session-id') || Date.now().toString(),
      submissionTime: Date.now(),
      startTime: submissionStartTime,
      votingPeriodId: new Date().toISOString().split('T')[0]
    };
    
    console.log('🚀 Enhanced submission data prepared with security features');
    
    // Enhanced local backup with security features
    const backupKey = `moviepulse-opinion-enhanced-v2-${Date.now()}`;
    localStorage.setItem(backupKey, JSON.stringify({
      ...enhancedOpinionData,
      backupTimestamp: new Date().toISOString(),
      version: '2.0',
      enhanced: true
    }));
    
    const response = await fetchWithRetries(`${API_URL}/opinions/v2`, {
      method: 'POST',
      body: JSON.stringify(enhancedOpinionData),
    });
    
    // Remove backup on success
    localStorage.removeItem(backupKey);
    
    // Enhanced vote tracking with security
    const voteKey = `moviepulse-vote-enhanced-v2-${userId}-${opinionData.projectType}`;
    localStorage.setItem(voteKey, JSON.stringify({
      voted: true,
      timestamp: new Date().toISOString(),
      voteRecordId: response.voteRecord,
      votingToken: response.votingToken,
      enhanced: true,
      version: '2.0',
      riskScore: response.riskScore || 0
    }));
    
    // Update enhanced votes tracker
    updateEnhancedVotesTracker(opinionData.projectType, response);
    
    // Show success message with security info
    toast({
      title: "Opinion Submitted Successfully",
      description: `Your opinion has been securely recorded with enhanced tracking (Risk Score: ${response.riskScore || 0}).`,
    });
    
    return response;
  } catch (error) {
    console.error('❌ Enhanced opinion submission error:', error);
    
    // Enhanced error handling
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    if (errorMessage.includes('duplicate') || errorMessage.includes('already submitted')) {
      toast({
        title: "Already Voted",
        description: "You have already submitted your opinion for this category in the current voting period.",
        variant: "destructive",
      });
    } else if (errorMessage.includes('rate limit')) {
      toast({
        title: "Please Wait",
        description: "You're submitting too quickly. Please wait a moment before trying again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Submission Failed",
        description: "Opinion saved locally with enhanced tracking. Will sync when connection is restored.",
        variant: "destructive",
      });
    }
    
    throw error;
  }
};

export const checkEnhancedVoteStatus = async (projectType: string) => {
  try {
    const userId = await getBrowserFingerprint();
    console.log(`🔍 Enhanced vote status check v2.0 for ${projectType}`);
    
    const response = await fetchWithRetries(`${API_URL}/opinions/v2/user-voted/${userId}/${projectType}`, {
      method: 'GET',
    });
    
    console.log(`✅ Enhanced vote status:`, response);
    return response;
  } catch (error) {
    console.error(`❌ Enhanced vote check error:`, error);
    
    // Enhanced local fallback with v2 support
    const userId = await getBrowserFingerprint();
    const enhancedV2VoteKey = `moviepulse-vote-enhanced-v2-${userId}-${projectType}`;
    const enhancedVoteKey = `moviepulse-vote-enhanced-${userId}-${projectType}`;
    const legacyVoteKey = `moviepulse-vote-${userId}-${projectType}`;
    
    const enhancedV2Vote = localStorage.getItem(enhancedV2VoteKey);
    const enhancedVote = localStorage.getItem(enhancedVoteKey);
    const legacyVote = localStorage.getItem(legacyVoteKey);
    
    const hasVoted = !!(enhancedV2Vote || enhancedVote || legacyVote);
    let voteData = null;
    
    if (enhancedV2Vote) {
      voteData = JSON.parse(enhancedV2Vote);
    } else if (enhancedVote) {
      voteData = JSON.parse(enhancedVote);
    }
    
    return {
      hasVoted,
      votedAt: voteData?.timestamp || legacyVote,
      isLocalData: true,
      enhanced: !!enhancedV2Vote || !!enhancedVote,
      version: enhancedV2Vote ? '2.0' : enhancedVote ? '1.0' : 'legacy',
      riskScore: voteData?.riskScore || 0
    };
  }
};

export const getEnhancedStatistics = async (projectType?: string, options: any = {}) => {
  try {
    const {
      timeframe = '24h',
      includeRisk = false
    } = options;
    
    const endpoint = projectType 
      ? `${API_URL}/opinions/v2/enhanced-stats/${projectType}`
      : `${API_URL}/opinions/v2/enhanced-stats`;
    
    const params = new URLSearchParams();
    params.append('timeframe', timeframe);
    if (includeRisk) params.append('includeRisk', 'true');
    
    const response = await fetchWithRetries(`${endpoint}?${params}`, {
      method: 'GET',
    });
    
    console.log(`✅ Enhanced statistics retrieved for ${projectType || 'all'}`);
    return response;
  } catch (error) {
    console.error(`❌ Error fetching enhanced statistics:`, error);
    return {
      stats: [],
      suspiciousActivity: [],
      enhancedTracking: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
