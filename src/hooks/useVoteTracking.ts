
import { useState, useEffect } from 'react';
import { getBrowserFingerprint } from '@/lib/utils';
import { ProjectType } from '@/lib/types';
import { useVotingPeriodWithId } from './useVotingPeriod';

export interface VotedStatus {
  hasVotedInFilm: boolean;
  hasVotedInYoutubeFilm: boolean;
  hasVotedInYoutubeContent: boolean;
  hasVotedInOtt: boolean;
  hasVotedInTelevision: boolean;
  hasVotedInInstagram: boolean;
  hasVotedInMusic: boolean;
}

export const useVoteTracking = () => {
  const { currentPeriodId } = useVotingPeriodWithId();
  const [votedStatus, setVotedStatus] = useState<VotedStatus>({
    hasVotedInFilm: false,
    hasVotedInYoutubeFilm: false,
    hasVotedInYoutubeContent: false,
    hasVotedInOtt: false,
    hasVotedInTelevision: false,
    hasVotedInInstagram: false,
    hasVotedInMusic: false,
  });

  const [isLoading, setIsLoading] = useState(true);

  // Use consistent storage key format
  const getStorageKey = () => {
    return `Audience-Pulse-opinions-${currentPeriodId}`;
  };

  // Check vote status by reading the same storage location as useOpinionStorage
  const checkVoteStatusFromStorage = () => {
    const storageKey = getStorageKey();
    
    try {
      console.log('VoteTracking: Checking storage key:', storageKey);
      const stored = localStorage.getItem(storageKey);
      console.log('VoteTracking: Raw stored data:', stored);
      
      if (stored) {
        const opinions = JSON.parse(stored);
        console.log('VoteTracking: Parsed opinions:', opinions);
        
        const status = {
          hasVotedInFilm: opinions.some((op: any) => op.projectType === 'Films'),
          hasVotedInYoutubeFilm: opinions.some((op: any) => op.projectType === 'YouTubeFilm'),
          hasVotedInYoutubeContent: opinions.some((op: any) => op.projectType === 'YouTubeContent'),
          hasVotedInOtt: opinions.some((op: any) => op.projectType === 'OTTPlatform'),
          hasVotedInTelevision: opinions.some((op: any) => op.projectType === 'Television'),
          hasVotedInInstagram: opinions.some((op: any) => op.projectType === 'InstagramContent'),
          hasVotedInMusic: opinions.some((op: any) => op.projectType === 'MusicContent'),
        };
        
        console.log('VoteTracking: Calculated vote status:', status);
        return status;
      } else {
        console.log('VoteTracking: No stored opinions found');
      }
    } catch (error) {
      console.error('VoteTracking: Error reading storage:', error);
    }
    
    return {
      hasVotedInFilm: false,
      hasVotedInYoutubeFilm: false,
      hasVotedInYoutubeContent: false,
      hasVotedInOtt: false,
      hasVotedInTelevision: false,
      hasVotedInInstagram: false,
      hasVotedInMusic: false,
    };
  };

  const refreshVoteStatus = () => {
    console.log('VoteTracking: Refreshing vote status...');
    const status = checkVoteStatusFromStorage();
    setVotedStatus(status);
    console.log('VoteTracking: Vote status updated to:', status);
  };

  // Load vote status immediately when component mounts and voting period changes
  useEffect(() => {
    console.log('VoteTracking: Effect triggered for period:', currentPeriodId);
    refreshVoteStatus();
    setIsLoading(false);
  }, [currentPeriodId]);

  // Listen for storage changes and opinion submissions
  useEffect(() => {
    const handleOpinionSubmitted = (event: any) => {
      console.log('VoteTracking: Opinion submitted event received:', event.detail);
      setTimeout(() => refreshVoteStatus(), 50);
    };

    const handleStorageChange = (event: StorageEvent) => {
      console.log('VoteTracking: Storage change event:', event.key);
      if (event.key && event.key === getStorageKey()) {
        setTimeout(() => refreshVoteStatus(), 50);
      }
    };

    const handleRefreshEvents = () => {
      console.log('VoteTracking: Refresh event received');
      setTimeout(() => refreshVoteStatus(), 50);
    };

    window.addEventListener('opinionSubmitted', handleOpinionSubmitted);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('refreshLocalStats', handleRefreshEvents);
    window.addEventListener('refreshAllStats', handleRefreshEvents);

    return () => {
      window.removeEventListener('opinionSubmitted', handleOpinionSubmitted);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('refreshLocalStats', handleRefreshEvents);
      window.removeEventListener('refreshAllStats', handleRefreshEvents);
    };
  }, [currentPeriodId]);

  const markAsVoted = async (projectType: ProjectType) => {
    console.log('VoteTracking: Marking as voted for:', projectType);
    refreshVoteStatus();
  };

  const hasVotedInCategory = (projectType: ProjectType): boolean => {
    const categoryMap: Record<ProjectType, keyof VotedStatus> = {
      Films: 'hasVotedInFilm',
      YouTubeFilm: 'hasVotedInYoutubeFilm',
      YouTubeContent: 'hasVotedInYoutubeContent',
      OTTPlatform: 'hasVotedInOtt',
      Television: 'hasVotedInTelevision',
      InstagramContent: 'hasVotedInInstagram',
      MusicContent: 'hasVotedInMusic',
    };
    
    const hasVoted = votedStatus[categoryMap[projectType]] || false;
    console.log(`VoteTracking: Checking if voted in ${projectType}: ${hasVoted}`);
    return hasVoted;
  };

  return {
    votedStatus,
    isLoading,
    markAsVoted,
    hasVotedInCategory,
    refreshVoteStatus,
    currentPeriodId,
  };
};
