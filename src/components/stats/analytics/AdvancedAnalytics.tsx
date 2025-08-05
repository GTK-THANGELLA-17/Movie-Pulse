
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, BarChart3, Users, Globe, Star, Calendar, Target, Zap, Eye } from "lucide-react";
import { ProcessedStats } from "@/types/stats";
import DataVisualization from "./DataVisualization";
import TrendAnalysis from "./TrendAnalysis";
import AudienceInsights from "./AudienceInsights";
import PredictiveAnalytics from "./PredictiveAnalytics";

interface AdvancedAnalyticsProps {
  stats: ProcessedStats;
  onDownload: (format: 'excel' | 'word' | 'text') => void;
}

const AdvancedAnalytics = ({ stats, onDownload }: AdvancedAnalyticsProps) => {
  // Calculate key metrics
  const totalOpinions = stats.total;
  const recentActivity = stats.recent;
  const growthRate = totalOpinions > 0 ? ((recentActivity / totalOpinions) * 100) : 0;
  const diversityScore = Object.keys(stats.byCountry || {}).length;
  const engagementScore = stats.userNotes?.length || 0;

  // Calculate top performing categories
  const topCategories = Object.entries(stats.byProjectType || {})
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  // Calculate demographic insights
  const topDemographic = Object.entries(stats.byDemographics?.gender || {})
    .sort(([,a], [,b]) => b - a)[0];

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'growth': return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'diversity': return <Globe className="w-5 h-5 text-blue-500" />;
      case 'engagement': return <Users className="w-5 h-5 text-purple-500" />;
      case 'quality': return <Star className="w-5 h-5 text-yellow-500" />;
      default: return <BarChart3 className="w-5 h-5 text-gray-500" />;
    }
  };

  const getGrowthIndicator = (value: number) => {
    if (value > 15) return { color: 'text-green-600', icon: <TrendingUp className="w-4 h-4" />, label: 'High Growth' };
    if (value > 5) return { color: 'text-blue-600', icon: <TrendingUp className="w-4 h-4" />, label: 'Growing' };
    return { color: 'text-gray-600', icon: <TrendingDown className="w-4 h-4" />, label: 'Stable' };
  };

  const growthIndicator = getGrowthIndicator(growthRate);

  return (
    <div className="space-y-8">
      {/* Advanced Metrics Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* Growth Rate */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              {getMetricIcon('growth')}
              <Badge className={`${growthIndicator.color} bg-transparent border-current`}>
                {growthIndicator.label}
              </Badge>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-green-800 dark:text-green-200">
                {growthRate.toFixed(1)}%
              </h3>
              <p className="text-sm text-green-600 dark:text-green-300">Activity Growth Rate</p>
              <div className="flex items-center gap-2 text-xs text-green-700 dark:text-green-300">
                {growthIndicator.icon}
                <span>{recentActivity} recent opinions</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Geographic Diversity */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              {getMetricIcon('diversity')}
              <Badge variant="outline" className="text-blue-700 border-blue-300">
                Global Reach
              </Badge>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                {diversityScore}
              </h3>
              <p className="text-sm text-blue-600 dark:text-blue-300">Active Countries</p>
              <Progress value={(diversityScore / 50) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Engagement Score */}
        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              {getMetricIcon('engagement')}
              <Badge variant="outline" className="text-purple-700 border-purple-300">
                Feedback
              </Badge>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                {engagementScore}
              </h3>
              <p className="text-sm text-purple-600 dark:text-purple-300">User Comments</p>
              <div className="text-xs text-purple-700 dark:text-purple-300">
                {((engagementScore / totalOpinions) * 100).toFixed(1)}% engagement rate
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quality Score */}
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              {getMetricIcon('quality')}
              <Badge variant="outline" className="text-orange-700 border-orange-300">
                Quality
              </Badge>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-orange-800 dark:text-orange-200">
                {totalOpinions > 0 ? Math.min(95, 60 + (diversityScore * 2) + (growthRate * 0.5)).toFixed(0) : 0}
              </h3>
              <p className="text-sm text-orange-600 dark:text-orange-300">Data Quality Score</p>
              <div className="flex items-center gap-1 text-xs text-orange-700 dark:text-orange-300">
                <Star className="w-3 h-3 fill-current" />
                <span>High reliability</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Advanced Analytics Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs defaultValue="visualization" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            <TabsTrigger 
              value="visualization" 
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Data Viz</span>
            </TabsTrigger>
            <TabsTrigger 
              value="trends" 
              className="data-[state=active]:bg-green-500 data-[state=active]:text-white flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Trends</span>
            </TabsTrigger>
            <TabsTrigger 
              value="audience" 
              className="data-[state=active]:bg-purple-500 data-[state=active]:text-white flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Audience</span>
            </TabsTrigger>
            <TabsTrigger 
              value="predictive" 
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white flex items-center gap-2"
            >
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Insights</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="visualization" className="space-y-6">
            <DataVisualization stats={stats} onDownload={onDownload} />
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <TrendAnalysis stats={stats} />
          </TabsContent>

          <TabsContent value="audience" className="space-y-6">
            <AudienceInsights stats={stats} />
          </TabsContent>

          <TabsContent value="predictive" className="space-y-6">
            <PredictiveAnalytics stats={stats} />
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Quick Action Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-800 dark:text-indigo-200">
              <Zap className="w-5 h-5" />
              Top Performer
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topCategories[0] && (
              <div className="space-y-2">
                <div className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">
                  {topCategories[0][0]}
                </div>
                <div className="text-sm text-indigo-600 dark:text-indigo-300">
                  {topCategories[0][1]} opinions ({((topCategories[0][1] / totalOpinions) * 100).toFixed(1)}%)
                </div>
                <Progress value={(topCategories[0][1] / totalOpinions) * 100} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
              <Eye className="w-5 h-5" />
              Audience Focus
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topDemographic && (
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {topDemographic[0]}
                </div>
                <div className="text-sm text-green-600 dark:text-green-300">
                  Primary demographic ({((topDemographic[1] / totalOpinions) * 100).toFixed(1)}%)
                </div>
                <Progress value={(topDemographic[1] / totalOpinions) * 100} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
              <Calendar className="w-5 h-5" />
              Activity Pulse
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                {recentActivity}
              </div>
              <div className="text-sm text-orange-600 dark:text-orange-300">
                Recent submissions (7 days)
              </div>
              <div className="flex items-center gap-2">
                {growthIndicator.icon}
                <span className="text-xs text-orange-700 dark:text-orange-300">
                  {growthRate.toFixed(1)}% growth rate
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdvancedAnalytics;
