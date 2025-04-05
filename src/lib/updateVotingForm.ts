import { useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

/**
 * Hook to patch voting form behaviors like network status notifications.
 */
export const useVotingFormPatches = () => {
  useEffect(() => {
    console.log('VotingForm patches applied - API endpoint set to https://moviepulse-api-snfl.onrender.com/api');

    const handleOnline = () => {
      toast({
        title: "You're back online",
        description: "Your votes will now be saved to the database.",
        variant: "default",
      });
    };

    const handleOffline = () => {
      toast({
        title: "You're offline",
        description: "Your votes will not be saved until you're back online.",
        variant: "destructive",
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
};

/**
 * Helper function to handle API failures and provide fallback data.
 * @param apiCall The API call function returning a promise.
 * @param fallbackData The fallback data to use if the API call fails.
 * @returns The API response or fallback data.
 */
export const handleApiFailover = async <T>(apiCall: () => Promise<T>, fallbackData: T): Promise<T> => {
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
