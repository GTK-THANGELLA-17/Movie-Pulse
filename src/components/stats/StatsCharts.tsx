
import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { processSectionChartData, getSectionSpecificCharts } from "@/utils/chartDataProcessor";
import { ProcessedStats } from "@/types/stats";
import ChartRenderer from "./charts/ChartRenderer";
import ChartControls from "./charts/ChartControls";

interface StatsChartsProps {
  stats: ProcessedStats;
  sectionType?: string;
}

const StatsCharts: React.FC<StatsChartsProps> = ({
  stats,
  sectionType = "local"
}) => {
  const [chartType, setChartType] = useState<string>('bar');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Process chart data based on section
  const chartData = useMemo(() => {
    return processSectionChartData(stats, sectionType);
  }, [stats, sectionType]);

  // Get section-specific charts
  const allCharts = useMemo(() => {
    return getSectionSpecificCharts(sectionType, chartData);
  }, [sectionType, chartData]);

  // Get unique categories for filtering
  const categories = useMemo(() => {
    return [...new Set(allCharts.map(chart => chart.category))];
  }, [allCharts]);

  // Filter charts based on selected category
  const filteredCharts = useMemo(() => {
    return selectedCategory === 'all' 
      ? allCharts 
      : allCharts.filter(chart => chart.category === selectedCategory);
  }, [selectedCategory, allCharts]);

  if (allCharts.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-lg sm:text-xl">Statistics Charts</CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="text-center py-6 sm:py-8">
            <p className="text-muted-foreground text-sm sm:text-base">No data available for charts in this section.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-lg sm:text-xl">Statistics Charts</CardTitle>
        <ChartControls
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          chartType={chartType}
          onChartTypeChange={setChartType}
        />
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        {filteredCharts.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No data available for the selected category.</p>
          </div>
        ) : (
          <Tabs defaultValue={filteredCharts[0]?.key} className="w-full">
            <div className="overflow-x-auto">
              <TabsList className="grid w-full min-w-fit" style={{ gridTemplateColumns: `repeat(${Math.min(filteredCharts.length, 4)}, minmax(0, 1fr))` }}>
                {filteredCharts.slice(0, 4).map((chart) => (
                  <TabsTrigger key={chart.key} value={chart.key} className="text-xs sm:text-sm px-2 sm:px-3">
                    <span className="truncate">{chart.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {filteredCharts.length > 4 && (
              <div className="mt-2 overflow-x-auto">
                <TabsList className="grid w-full min-w-fit" style={{ gridTemplateColumns: `repeat(${filteredCharts.length - 4}, minmax(0, 1fr))` }}>
                  {filteredCharts.slice(4).map((chart) => (
                    <TabsTrigger key={chart.key} value={chart.key} className="text-xs sm:text-sm px-2 sm:px-3">
                      <span className="truncate">{chart.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            )}
            {filteredCharts.map((chart) => (
              <TabsContent key={chart.key} value={chart.key} className="mt-4">
                <div className="mb-2">
                  <h4 className="font-semibold text-sm sm:text-base break-words">{chart.label}</h4>
                  <p className="text-xs text-muted-foreground">Category: {chart.category}</p>
                </div>
                <div className="w-full overflow-hidden">
                  <ChartRenderer 
                    data={chart.data} 
                    chartType={chartType} 
                    label={chart.label}
                  />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCharts;
