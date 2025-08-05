
import { useEffect } from "react";

interface UseStatsEventHandlersProps {
  activeSection: string;
  dataSource: string;
  loadStats: () => Promise<void>;
  isLoaded: boolean;
}

export const useStatsEventHandlers = ({ 
  activeSection, 
  dataSource, 
  loadStats, 
  isLoaded 
}: UseStatsEventHandlersProps) => {
  // Listen for immediate opinion submission events and refresh triggers
  useEffect(() => {
    const handleOpinionSubmitted = (event: any) => {
      console.log('StatsEventHandlers: Opinion submitted event received', event.detail);
      // Immediate refresh for local stats
      if (dataSource === 'local') {
        setTimeout(() => loadStats(), 50);
      }
    };

    const handleStatsRefresh = () => {
      console.log('StatsEventHandlers: Refresh event received');
      setTimeout(() => loadStats(), 50);
    };

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key && event.key.includes('moviepulse-opinions-')) {
        console.log('StatsEventHandlers: Storage changed, refreshing local stats');
        if (dataSource === 'local') {
          setTimeout(() => loadStats(), 50);
        }
      }
    };

    // Listen to multiple events for immediate updates
    window.addEventListener('opinionSubmitted', handleOpinionSubmitted);
    window.addEventListener('refreshLocalStats', handleStatsRefresh);
    window.addEventListener('refreshAllStats', handleStatsRefresh);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('opinionSubmitted', handleOpinionSubmitted);
      window.removeEventListener('refreshLocalStats', handleStatsRefresh);
      window.removeEventListener('refreshAllStats', handleStatsRefresh);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [activeSection, dataSource, loadStats, isLoaded]);
};
