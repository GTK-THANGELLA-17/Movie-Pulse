
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Heart, MessageCircle, Globe, Star, Target, Eye, Lightbulb } from "lucide-react";
import { ProcessedStats } from "@/types/stats";

interface AudienceInsightsProps {
  stats: ProcessedStats;
}

const AudienceInsights = ({ stats }: AudienceInsightsProps) => {
  const totalOpinions = stats.total;
  const engagementRate = ((stats.userNotes?.length || 0) / totalOpinions) * 100;

  // Audience segmentation
  const genderSegments = Object.entries(stats.byDemographics?.gender || {})
    .map(([name, value]) => ({
      name,
      value,
      percentage: (value / totalOpinions) * 100
    }))
    .sort((a, b) => b.value - a.value);

  const ageSegments = Object.entries(stats.byDemographics?.age || {})
    .map(([name, value]) => ({
      name,
      value,
      percentage: (value / totalOpinions) * 100
    }))
    .sort((a, b) => b.value - a.value);

  // Content preferences
  const contentPreferences = Object.entries(stats.byProjectType || {})
    .map(([name, value]) => ({
      name,
      value,
      percentage: (value / totalOpinions) * 100
    }))
    .sort((a, b) => b.value - a.value);

  // Geographic insights
  const topMarkets = Object.entries(stats.byCountry || {})
    .map(([name, value]) => ({
      name,
      value,
      percentage: (value / totalOpinions) * 100
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  const getInsightLevel = (percentage: number) => {
    if (percentage > 30) return { color: 'text-green-600', label: 'High Interest', bg: 'bg-green-100 dark:bg-green-900/20' };
    if (percentage > 15) return { color: 'text-blue-600', label: 'Moderate Interest', bg: 'bg-blue-100 dark:bg-blue-900/20' };
    return { color: 'text-gray-600', label: 'Low Interest', bg: 'bg-gray-100 dark:bg-gray-900/20' };
  };

  return (
    <div className="space-y-8">
      {/* Audience Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-blue-600" />
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                  Total Reach
                </Badge>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                  {totalOpinions.toLocaleString()}
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-300">Active Participants</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200 dark:border-purple-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100">
                  Engagement
                </Badge>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                  {engagementRate.toFixed(1)}%
                </h3>
                <p className="text-sm text-purple-600 dark:text-purple-300">Feedback Rate</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Globe className="w-8 h-8 text-green-600" />
                <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                  Global
                </Badge>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-green-800 dark:text-green-200">
                  {Object.keys(stats.byCountry || {}).length}
                </h3>
                <p className="text-sm text-green-600 dark:text-green-300">Countries</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <MessageCircle className="w-8 h-8 text-orange-600" />
                <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100">
                  Feedback
                </Badge>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-orange-800 dark:text-orange-200">
                  {stats.userNotes?.length || 0}
                </h3>
                <p className="text-sm text-orange-600 dark:text-orange-300">Comments</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Demographic Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                Audience Demographics
              </CardTitle>
              <CardDescription>
                Understanding your audience composition
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Gender Distribution */}
              <div>
                <h4 className="font-medium mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Gender Breakdown
                </h4>
                <div className="space-y-3">
                  {genderSegments.map((segment) => (
                    <div key={segment.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{segment.name}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {segment.percentage.toFixed(1)}%
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {segment.value}
                          </span>
                        </div>
                      </div>
                      <Progress value={segment.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Age Groups */}
              <div>
                <h4 className="font-medium mb-4 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Age Groups
                </h4>
                <div className="space-y-3">
                  {ageSegments.map((segment) => (
                    <div key={segment.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{segment.name}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {segment.percentage.toFixed(1)}%
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {segment.value}
                          </span>
                        </div>
                      </div>
                      <Progress value={segment.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-purple-500" />
                Content Preferences
              </CardTitle>
              <CardDescription>
                What your audience loves most
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contentPreferences.map((pref, index) => {
                  const insight = getInsightLevel(pref.percentage);
                  return (
                    <motion.div
                      key={pref.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className={`p-4 rounded-lg ${insight.bg}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            #{index + 1}
                          </Badge>
                          <h4 className="font-medium">{pref.name}</h4>
                        </div>
                        <Badge className={insight.color}>
                          {insight.label}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <Progress value={pref.percentage} className="flex-1 mr-4" />
                        <div className="text-right">
                          <div className="font-bold">{pref.value}</div>
                          <div className="text-xs text-muted-foreground">
                            {pref.percentage.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Geographic Market Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-500" />
              Geographic Market Analysis
            </CardTitle>
            <CardDescription>
              Top performing markets and regional insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {topMarkets.map((market, index) => (
                <motion.div
                  key={market.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="text-xs">
                      #{index + 1}
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      {market.percentage.toFixed(1)}%
                    </div>
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{market.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">
                      {market.value}
                    </span>
                    <Progress value={market.percentage} className="w-16 h-2" />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Audience Insights Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-800 dark:text-indigo-200">
              <Lightbulb className="w-5 h-5" />
              Key Audience Insights
            </CardTitle>
            <CardDescription className="text-indigo-600 dark:text-indigo-300">
              Strategic recommendations based on audience data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-indigo-800 dark:text-indigo-200">Primary Audience</h4>
                <div className="space-y-2">
                  {genderSegments[0] && (
                    <div className="flex items-center gap-2">
                      <Badge className="bg-indigo-100 text-indigo-800">Gender</Badge>
                      <span>{genderSegments[0].name} ({genderSegments[0].percentage.toFixed(1)}%)</span>
                    </div>
                  )}
                  {ageSegments[0] && (
                    <div className="flex items-center gap-2">
                      <Badge className="bg-indigo-100 text-indigo-800">Age</Badge>
                      <span>{ageSegments[0].name} ({ageSegments[0].percentage.toFixed(1)}%)</span>
                    </div>
                  )}
                  {topMarkets[0] && (
                    <div className="flex items-center gap-2">
                      <Badge className="bg-indigo-100 text-indigo-800">Region</Badge>
                      <span>{topMarkets[0].name} ({topMarkets[0].percentage.toFixed(1)}%)</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-indigo-800 dark:text-indigo-200">Content Strategy</h4>
                <div className="space-y-2">
                  {contentPreferences[0] && (
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-100 text-purple-800">Top Content</Badge>
                      <span>{contentPreferences[0].name}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Badge className="bg-purple-100 text-purple-800">Engagement</Badge>
                    <span>{engagementRate.toFixed(1)}% feedback rate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-purple-100 text-purple-800">Reach</Badge>
                    <span>{Object.keys(stats.byCountry || {}).length} countries active</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AudienceInsights;
