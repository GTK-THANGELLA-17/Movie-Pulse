
import { createContext, useContext, ReactNode } from "react";
import { useVoteTracking } from "@/hooks/useVoteTracking";
import { ProjectType } from "@/lib/types";

interface VotedContextType {
  hasVotedInFilm: boolean;
  hasVotedInYoutubeFilm: boolean;
  hasVotedInYoutubeContent: boolean;
  hasVotedInOtt: boolean;
  hasVotedInTelevision: boolean;
  markAsVoted: (projectType: ProjectType) => Promise<void>;
  isLoading: boolean;
}

const VotedContext = createContext<VotedContextType | undefined>(undefined);

export function VotedProvider({ children }: { children: ReactNode }) {
  const { votedStatus, isLoading, markAsVoted } = useVoteTracking();

  return (
    <VotedContext.Provider value={{
      hasVotedInFilm: votedStatus.hasVotedInFilm,
      hasVotedInYoutubeFilm: votedStatus.hasVotedInYoutubeFilm,
      hasVotedInYoutubeContent: votedStatus.hasVotedInYoutubeContent,
      hasVotedInOtt: votedStatus.hasVotedInOtt,
      hasVotedInTelevision: votedStatus.hasVotedInTelevision,
      markAsVoted,
      isLoading
    }}>
      {children}
    </VotedContext.Provider>
  );
}

export function useVoted() {
  const context = useContext(VotedContext);
  if (context === undefined) {
    throw new Error("useVoted must be used within a VotedProvider");
  }
  return context;
}
