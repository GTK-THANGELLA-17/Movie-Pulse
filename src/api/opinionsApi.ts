
// Enhanced API exports with v2 support
export type { OpinionData, EnhancedAnalyticsData } from './types/opinionTypes';

// V2 Enhanced services (recommended)
export { 
  submitEnhancedOpinion as submitOpinion, 
  checkEnhancedVoteStatus as checkVoteStatus,
  getEnhancedStatistics 
} from './services/enhancedOpinionService';

// Legacy services (backward compatibility)
export { 
  submitOpinion as submitLegacyOpinion, 
  checkVoteStatus as checkLegacyVoteStatus, 
  getOpinionsByCategory 
} from './services/opinionService';

// Analytics and sync services
export { getAnalytics, getVotingStatistics, getRealTimeStats } from './services/analyticsService';
export { syncLocalOpinions, syncVoteStatus, checkServerHealth } from './services/syncService';
