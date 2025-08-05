
import React, { createContext, useContext, ReactNode } from 'react';
import { useVoteTracking, VotedStatus } from '@/hooks/useVoteTracking';
import { ProjectType } from '@/lib/types';

interface VotedContextType extends VotedStatus {
  isLoading: boolean;
  markAsVoted: (projectType: ProjectType) => Promise<void>;
  hasVotedInCategory: (projectType: ProjectType) => boolean;
  currentPeriodId: string;
}

const VotedContext = createContext<VotedContextType | undefined>(undefined);

export function VotedProvider({ children }: { children: ReactNode }) {
  const voteTracking = useVoteTracking();

  // Spread the votedStatus properties to match the interface
  const contextValue: VotedContextType = {
    ...voteTracking.votedStatus,
    isLoading: voteTracking.isLoading,
    markAsVoted: voteTracking.markAsVoted,
    hasVotedInCategory: voteTracking.hasVotedInCategory,
    currentPeriodId: voteTracking.currentPeriodId,
  };

  return (
    <VotedContext.Provider value={contextValue}>
      {children}
    </VotedContext.Provider>
  );
}

export function useVoted() {
  const context = useContext(VotedContext);
  if (context === undefined) {
    throw new Error('useVoted must be used within a VotedProvider');
  }
  return context;
}
