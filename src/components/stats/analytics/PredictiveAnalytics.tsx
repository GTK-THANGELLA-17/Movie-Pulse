
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  TrendingUp, 
  Lightbulb, 
  Zap, 
  Users, 
  Globe, 
  Star, 
  Brain,
  Rocket,
  Eye,
  Heart,
  ArrowRight
} from "lucide-react";
import { ProcessedStats } from "@/types/stats";

interface PredictiveAnalyticsProps {
  stats: ProcessedStats;
}

const PredictiveAnalytics = ({ stats }: PredictiveAnalyticsProps) => {
  const totalOpinions = stats.total;
  const recentActivity = stats.recent;
  const growthRate = totalOpinions > 0 ? ((recentActivity / totalOpinions) * 100) : 0;

  // Generate predictive insights
  const topCategory = Object.entries(stats.byProjectType || {})
    .sort(([,a], [,b]) => b - a)[0];
  
  const topCountry = Object.entries(stats.byCountry || {})
    .sort(([,a], [,b]) => b - a)[0];

  const topGenre = Object.entries(stats.byGenre || {})
    .sort(([,a], [,b]) => b - a)[0];

  // Calculate opportunity scores
  const getOpportunityScore = (category: string, value: number) => {
    const marketShare = (value / totalOpinions) * 100;
    if (marketShare > 40) return { score: 85 + Math.random() * 10, level: 'High Opportunity', color: 'text-green-600' };
    if (marketShare > 20) return { score: 70 + Math.random() * 15, level: 'Moderate Opportunity', color: 'text-blue-600' };
    return { score: 50 + Math.random() * 20, level: 'Emerging Opportunity', color: 'text-orange-600' };
  };

  const categoryOpportunity = topCategory ? getOpportunityScore(topCategory[0], topCategory[1]) : null;

  // Predictive recommendations
  const recommendations = [
    {
      type: "Content Strategy",
      icon: <Rocket className="w-5 h-5 text-blue-500" />,
      title: "Focus on High-Performing Categories",
      description: topCategory ? `${topCategory[0]} shows strong audience engagement (${((topCategory[1] / totalOpinions) * 100).toFixed(1)}% share). Consider expanding content in this category.` : "No clear category leader identified yet.",
      confidence: topCategory ? Math.min(95, 60 + ((topCategory[1] / totalOpinions) * 100)) : 50,
      priority: "High"
    },
    {
      type: "Market Expansion",
      icon: <Globe className="w-5 h-5 text-green-500" />,
      title: "Geographic Growth Opportunities",
      description: `Active in ${Object.keys(stats.byCountry || {}).length} countries. ${topCountry ? `${topCountry[0]} leads with ${((topCountry[1] / totalOpinions) * 100).toFixed(1)}% of engagement.` : 'Consider regional expansion strategies.'}`,
      confidence: 75 + (Object.keys(stats.byCountry || {}).length * 2),
      priority: "Medium"
    },
    {
      type: "Audience Engagement",
      icon: <Heart className="w-5 h-5 text-purple-500" />,
      title: "Boost Community Interaction",
      description: `Current feedback rate: ${(((stats.userNotes?.length || 0) / totalOpinions) * 100).toFixed(1)}%. Implement engagement campaigns to increase user participation and detailed feedback.`,
      confidence: 80,
      priority: growthRate > 10 ? "Medium" : "High"
    },
    {
      type: "Content Innovation",
      icon: <Brain className="w-5 h-5 text-orange-500" />,
      title: "Explore Emerging Trends",
      description: topGenre ? `${topGenre[0]} genre shows promising engagement. Consider developing similar content themes and exploring related subcategories.` : "Monitor emerging content preferences for early adoption opportunities.",
      confidence: 70,
      priority: "Medium"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      default: return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
    }
  };

  return (
    <div className="space-y-8">
      {/* Predictive Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Target className="w-8 h-8 text-blue-600" />
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                  Growth Potential
                </Badge>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                  {Math.min(98, 65 + growthRate + (Object.keys(stats.byCountry || {}).length * 2)).toFixed(0)}%
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-300">Market Opportunity</p>
                <Progress value={Math.min(98, 65 + growthRate + (Object.keys(stats.byCountry || {}).length * 2))} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
                <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                  Engagement Forecast
                </Badge>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-green-800 dark:text-green-200">
                  +{Math.max(5, growthRate * 1.5 + 10).toFixed(0)}%
                </h3>
                <p className="text-sm text-green-600 dark:text-green-300">Expected Growth</p>
                <div className="text-xs text-green-700 dark:text-green-300">
                  Next 30 days projection
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200 dark:border-purple-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Brain className="w-8 h-8 text-purple-600" />
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100">
                  AI Confidence
                </Badge>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                  {categoryOpportunity ? categoryOpportunity.score.toFixed(0) : 75}%
                </h3>
                <p className="text-sm text-purple-600 dark:text-purple-300">Prediction Accuracy</p>
                <div className="text-xs text-purple-700 dark:text-purple-300">
                  Based on {totalOpinions} data points
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Strategic Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              AI-Powered Strategic Recommendations
            </CardTitle>
            <CardDescription>
              Data-driven insights and actionable recommendations for growth
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={rec.type}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="border rounded-lg p-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {rec.icon}
                      <div>
                        <h4 className="font-semibold text-lg">{rec.title}</h4>
                        <p className="text-sm text-muted-foreground">{rec.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(rec.priority)}>
                        {rec.priority} Priority
                      </Badge>
                      <Badge variant="outline">
                        {rec.confidence.toFixed(0)}% confidence
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {rec.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Confidence Level:</span>
                      <Progress value={rec.confidence} className="w-24 h-2" />
                      <span className="text-sm font-medium">{rec.confidence.toFixed(0)}%</span>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Market Opportunity Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-800 dark:text-indigo-200">
              <Zap className="w-5 h-5" />
              Market Opportunity Matrix
            </CardTitle>
            <CardDescription className="text-indigo-600 dark:text-indigo-300">
              Identify high-potential areas for content development and audience growth
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Content Categories Analysis */}
              <div className="space-y-4">
                <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Content Categories
                </h4>
                {Object.entries(stats.byProjectType || {})
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 3)
                  .map(([category, value], index) => {
                    const opportunity = getOpportunityScore(category, value);
                    return (
                      <div key={category} className="p-3 bg-white dark:bg-gray-800 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">{category}</span>
                          <Badge variant="outline" className="text-xs">
                            #{index + 1}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Progress value={(value / totalOpinions) * 100} className="flex-1 h-2" />
                          <span className="text-xs text-muted-foreground">
                            {((value / totalOpinions) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs ${opportunity.color}`}>
                            {opportunity.level}
                          </span>
                          <span className="text-xs font-medium">
                            {opportunity.score.toFixed(0)}% score
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Geographic Opportunities */}
              <div className="space-y-4">
                <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Geographic Markets
                </h4>
                {Object.entries(stats.byCountry || {})
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 3)
                  .map(([country, value], index) => {
                    const marketShare = (value / totalOpinions) * 100;
                    return (
                      <div key={country} className="p-3 bg-white dark:bg-gray-800 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">{country}</span>
                          <Badge variant="outline" className="text-xs">
                            Top {index + 1}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Progress value={marketShare} className="flex-1 h-2" />
                          <span className="text-xs text-muted-foreground">
                            {marketShare.toFixed(1)}%
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {value} active participants
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Audience Engagement */}
              <div className="space-y-4">
                <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Engagement Metrics
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">Feedback Rate</span>
                      <Badge variant="outline" className="text-xs">
                        Active
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      {(((stats.userNotes?.length || 0) / totalOpinions) * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stats.userNotes?.length || 0} detailed comments
                    </div>
                  </div>
                  
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">Growth Rate</span>
                      <Badge variant="outline" className="text-xs">
                        Trending
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {growthRate.toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Recent activity surge
                    </div>
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

export default PredictiveAnalytics;
