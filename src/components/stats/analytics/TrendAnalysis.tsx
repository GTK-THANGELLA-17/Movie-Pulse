
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Activity, Calendar, Zap, Target } from "lucide-react";
import { ProcessedStats } from "@/types/stats";

interface TrendAnalysisProps {
  stats: ProcessedStats;
}

const TrendAnalysis = ({ stats }: TrendAnalysisProps) => {
  // Calculate trend metrics
  const totalOpinions = stats.total;
  const recentActivity = stats.recent;
  const growthRate = totalOpinions > 0 ? ((recentActivity / totalOpinions) * 100) : 0;

  // Analyze category trends
  const categoryTrends = Object.entries(stats.byProjectType || {})
    .map(([name, value]) => ({
      name,
      value,
      percentage: (value / totalOpinions) * 100,
      trend: value > (totalOpinions / Object.keys(stats.byProjectType || {}).length) ? 'up' : 'down'
    }))
    .sort((a, b) => b.value - a.value);

  // Geographic trends
  const geoTrends = Object.entries(stats.byCountry || {})
    .map(([name, value]) => ({
      name,
      value,
      percentage: (value / totalOpinions) * 100
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Demographic trends
  const genderTrends = Object.entries(stats.byDemographics?.gender || {})
    .map(([name, value]) => ({
      name,
      value,
      percentage: (value / totalOpinions) * 100
    }))
    .sort((a, b) => b.value - a.value);

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <TrendingUp className="w-4 h-4 text-green-500" /> : 
      <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Trend Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Activity className="w-8 h-8 text-green-600" />
                <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                  Activity
                </Badge>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-green-800 dark:text-green-200">
                  {growthRate.toFixed(1)}%
                </h3>
                <p className="text-sm text-green-600 dark:text-green-300">Recent Growth Rate</p>
                <div className="flex items-center gap-2 text-xs">
                  {growthRate > 10 ? getTrendIcon('up') : getTrendIcon('down')}
                  <span className="text-green-700 dark:text-green-300">
                    {recentActivity} recent submissions
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Target className="w-8 h-8 text-blue-600" />
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                  Diversity
                </Badge>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                  {Object.keys(stats.byCountry || {}).length}
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-300">Active Regions</p>
                <Progress 
                  value={Math.min(100, (Object.keys(stats.byCountry || {}).length / 20) * 100)} 
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100">
                  Engagement
                </Badge>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                  {((stats.userNotes?.length || 0) / totalOpinions * 100).toFixed(1)}%
                </h3>
                <p className="text-sm text-purple-600 dark:text-purple-300">Feedback Rate</p>
                <div className="text-xs text-purple-700 dark:text-purple-300">
                  {stats.userNotes?.length || 0} detailed comments
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Category Performance Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Category Performance Trends
            </CardTitle>
            <CardDescription>
              Analysis of content category performance and market share
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryTrends.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        #{index + 1}
                      </Badge>
                      {getTrendIcon(category.trend)}
                    </div>
                    <div>
                      <h4 className="font-medium">{category.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {category.value} opinions • {category.percentage.toFixed(1)}% share
                      </p>
                    </div>
                  </div>
                  <div className="text-right min-w-0 flex-1 max-w-xs">
                    <Progress value={category.percentage} className="mb-2" />
                    <div className="text-sm font-medium">
                      {category.percentage.toFixed(1)}%
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Geographic and Demographic Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                Geographic Trends
              </CardTitle>
              <CardDescription>Top performing regions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {geoTrends.map((geo, index) => (
                  <div key={geo.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        #{index + 1}
                      </Badge>
                      <span className="font-medium">{geo.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold">{geo.value}</span>
                      <span className="text-sm text-muted-foreground ml-2">
                        ({geo.percentage.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-500" />
                Demographic Insights
              </CardTitle>
              <CardDescription>Audience composition trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Gender Distribution</h4>
                  <div className="space-y-2">
                    {genderTrends.map((gender) => (
                      <div key={gender.name} className="flex justify-between items-center">
                        <span className="text-sm">{gender.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-purple-500 transition-all duration-300"
                              style={{ width: `${gender.percentage}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground w-12 text-right">
                            {gender.percentage.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default TrendAnalysis;
