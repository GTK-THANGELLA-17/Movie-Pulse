
import { useState, useEffect } from 'react';
import { useVotingPeriodWithId } from './useVotingPeriod';

export const useOpinionStorage = () => {
  const { currentPeriodId } = useVotingPeriodWithId();
  const [opinions, setOpinions] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Use a consistent storage key format
  const getStorageKey = () => {
    return `Audience-Pulse-opinions-${currentPeriodId}`;
  };

  const loadOpinions = () => {
    try {
      const storageKey = getStorageKey();
      const stored = localStorage.getItem(storageKey);
      console.log('OpinionStorage: Loading from key:', storageKey);
      console.log('OpinionStorage: Raw stored data:', stored);
      
      if (stored) {
        const parsedOpinions = JSON.parse(stored);
        console.log(`OpinionStorage: Retrieved ${parsedOpinions.length} opinions`);
        setOpinions(parsedOpinions);
        setIsLoaded(true);
        return parsedOpinions;
      } else {
        console.log('OpinionStorage: No opinions found, initializing empty array');
        setOpinions([]);
        setIsLoaded(true);
        return [];
      }
    } catch (error) {
      console.error('OpinionStorage: Error loading opinions:', error);
      setOpinions([]);
      setIsLoaded(true);
      return [];
    }
  };

  const saveOpinion = (opinion: any) => {
    try {
      const storageKey = getStorageKey();
      const existing = localStorage.getItem(storageKey);
      const existingOpinions = existing ? JSON.parse(existing) : [];
      
      // Add period information to the opinion
      const opinionWithPeriod = {
        ...opinion,
        votingPeriodId: currentPeriodId,
        submittedAt: new Date().toISOString()
      };
      
      const updatedOpinions = [...existingOpinions, opinionWithPeriod];
      localStorage.setItem(storageKey, JSON.stringify(updatedOpinions));
      
      console.log('OpinionStorage: Opinion saved:', opinionWithPeriod);
      console.log('OpinionStorage: Updated opinions array length:', updatedOpinions.length);
      
      // Update state immediately
      setOpinions(updatedOpinions);
      
      // Dispatch events for immediate UI updates
      setTimeout(() => {
        console.log('OpinionStorage: Dispatching events...');
        
        // Primary event for vote tracking
        window.dispatchEvent(new CustomEvent('opinionSubmitted', { 
          detail: { opinion: opinionWithPeriod, projectType: opinion.projectType }
        }));
        
        // Stats refresh events
        window.dispatchEvent(new CustomEvent('refreshLocalStats'));
        window.dispatchEvent(new CustomEvent('refreshAllStats'));
        
        // Storage event for cross-component communication
        window.dispatchEvent(new StorageEvent('storage', {
          key: storageKey,
          newValue: JSON.stringify(updatedOpinions),
          oldValue: existing
        }));
        
        console.log('OpinionStorage: All events dispatched');
      }, 10);
      
      return opinionWithPeriod;
    } catch (error) {
      console.error('OpinionStorage: Error saving opinion:', error);
      throw error;
    }
  };

  const getOpinions = () => {
    if (!isLoaded) {
      return loadOpinions();
    }
    return opinions;
  };

  const clearOpinions = () => {
    try {
      const storageKey = getStorageKey();
      localStorage.removeItem(storageKey);
      setOpinions([]);
      console.log(`OpinionStorage: Opinions cleared for period ${currentPeriodId}`);
    } catch (error) {
      console.error('OpinionStorage: Error clearing opinions:', error);
    }
  };

  // Load opinions when component mounts or voting period changes
  useEffect(() => {
    console.log('OpinionStorage: Effect triggered - loading opinions');
    loadOpinions();
  }, [currentPeriodId]);

  return {
    opinions,
    saveOpinion,
    getOpinions,
    clearOpinions,
    currentPeriodId,
    isLoaded,
  };
};
