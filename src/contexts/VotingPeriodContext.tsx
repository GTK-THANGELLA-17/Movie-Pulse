
import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";
import { VotingPeriod } from "@/lib/types";
import { getVotingPeriod, saveVotingPeriod, DEFAULT_VOTING_PERIOD } from "@/lib/data";

interface VotingPeriodContextType {
  votingPeriod: VotingPeriod;
  updateVotingPeriod: (period: VotingPeriod) => void;
  toggleVotingStatus: () => void;
  isVotingActive: boolean;
  remainingDays: number;
}

const VotingPeriodContext = createContext<VotingPeriodContextType | undefined>(undefined);

export function VotingPeriodProvider({ children }: { children: ReactNode }) {
  const [votingPeriod, setVotingPeriod] = useState<VotingPeriod>(DEFAULT_VOTING_PERIOD);

  useEffect(() => {
    const storedPeriod = getVotingPeriod();
    if (storedPeriod) {
      setVotingPeriod(storedPeriod);
    }
    
    // Add browser fingerprinting capability
    const generateBrowserFingerprint = () => {
      const fingerprint = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        colorDepth: window.screen.colorDepth
      };
      
      // Create a unique identifier
      const fingerprintString = JSON.stringify(fingerprint);
      const hash = Array.from(fingerprintString).reduce(
        (hash, char) => ((hash << 5) - hash) + char.charCodeAt(0), 0
      );
      
      return Math.abs(hash).toString(36);
    };
    
    // Set browser fingerprint in local storage if not already present
    if (!localStorage.getItem('moviepulse-browser-fingerprint')) {
      localStorage.setItem('moviepulse-browser-fingerprint', generateBrowserFingerprint());
    }
  }, []);

  const updateVotingPeriod = (period: VotingPeriod) => {
    const updatedPeriod = saveVotingPeriod(period);
    setVotingPeriod(updatedPeriod);
  };

  const toggleVotingStatus = () => {
    const updatedPeriod = {
      ...votingPeriod,
      isActive: !votingPeriod.isActive
    };
    updateVotingPeriod(updatedPeriod);
  };

  // Calculate if voting is active and remaining days
  const isVotingActive = useMemo(() => {
    if (!votingPeriod.isActive) return false;
    
    const currentDate = new Date();
    const endDate = new Date(votingPeriod.endDate);
    
    return currentDate <= endDate;
  }, [votingPeriod.isActive, votingPeriod.endDate]);

  const remainingDays = useMemo(() => {
    const currentDate = new Date();
    const endDate = new Date(votingPeriod.endDate);
    
    // If voting is not active or end date has passed, return 0
    if (!isVotingActive) return 0;
    
    const diffTime = Math.abs(endDate.getTime() - currentDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  }, [votingPeriod.endDate, isVotingActive]);

  return (
    <VotingPeriodContext.Provider value={{ 
      votingPeriod, 
      updateVotingPeriod, 
      toggleVotingStatus,
      isVotingActive,
      remainingDays
    }}>
      {children}
    </VotingPeriodContext.Provider>
  );
}

export function useVotingPeriod() {
  const context = useContext(VotingPeriodContext);
  if (context === undefined) {
    throw new Error("useVotingPeriod must be used within a VotingPeriodProvider");
  }
  return context;
}
