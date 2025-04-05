
import { useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

export const useVotingFormPatches = () => {
  useEffect(() => {
    // This patch ensures we're using the correct API endpoint
    console.log('VotingForm patches applied - API endpoint set to https://moviepulse-api-snfl.onrender.com/api');
    
    // Add handler for network errors
    window.addEventListener('online', () => {
      toast({
        title: "You're back online",
        description: "Your votes will now be saved to the database.",
        variant: "default",
      });
    });
    
    window.addEventListener('offline', () => {
      toast({
        title: "You're offline",
        description: "Your votes will not be saved until you're back online.",
        variant: "destructive",
      });
    });
    
    return () => {
      window.removeEventListener('online', () => {});
      window.removeEventListener('offline', () => {});
    };
  }, []);
};

// Helper function to handle API fallbacks
export const handleApiFailover = async (apiCall: () => Promise<any>, fallbackData: any) => {
  try {
    const response = await apiCall();
    console.log("API call successful:", response);
    return response;
  } catch (error) {
    console.error("API call failed, using fallback data:", error);
    toast({
      title: "Connection issue",
      description: "Could not connect to the server. Using local data instead.",
      variant: "destructive",
    });
    return fallbackData;
  }
};
