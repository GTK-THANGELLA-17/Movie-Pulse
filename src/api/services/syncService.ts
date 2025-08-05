
import { fetchWithRetries, API_URL } from '../core/apiClient';
import { getBrowserFingerprint } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

export const syncLocalOpinions = async (): Promise<void> => {
  if (typeof window === 'undefined') return;
  
  try {
    console.log('🔄 Starting enhanced opinion sync...');
    
    // Check server health first
    const healthCheck = await fetch(`${API_URL.replace('/api', '')}/health`);
    if (!healthCheck.ok) {
      console.log('⚠️ Server not available, skipping sync');
      return;
    }
    
    // Find enhanced local opinions
    const enhancedOpinionKeys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('moviepulse-opinion-enhanced-')) {
        enhancedOpinionKeys.push(key);
      }
    }
    
    console.log(`📋 Found ${enhancedOpinionKeys.length} enhanced opinions to sync`);
    
    let syncedCount = 0;
    for (const key of enhancedOpinionKeys) {
      try {
        const opinionData = JSON.parse(localStorage.getItem(key) || '{}');
        
        if (!opinionData.enhanced || !opinionData.userId || opinionData._id) {
          localStorage.removeItem(key);
          continue;
        }
        
        await fetchWithRetries(`${API_URL}/opinions`, {
          method: 'POST',
          body: JSON.stringify(opinionData),
        });
        
        localStorage.removeItem(key);
        syncedCount++;
        console.log(`✅ Synced enhanced opinion: ${key}`);
      } catch (error) {
        console.error(`❌ Failed to sync enhanced opinion ${key}:`, error);
      }
    }
    
    if (syncedCount > 0) {
      console.log(`🎉 Enhanced sync complete: ${syncedCount} opinions synced`);
      toast({
        title: "Enhanced sync complete",
        description: `Synced ${syncedCount} opinions with enhanced tracking`,
      });
    }
  } catch (error) {
    console.error('❌ Enhanced sync error:', error);
  }
};

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
      "YouTubeFilm", "YouTubeContent", "InstagramContent", "OTTPlatform", "Television"
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

export const checkServerHealth = async (): Promise<boolean> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`${API_URL.replace('/api', '')}/health`, {
      method: 'GET',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    console.error('❌ Server health check failed:', error);
    return false;
  }
};
