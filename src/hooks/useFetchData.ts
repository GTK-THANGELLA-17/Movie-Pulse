
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

// Generic type parameters for different data types
export function useFetchData<T>(
  fetchFn: () => Promise<T>,
  initialData: T,
  options: {
    enabled?: boolean;
    retries?: number;
    retryDelay?: number;
    showToast?: boolean;
    loadingMessage?: string;
    errorMessage?: string;
    successMessage?: string;
  } = {}
) {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const {
    enabled = true,
    retries = 3,
    retryDelay = 1500,
    showToast = false,
    loadingMessage = 'Loading data...',
    errorMessage = 'Failed to load data',
    successMessage
  } = options;

  // Function to fetch data with built-in retries
  const fetchData = async () => {
    setIsLoading(true);
    
    try {
      const result = await fetchFn();
      
      setData(result);
      setError(null);
      
      if (showToast && successMessage) {
        toast({
          title: 'Success',
          description: successMessage,
        });
      }
      
      return result;
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err as Error);
      
      // Retry logic if retries are available
      if (retryCount < retries) {
        console.log(`Retrying (${retryCount + 1}/${retries}) in ${retryDelay}ms...`);
        
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
        }, retryDelay);
        
        return null;
      }
      
      if (showToast) {
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
      }
      
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to trigger data fetching
  useEffect(() => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }
    
    fetchData();
  }, [enabled, retryCount]);

  // Function to manually refetch data
  const refetch = () => {
    setRetryCount(0);
    return fetchData();
  };

  return { data, isLoading, error, refetch };
}

export default useFetchData;
