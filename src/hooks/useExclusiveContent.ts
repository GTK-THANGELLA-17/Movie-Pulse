
import { useState, useEffect } from 'react';
import { getBrowserFingerprint } from '@/lib/utils';

export interface ExclusiveContent {
  _id: string;
  title: string;
  description: string;
  contentType: 'trailer' | 'teaser' | 'behind-the-scenes' | 'poll' | 'first-look' | 'insider-news';
  category: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  genre?: string;
  filmIndustry?: string;
  country?: string;
  viewCount: number;
  tags: string[];
  metadata?: {
    duration?: string;
    quality?: string;
    language?: string;
    production?: string;
  };
  createdAt: string;
}

export const useExclusiveContent = () => {
  const [content, setContent] = useState<ExclusiveContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExclusiveContent = async () => {
    try {
      setIsLoading(true);
      const fingerprint = await getBrowserFingerprint();
      
      const response = await fetch(`/api/exclusive/content/${fingerprint}`);
      const data = await response.json();
      
      setHasAccess(data.hasAccess);
      setContent(data.content || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching exclusive content:', err);
      setError('Failed to load exclusive content');
      setContent([]);
    } finally {
      setIsLoading(false);
    }
  };

  const trackView = async (contentId: string) => {
    try {
      const fingerprint = await getBrowserFingerprint();
      await fetch(`/api/exclusive/view/${contentId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: fingerprint })
      });
    } catch (err) {
      console.error('Error tracking view:', err);
    }
  };

  useEffect(() => {
    fetchExclusiveContent();
  }, []);

  return {
    content,
    isLoading,
    hasAccess,
    error,
    fetchExclusiveContent,
    trackView
  };
};
