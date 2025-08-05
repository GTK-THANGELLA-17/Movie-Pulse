import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, PieChart, TrendingUp, Globe, Users, Eye, 
  Heart, Star, Calendar, Download, Share2, Filter,
  ChevronRight, ChevronDown, Target, Award, Zap
} from 'lucide-react';
import { ProcessedStats } from '@/types/stats';

interface EnhancedStatsDisplayProps {
  stats: ProcessedStats;
  sectionType: string;
}

const EnhancedStatsDisplay = ({ stats, sectionType }: EnhancedStatsDisplayProps) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['overview']));
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'insights'>('overview');

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const getTopItems = (data: Record<string, number>, limit: number = 5) => {
    return Object.entries(data)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, limit);
  };

  const calculatePercentage = (value: number, total: number) => {
    return total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
  };

  const getTrendIcon = (value: number) => {
    if (value > 50) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (value > 30) return <Target className="w-4 h-4 text-yellow-500" />;
    return <Award className="w-4 h-4 text-blue-500" />;
  };

  const keyMetrics = [
    {
      title: "Total Opinions",
      value: stats.total.toLocaleString(),
      icon: <Users className="w-5 h-5" />,
      change: "+12.5%",
      color: "bg-blue-500"
    },
    {
      title: "Recent Activity",
      value: stats.recent.toLocaleString(),
      icon: <Zap className="w-5 h-5" />,
      change: "+8.3%",
      color: "bg-green-500"
    },
    {
      title: "Countries",
      value: Object.keys(stats.byCountry).length.toString(),
      icon: <Globe className="w-5 h-5" />,
      change: "+2",
      color: "bg-purple-500"
    },
    {
      title: "Engagement Rate",
      value: "94.2%",
      icon: <Heart className="w-5 h-5" />,
      change: "+1.8%",
      color: "bg-red-500"
    }
  ];

  const StatSection = ({ title, data, icon, type = 'bar' }: any) => {
    const isExpanded = expandedSections.has(title.toLowerCase());
    const topItems = getTopItems(data, 10);
    const maxValue = Math.max(...Object.values(data).map(val => Number(val) || 0));

    return (
      <Card className="border-l-4 border-l-primary">
        <CardHeader 
          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection(title.toLowerCase())}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {icon}
              <div>
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription>
                  {topItems.length} categories • {Object.values(data).reduce((sum: number, value) => sum + (Number(value) || 0), 0).toLocaleString()} total
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{topItems.length}</Badge>
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </div>
          </div>
        </CardHeader>
        
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="space-y-4">
              {topItems.map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        #{index + 1}
                      </span>
                      <span className="font-medium truncate max-w-[200px]" title={key}>
                        {key}
                      </span>
                      {getTrendIcon(Number(value))}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {calculatePercentage(Number(value), stats.total)}%
                      </Badge>
                      <span className="text-sm font-semibold text-primary">
                      {String(value)}
                      </span>
                    </div>
                  </div>
                  <Progress 
                    value={(Number(value) / maxValue) * 100} 
                    className="h-2"
                  />
                </motion.div>
              ))}
              
              {Object.keys(data).length > 10 && (
                <div className="text-center pt-2">
                  <Button variant="ghost" size="sm">
                    View All {Object.keys(data).length} Items
                  </Button>
                </div>
              )}
            </CardContent>
          </motion.div>
        )}
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold capitalize">{sectionType} Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Comprehensive insights and detailed analytics for better decision making
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Tabs value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
            <TabsList>
              <TabsTrigger value="overview" className="flex items-center gap-1">
                <BarChart3 className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="detailed" className="flex items-center gap-1">
                <PieChart className="w-4 h-4" />
                Detailed
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                Insights
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <TrendingUp className="w-3 h-3" />
                      {metric.change}
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${metric.color} text-white`}>
                    {metric.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={viewMode} className="space-y-6">
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6">
            {stats.byProjectType && Object.keys(stats.byProjectType).length > 0 && (
              <StatSection
                title="Project Types"
                data={stats.byProjectType}
                icon={<BarChart3 className="w-5 h-5 text-blue-500" />}
              />
            )}
            
            {stats.byCountry && Object.keys(stats.byCountry).length > 0 && (
              <StatSection
                title="Geographic Distribution"
                data={stats.byCountry}
                icon={<Globe className="w-5 h-5 text-green-500" />}
              />
            )}
            
            {stats.byGenre && Object.keys(stats.byGenre).length > 0 && (
              <StatSection
                title="Genres"
                data={stats.byGenre}
                icon={<Star className="w-5 h-5 text-yellow-500" />}
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          <div className="grid gap-6">
            {/* All available stats sections */}
            {Object.entries(stats).map(([key, value]) => {
              if (key === 'total' || key === 'recent' || key === 'userNotes' || key === 'byDemographics') return null;
              if (typeof value === 'object' && value && Object.keys(value).length > 0) {
                const title = key.replace(/^by/, '').replace(/([A-Z])/g, ' $1').trim();
                return (
                  <StatSection
                    key={key}
                    title={title}
                    data={value}
                    icon={<PieChart className="w-5 h-5 text-purple-500" />}
                  />
                );
              }
              return null;
            })}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Key Insights & Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100">Market Opportunity</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-200">
                      Based on current trends, there's a growing demand for {Object.keys(stats.byGenre)[0]} content.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-900 dark:text-green-100">Geographic Focus</h4>
                    <p className="text-sm text-green-700 dark:text-green-200">
                      {Object.keys(stats.byCountry)[0]} shows the highest engagement, suggesting strong market potential.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-900 dark:text-purple-100">Content Strategy</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-200">
                      Diversifying into underrepresented genres could capture new audience segments.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedStatsDisplay;