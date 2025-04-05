
import { useState, useEffect } from "react";
import { 
  BarChart, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend 
} from "recharts";
import { BarChart2, PieChartIcon, Table, Download, FileText, FileSpreadsheet } from "lucide-react";
import { 
  YOUTUBE_CONTENT_CATEGORIES,
  YOUTUBE_CONTENT_CATEGORY_LABELS,
  getCountsByYoutubeSection,
  getCountsByYoutubeContentCategory
} from "@/lib/data";
import { YouTubeContentCategory } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import * as XLSX from 'xlsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B', '#6B8E23', '#4682B4', '#9932CC', '#CD5C5C'];

type ViewType = "bar" | "pie" | "table";

const YouTubeContentStats = () => {
  const { toast } = useToast();
  const [selectedSection, setSelectedSection] = useState<string>("Gaming");
  const [viewType, setViewType] = useState<ViewType>("bar");
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    updateChartData();
  }, [selectedSection]);
  
  const updateChartData = () => {
    setIsLoading(true);
    
    // Simulate API loading
    setTimeout(() => {
      const counts = getCountsByYoutubeSection(selectedSection);
      
      // Convert the data for chart display
      const data = Object.entries(counts).map(([category, count]) => ({
        name: YOUTUBE_CONTENT_CATEGORY_LABELS[category as YouTubeContentCategory] || category,
        value: count,
        category
      }));
      
      setChartData(data);
      setIsLoading(false);
    }, 500);
  };
  
  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
  };
  
  const handleViewChange = (view: ViewType) => {
    setViewType(view);
  };
  
  const handleDownload = (format: string) => {
    const data = chartData.map(item => ({
      Category: item.name,
      Votes: item.value,
      Section: selectedSection
    }));

    if (format === 'excel') {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "YouTube Content Preferences");
      XLSX.writeFile(workbook, `YouTube_${selectedSection}_Stats.xlsx`);
      
      toast({
        title: "Download successful",
        description: `Data exported to Excel format.`,
      });
    } else if (format === 'word') {
      // Convert data to HTML table for Word
      let html = '<table border="1" cellpadding="5" cellspacing="0">';
      html += '<tr><th>Category</th><th>Votes</th><th>Section</th></tr>';
      
      data.forEach(row => {
        html += `<tr><td>${row.Category}</td><td>${row.Votes}</td><td>${row.Section}</td></tr>`;
      });
      html += '</table>';
      
      // Create a blob and download
      const blob = new Blob([html], { type: 'application/msword' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `YouTube_${selectedSection}_Stats.doc`;
      link.click();
      
      toast({
        title: "Download successful",
        description: `Data exported to Word format.`,
      });
    } else if (format === 'text') {
      // Convert data to plain text
      let text = `YouTube Content Preferences - ${selectedSection}\n\n`;
      text += "Category\tVotes\tSection\n";
      
      data.forEach(row => {
        text += `${row.Category}\t${row.Votes}\t${row.Section}\n`;
      });
      
      // Create a blob and download
      const blob = new Blob([text], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `YouTube_${selectedSection}_Stats.txt`;
      link.click();
      
      toast({
        title: "Download successful",
        description: `Data exported to text format.`,
      });
    }
  };
  
  const renderChart = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-80">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-muted"></div>
            <div className="mt-4 w-24 h-5 bg-muted rounded"></div>
          </div>
        </div>
      );
    }
    
    if (chartData.length === 0 || chartData.every(item => item.value === 0)) {
      return (
        <div className="flex items-center justify-center h-80 text-center">
          <div className="max-w-md">
            <h3 className="heading-sm mb-2">No Data Available</h3>
            <p className="text-muted-foreground">
              There are currently no votes for YouTube content in the {selectedSection} section. 
              Be the first to cast your vote!
            </p>
          </div>
        </div>
      );
    }
    
    switch (viewType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: "8px", 
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  border: "none"
                }}
              />
              <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
        
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} votes`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
        
      case "table":
        return (
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">Category</th>
                  <th className="px-4 py-3 text-left font-medium">Count</th>
                  <th className="px-4 py-3 text-left font-medium">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((item, index) => {
                  const total = chartData.reduce((sum, item) => sum + item.value, 0);
                  const percentage = total > 0 ? (item.value / total) * 100 : 0;
                  
                  return (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                          {item.name}
                        </div>
                      </td>
                      <td className="px-4 py-3">{item.value}</td>
                      <td className="px-4 py-3">{percentage.toFixed(1)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
    }
  };

  const renderFilterControls = () => {
    return (
      <div className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">YouTube Content Section</label>
          <Select
            value={selectedSection}
            onValueChange={(value) => handleSectionChange(value)}
          >
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="Select content section" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(YOUTUBE_CONTENT_CATEGORIES).map((section) => (
                <SelectItem key={section} value={section}>
                  {section}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">View Options</label>
            <div className="flex gap-2">
              <button
                onClick={() => handleViewChange("bar")}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  viewType === "bar" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                )}
                title="Bar Chart"
              >
                <BarChart2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleViewChange("pie")}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  viewType === "pie" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                )}
                title="Pie Chart"
              >
                <PieChartIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleViewChange("table")}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  viewType === "table" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                )}
                title="Table View"
              >
                <Table className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div>
      {renderFilterControls()}
      
      <div className="mb-6">{renderChart()}</div>
      
      <div className="flex flex-wrap justify-between items-center gap-3 pt-2 border-t mt-6 pt-4">
        <div className="text-sm text-muted-foreground">
          Data can be exported in multiple formats for further analysis.
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg flex items-center gap-2 hover:bg-secondary/80 transition-all"
            onClick={() => handleDownload('excel')}
          >
            <FileSpreadsheet className="w-4 h-4" />
            Excel
          </button>
          <button
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg flex items-center gap-2 hover:bg-secondary/80 transition-all"
            onClick={() => handleDownload('word')}
          >
            <FileText className="w-4 h-4" />
            Word
          </button>
          <button
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg flex items-center gap-2 hover:bg-secondary/80 transition-all"
            onClick={() => handleDownload('text')}
          >
            <Download className="w-4 h-4" />
            Text
          </button>
        </div>
      </div>
    </div>
  );
};

export default YouTubeContentStats;
