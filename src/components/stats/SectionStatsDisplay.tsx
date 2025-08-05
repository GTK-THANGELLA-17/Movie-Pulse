
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useStatsData } from "@/hooks/useStatsData";
import { useLocalStatsFilters } from "@/hooks/useLocalStatsFilters";
import { exportSectionToExcel, exportSectionToWord, exportSectionToText } from "@/utils/statsExportUtils";
import SmartLoader from "@/components/SmartLoader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Globe, BarChart3 } from "lucide-react";
import AdvancedAnalytics from "@/components/stats/analytics/AdvancedAnalytics";
import LocalStatsOverview from "@/components/stats/LocalStatsOverview";
import LocalStatsFilters from "@/components/stats/LocalStatsFilters";

interface SectionStatsDisplayProps {
  sectionType: string;
  dataSource: "local" | "server";
  showFilters?: boolean;
}

const SectionStatsDisplay = ({ sectionType, dataSource, showFilters = true }: SectionStatsDisplayProps) => {
  const {
    filters,
    resetFilters,
    updateFilter,
    getAppliedFiltersText,
    selectedCountry,
    selectedGender,
    selectedAge,
    selectedFilmIndustry,
    selectedOttPlatform,
    selectedYoutubeCategory,
    selectedProjectType,
    selectedGenre,
    selectedTvChannel,
    dateRange
  } = useLocalStatsFilters();
  
  const { stats, isLoading, isRefreshing, handleRefresh } = useStatsData({
    sectionType,
    dataSource,
    filters
  });
  
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [activeInsightTab, setActiveInsightTab] = useState("overview");

  // Handle initial load completion
  useEffect(() => {
    if (!isLoading) {
      setIsInitialLoad(false);
    }
  }, [isLoading]);

  // Handle refresh events
  useEffect(() => {
    const handleRefreshEvent = () => {
      console.log('SectionStatsDisplay: Refresh event received');
      handleRefresh();
    };

    window.addEventListener('refreshAllStats', handleRefreshEvent);
    return () => {
      window.removeEventListener('refreshAllStats', handleRefreshEvent);
    };
  }, [handleRefresh]);

  const handleDownload = (format: 'excel' | 'word' | 'text') => {
    if (!stats) return;
    
    console.log(`Downloading ${sectionType} stats in ${format} format`);
    const sectionName = `${sectionType.charAt(0).toUpperCase() + sectionType.slice(1)}_Statistics`;

    try {
      switch (format) {
        case 'excel':
          exportSectionToExcel(stats, sectionName, sectionType);
          break;
        case 'word':
          exportSectionToWord(stats, sectionName, sectionType);
          break;
        case 'text':
          exportSectionToText(stats, sectionName, sectionType);
          break;
        default:
          console.error('Unsupported download format:', format);
      }
    } catch (error) {
      console.error('Error downloading stats:', error);
    }
  };

  // Get section display name
  const getSectionDisplayName = (section: string) => {
    const names: Record<string, string> = {
      films: "Films",
      "youtube-films": "YouTube Films",
      "youtube-content": "YouTube Content",
      "instagram-content": "Instagram Content",
      ott: "OTT Platforms",
      television: "Television",
      music: "Music"
    };
    return names[section] || section;
  };

  // Show loader during initial load or when refreshing
  if (isInitialLoad || isRefreshing) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <SmartLoader message={`Loading ${getSectionDisplayName(sectionType)} insights...`} />
      </div>
    );
  }

  // Calculate key metrics for the overview
  const totalOpinions = stats?.total || 0;
  const recentActivity = stats?.recent || 0;
  const countriesCount = Object.keys(stats?.byCountry || {}).length;
  const projectTypesCount = Object.keys(stats?.byProjectType || {}).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Hero Section */}
          <div className="text-center space-y-4 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-full"
            >
              <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Live Audience Intelligence
              </span>
            </motion.div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {getSectionDisplayName(sectionType)} Dashboard
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive insights from {getSectionDisplayName(sectionType).toLowerCase()} feedback. 
              Understand what your audience wants before stories are made.
            </p>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-blue-800 dark:text-blue-200">
                      {totalOpinions.toLocaleString()}
                    </div>
                    <div className="text-sm text-blue-600 dark:text-blue-300">
                      Total Opinions
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-green-800 dark:text-green-200">
                      {recentActivity.toLocaleString()}
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-300">
                      Recent Activity
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200 dark:border-purple-800">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Globe className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-purple-800 dark:text-purple-200">
                      {countriesCount}
                    </div>
                    <div className="text-sm text-purple-600 dark:text-purple-300">
                      Countries
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <BarChart3 className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-orange-800 dark:text-orange-200">
                      {projectTypesCount}
                    </div>
                    <div className="text-sm text-orange-600 dark:text-orange-300">
                      Categories
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <LocalStatsFilters 
              selectedCountry={selectedCountry}
              setSelectedCountry={(value) => updateFilter('selectedCountry', value)}
              selectedGender={selectedGender}
              setSelectedGender={(value) => updateFilter('selectedGender', value)}
              selectedAge={selectedAge}
              setSelectedAge={(value) => updateFilter('selectedAge', value)}
              selectedFilmIndustry={selectedFilmIndustry}
              setSelectedFilmIndustry={(value) => updateFilter('selectedFilmIndustry', value)}
              selectedOttPlatform={selectedOttPlatform}
              setSelectedOttPlatform={(value) => updateFilter('selectedOttPlatform', value)}
              selectedYoutubeCategory={selectedYoutubeCategory}
              setSelectedYoutubeCategory={(value) => updateFilter('selectedYoutubeCategory', value)}
              selectedProjectType={selectedProjectType}
              setSelectedProjectType={(value) => updateFilter('selectedProjectType', value)}
              selectedGenre={selectedGenre}
              setSelectedGenre={(value) => updateFilter('selectedGenre', value)}
              selectedTvChannel={selectedTvChannel}
              setSelectedTvChannel={(value) => updateFilter('selectedTvChannel', value)}
              dateRange={dateRange}
              setDateRange={(value) => updateFilter('dateRange', value)}
              stats={stats}
              isRefreshing={isRefreshing}
              onRefresh={handleRefresh}
              onDownload={handleDownload}
              getAppliedFilters={getAppliedFiltersText}
              title={`${getSectionDisplayName(sectionType)} Filters`}
              description={`Filter and analyze ${getSectionDisplayName(sectionType).toLowerCase()} data`}
              showSectionSpecific={true}
              activeSection={sectionType}
            />
          )}

          {/* Main Content Tabs */}
          <Tabs value={activeInsightTab} onValueChange={setActiveInsightTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-white dark:bg-gray-800 p-1 rounded-xl shadow-lg">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-sm sm:text-base font-medium"
              >
                📊 Overview
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-sm sm:text-base font-medium"
              >
                📈 Analytics
              </TabsTrigger>
              <TabsTrigger 
                value="insights" 
                className="data-[state=active]:bg-green-500 data-[state=active]:text-white text-sm sm:text-base font-medium"
              >
                💡 Insights
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <LocalStatsOverview stats={stats} onDownload={handleDownload} sectionType={sectionType} />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                {stats ? (
                  <AdvancedAnalytics stats={stats} onDownload={handleDownload} />
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📊</div>
                    <p className="text-xl text-gray-500 dark:text-gray-400 mb-2">No Data Available</p>
                    <p className="text-gray-400 dark:text-gray-500">Start collecting audience feedback to see advanced analytics</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      🎯 For Creators
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-blue-500 text-white">Trending</Badge>
                        <div>
                          <p className="font-medium">Most Popular Content</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Focus on {Object.entries(stats?.byGenre || {})
                              .sort(([,a], [,b]) => b - a)
                              .slice(0, 2)
                              .map(([genre]) => genre)
                              .join(' and ')} for maximum audience appeal
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Badge className="bg-green-500 text-white">Growth</Badge>
                        <div>
                          <p className="font-medium">Emerging Markets</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Consider expanding to {Object.entries(stats?.byCountry || {})
                              .sort(([,a], [,b]) => b - a)
                              .slice(1, 3)
                              .map(([country]) => country)
                              .join(' and ')} markets
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      👥 For Audiences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Badge className="bg-purple-500 text-white">Popular</Badge>
                        <div>
                          <p className="font-medium">Community Favorites</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Your community loves {getSectionDisplayName(sectionType).toLowerCase()} content
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Badge className="bg-pink-500 text-white">Diverse</Badge>
                        <div>
                          <p className="font-medium">Global Reach</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Feedback from {countriesCount} countries shows diverse global appeal
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionStatsDisplay;
