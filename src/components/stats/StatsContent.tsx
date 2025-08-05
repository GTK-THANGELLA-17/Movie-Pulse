
import { motion } from "framer-motion";
import { useMemo } from "react";
import SummaryCards from "@/components/stats/SummaryCards";
import DemographicStats from "@/components/stats/DemographicStats";
import StatsCharts from "@/components/stats/StatsCharts";
import RegionalDistribution from "@/components/stats/RegionalDistribution";
import UserNotesSection from "@/components/stats/UserNotesSection";
import { prepareCountryData, prepareRegionData } from "./utils/dataPreparation";

interface StatsContentProps {
  stats: any;
  showFilters?: boolean;
  sectionType?: string;
  onDownload?: (format: 'excel' | 'word' | 'text') => void;
}

const StatsContent = ({ stats, showFilters = true, sectionType = "local", onDownload }: StatsContentProps) => {
  console.log('StatsContent: Rendering stats for section:', sectionType, 'with data:', stats);

  // Memoize region data preparation
  const regionData = useMemo(() => {
    if (!stats) return [];
    return prepareRegionData(stats);
  }, [stats]);

  const userNotes = useMemo(() => {
    return stats?.userNotes || [];
  }, [stats]);

  // Show loading state if no data
  if (!stats) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading statistics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <SummaryCards stats={stats} onDownload={onDownload} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <DemographicStats demographics={stats.byDemographics} />
      </motion.div>

      <RegionalDistribution regionData={regionData} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <StatsCharts 
          stats={stats}
          sectionType={sectionType}
        />
      </motion.div>

      <UserNotesSection userNotes={userNotes} />
    </div>
  );
};

export default StatsContent;
