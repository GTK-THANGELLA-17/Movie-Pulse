import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, TrendingUp, MapPin, Calendar, Star, Film, Music, Tv, Youtube } from "lucide-react";
import { ProcessedStats } from "@/types/stats";

interface DemographicInsightsProps {
  stats: ProcessedStats;
}

const DemographicInsights = ({ stats }: DemographicInsightsProps) => {
  // Process demographic cross-analysis data
  const processInterests = (demographic: Record<string, number>, contentData: Record<string, number>) => {
    const interests: { [key: string]: { [content: string]: number } } = {};
    
    // This would require backend enhancement to get cross-demographic data
    // For now, showing proportional interests based on overall data
    Object.keys(demographic).forEach(demo => {
      interests[demo] = {};
      Object.entries(contentData).forEach(([content, count]) => {
        const demoCount = demographic[demo] || 0;
        const proportion = count / Object.values(contentData).reduce((sum, c) => sum + c, 0);
        interests[demo][content] = Math.round(demoCount * proportion);
      });
    });
    
    return interests;
  };

  const genderInterests = processInterests(
    stats.byDemographics?.gender || {}, 
    { ...stats.byProjectType, ...stats.byGenre }
  );

  const ageInterests = processInterests(
    stats.byDemographics?.age || {}, 
    { ...stats.byProjectType, ...stats.byGenre }
  );

  const regionInterests = processInterests(
    stats.byDemographics?.region || {}, 
    { ...stats.byProjectType, ...stats.byCountry }
  );

  const getContentIcon = (content: string) => {
    const lower = content.toLowerCase();
    if (lower.includes('film') || lower.includes('movie')) return <Film className="w-4 h-4" />;
    if (lower.includes('music')) return <Music className="w-4 h-4" />;
    if (lower.includes('television') || lower.includes('tv')) return <Tv className="w-4 h-4" />;
    if (lower.includes('youtube')) return <Youtube className="w-4 h-4" />;
    return <Star className="w-4 h-4" />;
  };

  const renderDemographicInterests = (
    title: string, 
    icon: any, 
    interests: { [key: string]: { [content: string]: number } },
    color: string
  ) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title} Interests
        </CardTitle>
        <CardDescription>
          Content preferences by {title.toLowerCase()} groups
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(interests).map(([demo, contentMap]) => {
            const totalForDemo = Object.values(contentMap).reduce((sum, count) => sum + count, 0);
            if (totalForDemo === 0) return null;
            
            const topInterests = Object.entries(contentMap)
              .filter(([, count]) => count > 0)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 5);

            return (
              <motion.div
                key={demo}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border rounded-lg p-4 bg-gray-50/50 dark:bg-gray-800/50"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold capitalize">{demo}</h4>
                  <Badge variant="outline" className="text-xs">
                    {totalForDemo} total interests
                  </Badge>
                </div>
                <div className="space-y-2">
                  {topInterests.map(([content, count]) => {
                    const percentage = totalForDemo > 0 ? (count / totalForDemo) * 100 : 0;
                    return (
                      <div key={content} className="flex items-center gap-3">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          {getContentIcon(content)}
                          <span className="text-sm font-medium truncate">{content}</span>
                        </div>
                        <div className="flex items-center gap-2 min-w-0">
                          <Progress 
                            value={percentage} 
                            className={`w-20 h-2`}
                          />
                          <span className="text-xs text-muted-foreground min-w-fit">
                            {percentage.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-blue-600 dark:text-blue-400">Gender Groups</p>
                <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                  {Object.keys(stats.byDemographics?.gender || {}).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-green-600 dark:text-green-400">Age Ranges</p>
                <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                  {Object.keys(stats.byDemographics?.age || {}).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm text-purple-600 dark:text-purple-400">Regions</p>
                <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                  {Object.keys(stats.byDemographics?.region || {}).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Demographic Interests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {renderDemographicInterests(
          "Gender",
          <Users className="w-5 h-5 text-blue-500" />,
          genderInterests,
          "blue"
        )}
        
        {renderDemographicInterests(
          "Age",
          <Calendar className="w-5 h-5 text-green-500" />,
          ageInterests,
          "green"
        )}
        
        {renderDemographicInterests(
          "Region",
          <MapPin className="w-5 h-5 text-purple-500" />,
          regionInterests,
          "purple"
        )}
      </div>

      {/* Content Performance by Demographics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            Content Performance Across Demographics
          </CardTitle>
          <CardDescription>
            How different content types perform with various demographic groups
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(stats.byProjectType || {}).map(([projectType, count]) => {
              const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
              
              return (
                <motion.div
                  key={projectType}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="border rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getContentIcon(projectType)}
                      <h4 className="font-semibold">{projectType}</h4>
                      <Badge variant="outline">{count} opinions</Badge>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold">{percentage.toFixed(1)}%</span>
                      <p className="text-xs text-muted-foreground">of total</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <h5 className="text-sm font-medium mb-2 text-blue-600">Top Gender Groups</h5>
                      <div className="space-y-1">
                        {Object.entries(stats.byDemographics?.gender || {})
                          .sort(([, a], [, b]) => b - a)
                          .slice(0, 3)
                          .map(([gender, genderCount]) => (
                            <div key={gender} className="flex justify-between text-xs">
                              <span>{gender}</span>
                              <span className="font-medium">{genderCount}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium mb-2 text-green-600">Top Age Groups</h5>
                      <div className="space-y-1">
                        {Object.entries(stats.byDemographics?.age || {})
                          .sort(([, a], [, b]) => b - a)
                          .slice(0, 3)
                          .map(([age, ageCount]) => (
                            <div key={age} className="flex justify-between text-xs">
                              <span>{age}</span>
                              <span className="font-medium">{ageCount}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium mb-2 text-purple-600">Top Regions</h5>
                      <div className="space-y-1">
                        {Object.entries(stats.byDemographics?.region || {})
                          .sort(([, a], [, b]) => b - a)
                          .slice(0, 3)
                          .map(([region, regionCount]) => (
                            <div key={region} className="flex justify-between text-xs">
                              <span className="truncate">{region}</span>
                              <span className="font-medium">{regionCount}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DemographicInsights;