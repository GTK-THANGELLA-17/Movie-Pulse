
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Download, TrendingUp, Users, Globe, Star, Film, Music, Tv, Youtube } from "lucide-react";
import { ProcessedStats } from "@/types/stats";
import ContentSpecificStats from "./ContentSpecificStats";

interface LocalStatsOverviewProps {
  stats: ProcessedStats | null;
  onDownload: (format: 'excel' | 'word' | 'text') => void;
  sectionType?: string;
}

const LocalStatsOverview = ({ stats, onDownload, sectionType = "local" }: LocalStatsOverviewProps) => {
  if (!stats) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📊</div>
        <p className="text-xl text-gray-500 dark:text-gray-400 mb-2">No Data Available</p>
        <p className="text-gray-400 dark:text-gray-500">Start collecting audience feedback to see insights here</p>
      </div>
    );
  }

  // Process data for overview
  const totalOpinions = stats.total;
  const recentActivity = stats.recent;
  const topCountries = Object.entries(stats.byCountry || {})
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);
  const topGenres = Object.entries(stats.byGenre || {})
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);
  const projectTypes = Object.entries(stats.byProjectType || {})
    .sort(([,a], [,b]) => b - a);

  const getProjectIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'films': return <Film className="w-5 h-5" />;
      case 'musiccontent': return <Music className="w-5 h-5" />;
      case 'television': return <Tv className="w-5 h-5" />;
      case 'youtubecontent': return <Youtube className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Download Actions */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
            <Download className="w-5 h-5" />
            Export Complete Report
          </CardTitle>
          <CardDescription className="text-blue-600 dark:text-blue-300">
            Download comprehensive audience insights in your preferred format
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={() => onDownload('excel')} 
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              📊 Excel Report
            </Button>
            <Button 
              onClick={() => onDownload('word')} 
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              📄 Word Document
            </Button>
            <Button 
              onClick={() => onDownload('text')} 
              className="bg-gray-600 hover:bg-gray-700 text-white"
            >
              📝 Text File
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Project Types Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            Content Categories Performance
          </CardTitle>
          <CardDescription>
            See how different entertainment categories are performing with your audience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectTypes.map(([type, count], index) => {
              const percentage = totalOpinions > 0 ? (count / totalOpinions) * 100 : 0;
              return (
                <motion.div
                  key={type}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-3 flex-1">
                    {getProjectIcon(type)}
                    <div>
                      <p className="font-medium">{type}</p>
                      <p className="text-sm text-gray-500">{count} opinions</p>
                    </div>
                  </div>
                  <div className="text-right min-w-0 flex-1">
                    <Progress value={percentage} className="w-full mb-1" />
                    <p className="text-sm font-medium">{percentage.toFixed(1)}%</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Geographic Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-500" />
              Top Countries
            </CardTitle>
            <CardDescription>
              Geographic distribution of your audience feedback
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCountries.map(([country, count], index) => {
                const percentage = totalOpinions > 0 ? (count / totalOpinions) * 100 : 0;
                return (
                  <div key={country} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        #{index + 1}
                      </Badge>
                      <span className="font-medium">{country}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold">{count}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-purple-500" />
              Popular Genres
            </CardTitle>
            <CardDescription>
              Most requested genres across all categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topGenres.map(([genre, count], index) => {
                const percentage = totalOpinions > 0 ? (count / totalOpinions) * 100 : 0;
                return (
                  <div key={genre} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        #{index + 1}
                      </Badge>
                      <span className="font-medium">{genre}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold">{count}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Demographics Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-green-500" />
            Audience Demographics
          </CardTitle>
          <CardDescription>
            Understanding your audience composition
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Gender Distribution */}
            <div>
              <h4 className="font-medium mb-3">Gender Distribution</h4>
              <div className="space-y-2">
                {Object.entries(stats.byDemographics?.gender || {})
                  .sort(([,a], [,b]) => b - a)
                  .map(([gender, count]) => {
                    const percentage = totalOpinions > 0 ? (count / totalOpinions) * 100 : 0;
                    return (
                      <div key={gender} className="flex justify-between items-center">
                        <span className="text-sm">{gender}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500 transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">{percentage.toFixed(0)}%</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Age Distribution */}
            <div>
              <h4 className="font-medium mb-3">Age Groups</h4>
              <div className="space-y-2">
                {Object.entries(stats.byDemographics?.age || {})
                  .sort(([,a], [,b]) => b - a)
                  .map(([age, count]) => {
                    const percentage = totalOpinions > 0 ? (count / totalOpinions) * 100 : 0;
                    return (
                      <div key={age} className="flex justify-between items-center">
                        <span className="text-sm">{age}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">{percentage.toFixed(0)}%</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Regional Distribution */}
            <div>
              <h4 className="font-medium mb-3">Regional Spread</h4>
              <div className="space-y-2">
                {Object.entries(stats.byDemographics?.region || {})
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 5)
                  .map(([region, count]) => {
                    const percentage = totalOpinions > 0 ? (count / totalOpinions) * 100 : 0;
                    return (
                      <div key={region} className="flex justify-between items-center">
                        <span className="text-sm">{region}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-purple-500 transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">{percentage.toFixed(0)}%</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Summary */}
      <Card className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
            <TrendingUp className="w-5 h-5" />
            Recent Activity Summary
          </CardTitle>
          <CardDescription className="text-green-600 dark:text-green-300">
            Latest engagement trends and patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                {recentActivity}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">
                Recent Opinions
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                {((recentActivity / totalOpinions) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">
                Activity Rate
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                {Object.keys(stats.byCountry || {}).length}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">
                Active Countries
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                {stats.userNotes?.length || 0}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">
                User Feedback
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content-Specific Statistics */}
      {stats && <ContentSpecificStats stats={stats} sectionType={sectionType} />}
    </div>
  );
};

export default LocalStatsOverview;
