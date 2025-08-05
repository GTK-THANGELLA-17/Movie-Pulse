import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useStatsData } from "@/hooks/useStatsData";
import { useLocalStatsFilters } from "@/hooks/useLocalStatsFilters";
import { ClearStatsExporter, ClearExportData } from "@/utils/statsExportClear";
import StatsContent from "@/components/stats/StatsContent";
import LocalStatsOverview from "@/components/stats/LocalStatsOverview";
import LocalStatsFilters from "@/components/stats/LocalStatsFilters";
import EnhancedStatsDisplay from "@/components/stats/analytics/EnhancedStatsDisplay";
import SmartLoader from "@/components/SmartLoader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Globe, BarChart3, MessageSquare, Brain } from "lucide-react";
import AdvancedAnalytics from "@/components/stats/analytics/AdvancedAnalytics";
import DemographicInsights from "@/components/stats/DemographicInsights";
import EnhancedUserFeedback from "@/components/stats/EnhancedUserFeedback";

interface LocalStatsDisplayProps {
  showFilters?: boolean;
  sectionType?: string;
}

const LocalStatsDisplay = ({ showFilters = true, sectionType = "local" }: LocalStatsDisplayProps) => {
  const [viewMode, setViewMode] = useState<'standard' | 'enhanced'>('enhanced');
  const [activeInsightTab, setActiveInsightTab] = useState("overview");
  const {
    filters,
    resetFilters,
    updateFilter,
    selectedCountry,
    selectedGender,
    selectedAge,
    selectedFilmIndustry,
    selectedOttPlatform,
    selectedYoutubeCategory,
    selectedProjectType,
    selectedGenre,
    selectedTvChannel,
    dateRange,
    getAppliedFiltersText
  } = useLocalStatsFilters();
  
  const { stats, isLoading, isRefreshing, handleRefresh } = useStatsData({
    sectionType,
    dataSource: 'local',
    filters
  });
  
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Handle initial load completion
  useEffect(() => {
    if (!isLoading) {
      setIsInitialLoad(false);
    }
  }, [isLoading]);

  // Handle refresh events
  useEffect(() => {
    const handleRefreshEvent = () => {
      console.log('LocalStatsDisplay: Refresh event received');
      handleRefresh();
    };

    window.addEventListener('refreshLocalStats', handleRefreshEvent);
    window.addEventListener('refreshAllStats', handleRefreshEvent);
    return () => {
      window.removeEventListener('refreshLocalStats', handleRefreshEvent);
      window.removeEventListener('refreshAllStats', handleRefreshEvent);
    };
  }, [handleRefresh]);

  const handleDownload = (format: 'excel' | 'word' | 'text') => {
    if (!stats) return;
    
    console.log(`Downloading ${sectionType} stats in ${format} format`);
    
    try {
      // Prepare clear, structured export data
      const exportData: ClearExportData = {
        opinions: (stats as any).opinions || [],
        demographicSummary: {
          ageGroups: (stats as any).demographics?.age ? Object.entries((stats as any).demographics.age).reduce((acc, [age, count]) => {
            acc[age] = {
              count,
              topGenre: stats.byGenre ? Object.entries(stats.byGenre).sort(([,a], [,b]) => (b as number) - (a as number))[0]?.[0] : 'N/A',
              topPlatform: stats.byProjectType ? Object.entries(stats.byProjectType).sort(([,a], [,b]) => (b as number) - (a as number))[0]?.[0] : 'N/A',
              categories: stats.byProjectType ? Object.keys(stats.byProjectType) : []
            };
            return acc;
          }, {} as Record<string, any>) : {},
          genderPreferences: (stats as any).demographics?.gender ? Object.entries((stats as any).demographics.gender).reduce((acc, [gender, count]) => {
            acc[gender] = {
              count,
              topCategory: stats.byProjectType ? Object.entries(stats.byProjectType).sort(([,a], [,b]) => (b as number) - (a as number))[0]?.[0] : 'N/A',
              topGenre: stats.byGenre ? Object.entries(stats.byGenre).sort(([,a], [,b]) => (b as number) - (a as number))[0]?.[0] : 'N/A',
              platforms: stats.byProjectType ? Object.keys(stats.byProjectType) : []
            };
            return acc;
          }, {} as Record<string, any>) : {},
          countryPreferences: stats.byCountry ? Object.entries(stats.byCountry).reduce((acc, [country, count]) => {
            acc[country] = {
              count,
              topGenre: stats.byGenre ? Object.entries(stats.byGenre).sort(([,a], [,b]) => (b as number) - (a as number))[0]?.[0] : 'N/A',
              topPlatform: stats.byProjectType ? Object.entries(stats.byProjectType).sort(([,a], [,b]) => (b as number) - (a as number))[0]?.[0] : 'N/A',
              contentTypes: stats.byProjectType ? Object.keys(stats.byProjectType) : []
            };
            return acc;
          }, {} as Record<string, any>) : {}
        },
        userNotes: (stats.userNotes || []).map(note => ({
          note: note.note || note.text || '',
          category: note.category || 'General',
          age: note.age,
          gender: note.gender,
          country: note.country,
          projectType: note.projectType,
          genre: note.genre,
          createdAt: note.createdAt || note.timestamp || new Date().toISOString()
        })),
        metadata: {
          generatedAt: new Date().toLocaleString(),
          totalOpinions: stats.total || 0,
          appliedFilters: getAppliedFiltersText()
        }
      };

      switch (format) {
        case 'excel':
          ClearStatsExporter.exportToExcel(exportData);
          break;
        case 'word':
          ClearStatsExporter.exportToWord(exportData);
          break;
        case 'text':
          ClearStatsExporter.exportToText(exportData);
          break;
        default:
          console.error('Unsupported download format:', format);
      }
    } catch (error) {
      console.error('Error downloading stats:', error);
    }
  };

  // Show loader during initial load or when refreshing
  if (isInitialLoad || isRefreshing) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <SmartLoader message="Loading comprehensive audience insights..." />
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
          {/* Header with Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {sectionType.charAt(0).toUpperCase() + sectionType.slice(1)} Analytics Dashboard
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
                Comprehensive insights for better decision making and audience understanding
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'standard' ? 'default' : 'outline'}
                onClick={() => setViewMode('standard')}
                size="sm"
              >
                Standard View
              </Button>
              <Button
                variant={viewMode === 'enhanced' ? 'default' : 'outline'}
                onClick={() => setViewMode('enhanced')}
                size="sm"
              >
                <BarChart3 className="w-4 h-4 mr-1" />
                Enhanced View
              </Button>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

          {/* Main Content */}
          {viewMode === 'enhanced' && stats ? (
            <EnhancedStatsDisplay stats={stats} sectionType={sectionType} />
          ) : (
            <Tabs value={activeInsightTab} onValueChange={setActiveInsightTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-6 bg-white dark:bg-gray-800 p-1 rounded-xl shadow-lg">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-xs sm:text-sm font-medium"
                >
                  📊 Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="demographics" 
                  className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white text-xs sm:text-sm font-medium"
                >
                  👥 Demographics
                </TabsTrigger>
                <TabsTrigger 
                  value="feedback" 
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-white text-xs sm:text-sm font-medium"
                >
                  💬 Feedback
                </TabsTrigger>
                <TabsTrigger 
                  value="analytics" 
                  className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-xs sm:text-sm font-medium"
                >
                  📈 Analytics
                </TabsTrigger>
                <TabsTrigger 
                  value="insights" 
                  className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-xs sm:text-sm font-medium"
                >
                  💡 Insights
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {showFilters && (
                  <div className="mb-6">
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
                      title="Enhanced Statistics Filters"
                      description="Apply filters to analyze specific audience segments"
                      showSectionSpecific={true}
                      activeSection={sectionType}
                    />
                  </div>
                )}
                <LocalStatsOverview 
                  stats={stats} 
                  onDownload={handleDownload} 
                  sectionType={sectionType}
                />
              </TabsContent>

              <TabsContent value="demographics" className="space-y-6">
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                  {stats ? (
                    <DemographicInsights stats={stats} />
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">👥</div>
                      <p className="text-xl text-gray-500 dark:text-gray-400 mb-2">No Demographic Data Available</p>
                      <p className="text-gray-400 dark:text-gray-500">Start collecting audience feedback to see demographic insights</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="feedback" className="space-y-6">
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                  {stats ? (
                    <EnhancedUserFeedback userNotes={stats?.userNotes || []} stats={stats} />
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">💬</div>
                      <p className="text-xl text-gray-500 dark:text-gray-400 mb-2">No User Feedback Available</p>
                      <p className="text-gray-400 dark:text-gray-500">Encourage your audience to share their thoughts and suggestions</p>
                    </div>
                  )}
                </div>
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
                            <p className="font-medium">Most Popular Genres</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              Focus on {Object.entries(stats?.byGenre || {})
                                .sort(([,a], [,b]) => (b as number) - (a as number))
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
                                .sort(([,a], [,b]) => (b as number) - (a as number))
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
                              Your community loves {Object.entries(stats?.byProjectType || {})
                                .sort(([,a], [,b]) => (b as number) - (a as number))
                                .slice(0, 1)
                                .map(([type]) => type)
                                .join('')} content the most
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
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default LocalStatsDisplay;
