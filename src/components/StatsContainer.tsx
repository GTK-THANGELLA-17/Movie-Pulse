
import SectionStatsDisplay from "@/components/stats/SectionStatsDisplay";

interface StatsContainerProps {
  activeSection: string;
  dataSource: "local" | "server";
  showFilters?: boolean;
}

const StatsContainer = ({ activeSection, dataSource, showFilters = true }: StatsContainerProps) => {
  return (
    <SectionStatsDisplay 
      sectionType={activeSection}
      dataSource={dataSource}
      showFilters={showFilters}
    />
  );
};

export default StatsContainer;
