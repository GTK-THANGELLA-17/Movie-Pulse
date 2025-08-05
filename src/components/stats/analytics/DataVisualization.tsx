
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart3, PieChart, Table, Download, Filter, TrendingUp } from "lucide-react";
import { ProcessedStats } from "@/types/stats";
import ChartRenderer from "../charts/ChartRenderer";

interface DataVisualizationProps {
  stats: ProcessedStats;
  onDownload: (format: 'excel' | 'word' | 'text') => void;
}

const DataVisualization = ({ stats, onDownload }: DataVisualizationProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("content");
  const [chartType, setChartType] = useState<string>("bar");

  // Organize data by categories
  const dataCategories = {
    content: {
      label: "Content Categories",
      data: Object.entries(stats.byProjectType || {}).map(([name, value]) => ({ name, value }))
    },
    geography: {
      label: "Geographic Distribution",
      data: Object.entries(stats.byCountry || {}).map(([name, value]) => ({ name, value }))
    },
    genres: {
      label: "Genre Preferences",
      data: Object.entries(stats.byGenre || {}).map(([name, value]) => ({ name, value }))
    },
    demographics: {
      label: "Audience Demographics",
      data: Object.entries(stats.byDemographics?.gender || {}).map(([name, value]) => ({ name, value }))
    }
  };

  const activeData = dataCategories[selectedCategory as keyof typeof dataCategories];

  return (
    <div className="space-y-6">
      {/* Category and Chart Type Controls */}
      <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            Advanced Data Visualization
          </CardTitle>
          <CardDescription>
            Interactive charts and graphs for comprehensive data analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Category Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Data Category
            </label>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {Object.entries(dataCategories).map(([key, category]) => (
                <Button
                  key={key}
                  variant={selectedCategory === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(key)}
                  className={`justify-start ${
                    selectedCategory === key
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
                  }`}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Chart Type Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Visualization Type</label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={chartType === 'bar' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setChartType('bar')}
                className="flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                Bar Chart
              </Button>
              <Button
                variant={chartType === 'pie' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setChartType('pie')}
                className="flex items-center gap-2"
              >
                <PieChart className="w-4 h-4" />
                Pie Chart
              </Button>
              <Button
                variant={chartType === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setChartType('table')}
                className="flex items-center gap-2"
              >
                <Table className="w-4 h-4" />
                Data Table
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Visualization */}
      <motion.div
        key={selectedCategory + chartType}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  {activeData.label}
                </CardTitle>
                <CardDescription>
                  {activeData.data.length} data points • Total: {activeData.data.reduce((sum, item) => sum + item.value, 0)} opinions
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-blue-600">
                {chartType === 'bar' ? 'Bar Chart' : chartType === 'pie' ? 'Pie Chart' : 'Data Table'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {activeData.data.length > 0 ? (
              <div className="w-full">
                <ChartRenderer
                  data={activeData.data}
                  chartType={chartType}
                  label={activeData.label}
                />
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No data available for {activeData.label.toLowerCase()}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Data Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(dataCategories).map(([key, category]) => {
          const total = category.data.reduce((sum, item) => sum + item.value, 0);
          const topItem = category.data.sort((a, b) => b.value - a.value)[0];
          
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className={`cursor-pointer transition-all duration-200 ${
                selectedCategory === key 
                  ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedCategory(key)}>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{category.label}</h4>
                      <Badge variant="secondary">{category.data.length}</Badge>
                    </div>
                    <div className="text-2xl font-bold">{total.toLocaleString()}</div>
                    {topItem && (
                      <div className="text-xs text-muted-foreground">
                        Top: {topItem.name} ({topItem.value})
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Export Actions */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
            <Download className="w-5 h-5" />
            Export Visualization Data
          </CardTitle>
          <CardDescription>
            Download the current visualization data in various formats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => onDownload('excel')} className="bg-green-600 hover:bg-green-700">
              📊 Excel Report
            </Button>
            <Button onClick={() => onDownload('word')} className="bg-blue-600 hover:bg-blue-700">
              📄 Word Document
            </Button>
            <Button onClick={() => onDownload('text')} className="bg-gray-600 hover:bg-gray-700">
              📝 Text File
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataVisualization;
