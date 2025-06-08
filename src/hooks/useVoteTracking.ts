
import { useState, useEffect } from 'react';
import { getBrowserFingerprint } from '@/lib/utils';
import { ProjectType } from '@/lib/types';

export interface VotedStatus {
  hasVotedInFilm: boolean;
  hasVotedInYoutubeFilm: boolean;
  hasVotedInYoutubeContent: boolean;
  hasVotedInOtt: boolean;
  hasVotedInTelevision: boolean;
}

export const useVoteTracking = () => {
  const [votedStatus, setVotedStatus] = useState<VotedStatus>({
    hasVotedInFilm: false,
    hasVotedInYoutubeFilm: false,
    hasVotedInYoutubeContent: false,
    hasVotedInOtt: false,
    hasVotedInTelevision: false,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkOpinionStatus = async () => {
      try {
        const fingerprint = await getBrowserFingerprint();
        const sessionKey = `moviepulse-session-${fingerprint}`;
        
        // Check local storage for this session
        const storedOpinions = localStorage.getItem(sessionKey);
        if (storedOpinions) {
          const opinions = JSON.parse(storedOpinions);
          setVotedStatus({
            hasVotedInFilm: opinions.Films || false,
            hasVotedInYoutubeFilm: opinions.YouTubeFilm || false,
            hasVotedInYoutubeContent: opinions.YouTubeContent || false,
            hasVotedInOtt: opinions.OTTPlatform || false,
            hasVotedInTelevision: opinions.Television || false,
          });
        }
      } catch (error) {
        console.error('Error checking opinion status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkOpinionStatus();
  }, []);

  const markAsVoted = async (projectType: ProjectType) => {
    try {
      const fingerprint = await getBrowserFingerprint();
      const sessionKey = `moviepulse-session-${fingerprint}`;
      
      const storedOpinions = localStorage.getItem(sessionKey);
      const opinions = storedOpinions ? JSON.parse(storedOpinions) : {};
      
      opinions[projectType] = true;
      opinions.timestamp = new Date().toISOString();
      
      localStorage.setItem(sessionKey, JSON.stringify(opinions));
      
      // Update state
      const categoryMap: Record<ProjectType, keyof VotedStatus> = {
        Films: 'hasVotedInFilm',
        YouTubeFilm: 'hasVotedInYoutubeFilm',
        YouTubeContent: 'hasVotedInYoutubeContent',
        OTTPlatform: 'hasVotedInOtt',
        Television: 'hasVotedInTelevision',
      };
      
      if (categoryMap[projectType]) {
        setVotedStatus(prev => ({
          ...prev,
          [categoryMap[projectType]]: true,
        }));
      }
    } catch (error) {
      console.error('Error marking opinion:', error);
    }
  };

  const hasVotedInCategory = (projectType: ProjectType): boolean => {
    const categoryMap: Record<ProjectType, keyof VotedStatus> = {
      Films: 'hasVotedInFilm',
      YouTubeFilm: 'hasVotedInYoutubeFilm',
      YouTubeContent: 'hasVotedInYoutubeContent',
      OTTPlatform: 'hasVotedInOtt',
      Television: 'hasVotedInTelevision',
    };
    
    return votedStatus[categoryMap[projectType]] || false;
  };

  return {
    votedStatus,
    isLoading,
    markAsVoted,
    hasVotedInCategory,
  };
};
