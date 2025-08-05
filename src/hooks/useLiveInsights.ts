
import { useState, useEffect } from 'react';
import { getBrowserFingerprint } from '@/lib/utils';

export interface LiveInsights {
  genreTrends: Array<{ _id: string; count: number; categories: string[] }>;
  regionalTrends: Array<{ _id: { region: string; genre: string }; count: number }>;
  platformTrends: Array<{ _id: string; count: number; avgAge: number }>;
  demographicTrends: Array<{ _id: { gender: string; age: string; genre: string }; count: number }>;
  totalRecentOpinions: number;
  generatedAt: string;
}

export interface PersonalizedInsights {
  hasData: boolean;
  userPreferences?: {
    genres: string[];
    categories: string[];
    totalVotes: number;
  };
  insights: Array<{
    title: string;
    description: string;
    type: string;
  }>;
  similarUserInsights?: any[];
}

export const useLiveInsights = () => {
  const [liveInsights, setLiveInsights] = useState<LiveInsights | null>(null);
  const [personalizedInsights, setPersonalizedInsights] = useState<PersonalizedInsights | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLiveInsights = async () => {
    try {
      const response = await fetch('/api/insights/live');
      const data = await response.json();
      setLiveInsights(data);
    } catch (err) {
      console.error('Error fetching live insights:', err);
      setError('Failed to load live insights');
    }
  };

  const fetchPersonalizedInsights = async () => {
    try {
      const fingerprint = await getBrowserFingerprint();
      const response = await fetch(`/api/insights/personalized/${fingerprint}`);
      const data = await response.json();
      setPersonalizedInsights(data);
    } catch (err) {
      console.error('Error fetching personalized insights:', err);
      setError('Failed to load personalized insights');
    }
  };

  const refreshInsights = async () => {
    setIsLoading(true);
    await Promise.all([fetchLiveInsights(), fetchPersonalizedInsights()]);
    setIsLoading(false);
  };

  useEffect(() => {
    refreshInsights();
    
    // Refresh insights when new opinions are submitted
    const handleOpinionSubmitted = () => {
      setTimeout(refreshInsights, 1000);
    };

    window.addEventListener('opinionSubmitted', handleOpinionSubmitted);
    return () => window.removeEventListener('opinionSubmitted', handleOpinionSubmitted);
  }, []);

  return {
    liveInsights,
    personalizedInsights,
    isLoading,
    error,
    refreshInsights
  };
};
