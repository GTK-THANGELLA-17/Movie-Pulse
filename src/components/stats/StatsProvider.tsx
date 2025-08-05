
import { createContext, useContext, ReactNode } from 'react';
import { Country, FilmIndustry, OTTPlatform, YouTubeContentCategory } from "@/lib/types";

interface StatsFilters {
  selectedCountry: Country | "all";
  selectedGender: string;
  selectedAge: string;
  selectedFilmIndustry: FilmIndustry | "all";
  selectedOttPlatform: OTTPlatform | "all";
  selectedYoutubeCategory: YouTubeContentCategory | "all";
  selectedProjectType: string;
  selectedTvChannel: string;
  dateRange: string;
}

interface StatsContextType {
  filters: StatsFilters;
  setFilters: (filters: Partial<StatsFilters>) => void;
  stats: any;
  isLoading: boolean;
  isRefreshing: boolean;
  activeSection: string;
  dataSource: string;
  showFilters: boolean;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export const useStatsContext = () => {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error('useStatsContext must be used within a StatsProvider');
  }
  return context;
};

interface StatsProviderProps {
  children: ReactNode;
  value: StatsContextType;
}

export const StatsProvider = ({ children, value }: StatsProviderProps) => {
  return (
    <StatsContext.Provider value={value}>
      {children}
    </StatsContext.Provider>
  );
};
