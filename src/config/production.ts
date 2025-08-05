
// Production configuration for MoviePulse
export const PRODUCTION_CONFIG = {
  // API Configuration
  API: {
    BASE_URL: 'https://moviepulse-api-snfl.onrender.com/api',
    TIMEOUT: 30000,
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000,
  },
  
  // Performance settings
  PERFORMANCE: {
    LAZY_LOAD_DELAY: 100,
    SCROLL_DEBOUNCE: 16,
    CHART_ANIMATION_DURATION: 300,
    LOADING_DELAY: 500,
  },
  
  // SEO and Meta
  SEO: {
    TITLE: 'MoviePulse - Your Voice Shapes Entertainment',
    DESCRIPTION: 'Share opinions on movies, TV shows, music, and more. Help shape the future of entertainment with your valuable feedback.',
    KEYWORDS: 'movie opinions, tv shows, music feedback, entertainment reviews, audience insights',
    OG_IMAGE: '/og-image.png',
  },
  
  // Error handling
  ERROR_HANDLING: {
    SHOW_DETAILED_ERRORS: false,
    LOG_ERRORS_TO_CONSOLE: false,
    FALLBACK_ERROR_MESSAGE: 'Something went wrong. Please try again.',
  },
  
  // Features
  FEATURES: {
    ANALYTICS_ENABLED: true,
    OFFLINE_SUPPORT: false,
    PWA_ENABLED: false,
  },
  
  // Limits
  LIMITS: {
    MAX_NOTE_LENGTH: 500,
    MAX_VOTES_PER_SESSION: 50,
    SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours
  }
};

// Environment-specific overrides
export const getConfig = () => {
  const isDev = !import.meta.env.PROD;
  
  if (isDev) {
    return {
      ...PRODUCTION_CONFIG,
      ERROR_HANDLING: {
        ...PRODUCTION_CONFIG.ERROR_HANDLING,
        SHOW_DETAILED_ERRORS: true,
        LOG_ERRORS_TO_CONSOLE: true,
      }
    };
  }
  
  return PRODUCTION_CONFIG;
};
