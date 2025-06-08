
import { getBrowserFingerprint } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { Vote } from "@/lib/types";

// Updated API URL to match the provided Render.com URL
const API_URL = 'https://moviepulse-api-snfl.onrender.com/api';

// Maximum number of retries for API calls
const MAX_RETRIES = 3;

// Timeout for API calls
const API_TIMEOUT = 30000; // Increased to 30 seconds for better server response

export interface OpinionData {
  // Core fields
  category: 'film' | 'television' | 'youtube' | 'streaming';
  projectType: string;
  question: string;
  answer: string;
  
  // Common optional fields
  notes?: string;
  country?: string;
  filmIndustry?: string;
  genre?: string;
  
  // Television-specific fields
  televisionChannel?: string;
  televisionContentType?: string;
  
  // OTT-specific field
  ottPlatform?: string;
  
  // YouTube-specific field
  youtubeContentCategory?: string;
  
  // Additional fields
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

// Enhanced fetch function with better error handling and logging
const fetchWithRetries = async (url: string, options: RequestInit, retries = MAX_RETRIES) => {
  try {
    console.log(`🌐 Attempting to fetch from ${url} (attempt ${MAX_RETRIES - retries + 1})`);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
    
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache, no-store',
        'X-Requested-With': 'XMLHttpRequest',
        ...options.headers,
      },
    });
    
    clearTimeout(timeoutId);
    
    console.log(`📡 Response status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: `Server error: ${response.status} ${response.statusText}` };
      }
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`✅ Successful response from ${url}:`, data);
    return data;
  } catch (error) {
    console.error(`❌ Fetch error (retries left: ${retries}):`, error);
    
    if (retries > 0 && !(error instanceof DOMException && error.name === 'AbortError')) {
      console.log(`🔄 Retrying fetch... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`);
      // Exponential backoff with jitter
      const delay = Math.pow(2, MAX_RETRIES - retries) * 1000 + Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetries(url, options, retries - 1);
    }
    
    throw error;
  }
};

export const submitOpinion = async (opinionData: OpinionData) => {
  try {
    const userId = await getBrowserFingerprint();
    
    console.log('📝 Submitting opinion to:', `${API_URL}/opinions`);
    console.log('📊 Opinion data:', { ...opinionData, userId });
    
    // Validate required fields before submission
    if (!opinionData.projectType) {
      throw new Error("Project type is required");
    }
    
    if (!opinionData.category) {
      throw new Error("Category is required");
    }
    
    // Enhanced data structure for backend
    const enhancedOpinionData = {
      ...opinionData,
      userId,
      question: opinionData.question || `What's your preference for ${opinionData.projectType}?`,
      answer: opinionData.answer || generateAnswerFromOpinionData(opinionData),
      timestamp: new Date().toISOString(),
      // Ensure all MongoDB required fields are present
      createdAt: new Date().toISOString()
    };
    
    console.log('🚀 Enhanced opinion data for submission:', enhancedOpinionData);
    
    // Save to local storage first as backup
    const localStorageKey = `moviepulse-opinion-${Date.now()}`;
    const backupData = {
      ...enhancedOpinionData,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(localStorageKey, JSON.stringify(backupData));
    console.log('💾 Backed up opinion to local storage:', localStorageKey);
    
    const response = await fetchWithRetries(`${API_URL}/opinions`, {
      method: 'POST',
      body: JSON.stringify(enhancedOpinionData),
    });
    
    // Remove from local storage on successful submission
    localStorage.removeItem(localStorageKey);
    console.log('🗑️ Removed backup from local storage');
    
    // Mark this project type as voted in local storage
    const voteKey = `moviepulse-vote-${userId}-${opinionData.projectType}`;
    localStorage.setItem(voteKey, new Date().toISOString());
    
    // Update the all votes tracker
    try {
      const votesData = localStorage.getItem('moviepulse-votes') || '{}';
      const votes = JSON.parse(votesData);
      
      if (!votes.categories) {
        votes.categories = {};
      }
      
      votes.categories[opinionData.projectType] = {
        voted: true,
        timestamp: new Date().toISOString()
      };
      
      // Store end of voting period (30 days from now, or use existing if set)
      if (!votes.votingPeriodEnd) {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 30);
        votes.votingPeriodEnd = endDate.toISOString();
      }
      
      localStorage.setItem('moviepulse-votes', JSON.stringify(votes));
      console.log('✅ Updated vote status in local storage');
    } catch (error) {
      console.error('❌ Error updating vote status in local storage:', error);
    }
    
    return response;
  } catch (error) {
    console.error('❌ Error submitting opinion:', error);
    toast({
      title: "Connection issue",
      description: "Opinion saved locally. Will sync when connection is restored.",
      variant: "destructive",
    });
    
    throw error;
  }
};

// Helper function to generate answer from opinion data
function generateAnswerFromOpinionData(data: OpinionData): string {
  const parts = [];
  
  if (data.country) parts.push(`Country: ${data.country}`);
  if (data.filmIndustry) parts.push(`Film Industry: ${data.filmIndustry}`);
  if (data.genre) parts.push(`Genre: ${data.genre}`);
  if (data.ottPlatform) parts.push(`OTT Platform: ${data.ottPlatform}`);
  if (data.televisionChannel) parts.push(`TV Channel: ${data.televisionChannel}`);
  if (data.televisionContentType) parts.push(`Content Type: ${data.televisionContentType}`);
  if (data.youtubeContentCategory) parts.push(`YouTube Category: ${data.youtubeContentCategory}`);
  if (data.notes) parts.push(`Notes: ${data.notes}`);
  
  return parts.join(', ') || 'User preference submitted';
}

// Enhanced vote status check with better error handling
export const checkVoteStatus = async (projectType: string) => {
  try {
    const userId = await getBrowserFingerprint();
    console.log(`🔍 Checking vote status for user ${userId}, project type: ${projectType}`);
    
    const response = await fetchWithRetries(`${API_URL}/opinions/user-voted/${userId}/${projectType}`, {
      method: 'GET',
    });
    
    console.log(`✅ Vote status response:`, response);
    return response;
  } catch (error) {
    console.error(`❌ Error checking vote status for ${projectType}:`, error);
    
    // Get userId for local storage check
    const userId = await getBrowserFingerprint();
    
    // Fallback to local storage
    const voteKey = `moviepulse-vote-${userId}-${projectType}`;
    const voted = localStorage.getItem(voteKey);
    
    console.log(`📱 Using local storage fallback for vote status:`, { hasVoted: !!voted, votedAt: voted });
    
    return {
      hasVoted: !!voted,
      votedAt: voted || null,
      isLocalData: true
    };
  }
};

export const getAnalytics = async (): Promise<AnalyticsData> => {
  try {
    console.log('📈 Fetching analytics data...');
    const response = await fetchWithRetries(`${API_URL}/opinions/analytics`, {
      method: 'GET'
    });
    
    console.log('✅ Analytics data received:', response);
    return response;
  } catch (error) {
    console.error('❌ Error fetching analytics:', error);
    toast({
      title: "Connection error",
      description: "Could not fetch analytics data. Please try again later.",
      variant: "destructive",
    });
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
    
    console.log('🔍 Fetching opinions with URL:', url);
    return await fetchWithRetries(url, { method: 'GET' });
  } catch (error) {
    console.error(`❌ Error fetching ${category} opinions:`, error);
    throw error;
  }
};

export const getTrendingTopics = async (): Promise<TrendingTopic[]> => {
  try {
    console.log('📊 Fetching trending topics...');
    return await fetchWithRetries(`${API_URL}/opinions/trending`, { method: 'GET' });
  } catch (error) {
    console.error('❌ Error fetching trending topics:', error);
    throw error;
  }
};

// Enhanced server health check
export const checkServerHealth = async (): Promise<boolean> => {
  try {
    console.log('🏥 Checking server health...');
    const response = await fetch(`https://moviepulse-api-snfl.onrender.com/health`, {
      method: 'GET',
      headers: { 
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const healthData = await response.json();
      console.log('✅ Server is healthy:', healthData);
      return true;
    }
    
    console.warn('⚠️ Server health check failed with status:', response.status);
    return false;
  } catch (error) {
    console.error('❌ Error checking server health:', error);
    return false;
  }
};

// Enhanced sync function to synchronize local votes with server
export const syncLocalOpinions = async (): Promise<void> => {
  if (typeof window === 'undefined') return;
  
  try {
    console.log('🔄 Starting opinion sync...');
    
    // Check if server is available
    const isHealthy = await checkServerHealth();
    if (!isHealthy) {
      console.log('⚠️ Server not available, skipping sync');
      return;
    }
    
    // Sync vote status first
    await syncVoteStatus();
    
    // Find all locally stored opinions
    const localOpinionKeys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('moviepulse-opinion-')) {
        localOpinionKeys.push(key);
      }
    }
    
    console.log(`📋 Found ${localOpinionKeys.length} local opinions to sync`);
    
    // Try to submit each one
    let syncedCount = 0;
    for (const key of localOpinionKeys) {
      try {
        const opinionData = JSON.parse(localStorage.getItem(key) || '{}');
        
        // Skip if no data or already submitted (has id)
        if (!opinionData || !opinionData.userId || opinionData._id) {
          localStorage.removeItem(key);
          continue;
        }
        
        // Enhanced validation for different project types
        if (opinionData.projectType === 'Television' && !opinionData.televisionChannel) {
          console.log(`⚠️ Skipping incomplete TV opinion: ${key}`);
          continue;
        }
        
        if (opinionData.projectType === 'OTTPlatform' && !opinionData.ottPlatform) {
          console.log(`⚠️ Skipping incomplete OTT opinion: ${key}`);
          continue;
        }
        
        if (opinionData.projectType === 'YouTubeContent' && !opinionData.youtubeContentCategory) {
          console.log(`⚠️ Skipping incomplete YouTube content opinion: ${key}`);
          continue;
        }
        
        // Attempt to submit
        await fetchWithRetries(`${API_URL}/opinions`, {
          method: 'POST',
          body: JSON.stringify(opinionData),
        });
        
        // Remove from local storage on successful submission
        localStorage.removeItem(key);
        syncedCount++;
        console.log(`✅ Synced opinion: ${key}`);
      } catch (error) {
        console.error(`❌ Failed to sync opinion ${key}:`, error);
        // Keep in local storage to retry later
      }
    }
    
    if (syncedCount > 0) {
      console.log(`🎉 Sync complete: ${syncedCount} opinions synced`);
      toast({
        title: "Sync complete",
        description: `Synced ${syncedCount} opinions to the server`,
      });
    }
  } catch (error) {
    console.error('❌ Error syncing local opinions:', error);
  }
};

// Enhanced vote status sync
export const syncVoteStatus = async (): Promise<void> => {
  if (typeof window === 'undefined') return;
  
  try {
    console.log('🔄 Starting vote status sync...');
    const userId = await getBrowserFingerprint();
    
    // Get all local vote statuses
    const localVotes: Record<string, boolean> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(`moviepulse-vote-${userId}`)) {
        const projectType = key.replace(`moviepulse-vote-${userId}-`, '');
        localVotes[projectType] = true;
      }
    }
    
    // For each project type that we might need to sync
    const projectTypes = [
      "HighBudgetFilm", "LowBudgetFilm", "ShortFilm", 
      "YouTubeFilm", "YouTubeContent", "OTTPlatform", "Television"
    ];
    
    for (const projectType of projectTypes) {
      try {
        const serverVoteStatus = await fetchWithRetries(
          `${API_URL}/opinions/user-voted/${userId}/${projectType}`, 
          { method: 'GET' }
        );
        
        const voteKey = `moviepulse-vote-${userId}-${projectType}`;
        
        // If voted on server but not locally, update local storage
        if (serverVoteStatus.hasVoted && !localVotes[projectType]) {
          localStorage.setItem(voteKey, serverVoteStatus.votedAt || new Date().toISOString());
          console.log(`✅ Updated local vote status for ${projectType} from server`);
        }
      } catch (error) {
        console.error(`❌ Error syncing vote status for ${projectType}:`, error);
      }
    }
    
    // Update the all votes tracker
    try {
      const votesData = localStorage.getItem('moviepulse-votes') || '{}';
      const votes = JSON.parse(votesData);
      
      if (!votes.categories) {
        votes.categories = {};
      }
      
      // Update each project type
      for (const projectType in localVotes) {
        votes.categories[projectType] = {
          voted: true,
          timestamp: localStorage.getItem(`moviepulse-vote-${userId}-${projectType}`) || new Date().toISOString()
        };
      }
      
      localStorage.setItem('moviepulse-votes', JSON.stringify(votes));
      console.log('✅ Updated votes tracker');
    } catch (error) {
      console.error('❌ Error updating votes tracker:', error);
    }
  } catch (error) {
    console.error('❌ Error syncing vote status:', error);
  }
};
