
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLiveInsights } from "@/hooks/useLiveInsights";
import { TrendingUp, TrendingDown, Users, MapPin, Star, Sparkles, RefreshCw } from "lucide-react";
import { LoadingState } from "@/components/stats/StatsLoadingStates";

const LiveInsightsSection = () => {
  const { liveInsights, personalizedInsights, isLoading, refreshInsights } = useLiveInsights();

  if (isLoading) {
    return <LoadingState title="Generating Live Insights..." description="Analyzing latest voting patterns" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Personalized Insights */}
      {personalizedInsights?.hasData && (
        <Card className="bg-gradient-to-r from-primary/5 to-purple-500/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Your Personal Insights
            </CardTitle>
            <CardDescription>Based on your {personalizedInsights.userPreferences?.totalVotes} votes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {personalizedInsights.insights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg"
                >
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary" />
                    {insight.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </motion.div>
              ))}
            </div>

            {personalizedInsights.userPreferences && (
              <div className="mt-4 p-3 bg-white/30 dark:bg-gray-800/30 rounded-lg">
                <h5 className="font-medium mb-2">Your Favorite Genres:</h5>
                <div className="flex flex-wrap gap-2">
                  {personalizedInsights.userPreferences.genres.slice(0, 5).map((genre, i) => (
                    <Badge key={i} variant="secondary">{genre}</Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Live Trending Insights */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Live Trending Insights
              </CardTitle>
              <CardDescription>
                Real-time analysis from {liveInsights?.totalRecentOpinions || 0} recent opinions
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshInsights}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Trending Genres */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Star className="w-4 h-4" />
                Trending Genres
              </h4>
              <div className="space-y-2">
                {liveInsights?.genreTrends.slice(0, 5).map((trend, index) => (
                  <motion.div
                    key={trend._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div>
                      <span className="font-medium">{trend._id}</span>
                      <div className="flex gap-1 mt-1">
                        {trend.categories.slice(0, 2).map((cat, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{cat}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{trend.count} votes</Badge>
                      {index === 0 && <TrendingUp className="w-4 h-4 text-green-500" />}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Regional Preferences */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Regional Preferences
              </h4>
              <div className="space-y-2">
                {liveInsights?.regionalTrends.slice(0, 5).map((trend, index) => (
                  <motion.div
                    key={`${trend._id.region}-${trend._id.genre}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div>
                      <span className="font-medium">{trend._id.region}</span>
                      <p className="text-sm text-muted-foreground">loves {trend._id.genre}</p>
                    </div>
                    <Badge variant="secondary">{trend.count} votes</Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Platform Trends */}
          <div className="mt-6">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Platform Popularity
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {liveInsights?.platformTrends.map((platform, index) => (
                <motion.div
                  key={platform._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg"
                >
                  <h5 className="font-medium text-sm mb-1">{platform._id}</h5>
                  <p className="text-2xl font-bold text-primary">{platform.count}</p>
                  <p className="text-xs text-muted-foreground">
                    Avg age: {Math.round(platform.avgAge || 0)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {liveInsights?.generatedAt && (
            <div className="mt-4 text-xs text-muted-foreground text-center">
              Last updated: {new Date(liveInsights.generatedAt).toLocaleString()}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LiveInsightsSection;
