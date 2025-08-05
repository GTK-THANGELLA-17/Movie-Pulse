
const API_URL = import.meta.env.PROD 
  ? 'https://Audience-Pulse-api-snfl.onrender.com/api'
  : import.meta.env.VITE_API_URL || 'https://Audience-Pulse-api-snfl.onrender.com/api';

const MAX_RETRIES = 3;
const API_TIMEOUT = 30000;
const RETRY_DELAY_BASE = 1000;

// Production-ready fetch with comprehensive error handling
export const fetchWithRetries = async (url: string, options: RequestInit = {}, retries = MAX_RETRIES): Promise<any> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
  
  try {
    console.log(`🌐 API call to ${url} (attempt ${MAX_RETRIES - retries + 1})`);
    
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'X-Session-Id': sessionStorage.getItem('session-id') || Date.now().toString(),
        ...options.headers,
      },
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: `Server error: ${response.status}` };
      }
      
      // Don't retry on client errors (4xx)
      if (response.status >= 400 && response.status < 500) {
        throw new Error(errorData.message || `Client error: ${response.status}`);
      }
      
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    
    // Log error for debugging in development
    if (!import.meta.env.PROD) {
      console.error(`❌ API error (retries left: ${retries}):`, error);
    }
    
    // Don't retry on abort or client errors
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    
    if (error instanceof Error && error.message.includes('Client error')) {
      throw error;
    }
    
    // Retry on network errors and server errors
    if (retries > 0) {
      const delay = RETRY_DELAY_BASE * Math.pow(2, MAX_RETRIES - retries) + Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetries(url, options, retries - 1);
    }
    
    throw error;
  }
};

// Health check utility for production monitoring
export const checkAPIHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/health`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    return response.ok;
  } catch {
    return false;
  }
};

export { API_URL };
