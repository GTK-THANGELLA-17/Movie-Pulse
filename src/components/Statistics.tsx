import { useState, useEffect } from "react";
import { 
  BarChart, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend 
} from "recharts";
import { BarChart2, PieChartIcon, Table, Download, Share2, FileText, FileSpreadsheet, MessageSquare } from "lucide-react";
import { 
  FILM_INDUSTRIES, GENRES, PROJECT_TYPES, PROJECT_TYPE_LABELS, COUNTRIES,
  getCountsByIndustry, getVotes, getCountsByProjectType, getCountsByCountry
} from "@/lib/data";
import { FilmIndustry, Genre, ProjectType, Country, Vote } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import * as XLSX from 'xlsx';
import AppSocialShare from "@/components/AppSocialShare";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B', '#6B8E23', '#4682B4', '#9932CC', '#CD5C5C'];

type ViewType = "bar" | "pie" | "table";
type FilterMode = "industry" | "projectType" | "country";

const Statistics = () => {
  const { toast } = useToast();
  const [selectedIndustry, setSelectedIndustry] = useState<FilmIndustry>(FILM_INDUSTRIES[0] as FilmIndustry);
  const [selectedProjectType, setSelectedProjectType] = useState<ProjectType>(PROJECT_TYPES[0] as ProjectType);
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0] as Country);
  const [filterMode, setFilterMode] = useState<FilterMode>("industry");
  const [viewType, setViewType] = useState<ViewType>("bar");
  const [chartData, setChartData] = useState<any[]>([]);
  const [userNotes, setUserNotes] = useState<Vote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('stats');
      if (element) {
        const rect = element.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.75;
        if (isInView) {
          setIsVisible(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    updateChartData();
    loadUserNotes();
  }, [selectedIndustry, selectedProjectType, selectedCountry, filterMode]);

  // Listen for global stats refresh events
  useEffect(() => {
    const handleGlobalRefresh = () => {
      console.log('Statistics component: Global refresh event received');
      updateChartData();
      loadUserNotes();
    };

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key && event.key.includes('moviepulse-session-')) {
        console.log('Statistics component: Session storage changed, refreshing');
        updateChartData();
        loadUserNotes();
      }
    };

    window.addEventListener('refreshAllStats', handleGlobalRefresh);
    window.addEventListener('refreshLocalStats', handleGlobalRefresh);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('opinionSubmitted', handleGlobalRefresh);

    return () => {
      window.removeEventListener('refreshAllStats', handleGlobalRefresh);
      window.removeEventListener('refreshLocalStats', handleGlobalRefresh);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('opinionSubmitted', handleGlobalRefresh);
    };
  }, []);
  
  const updateChartData = () => {
    setIsLoading(true);
    
    // Get actual data from localStorage
    let counts;
    
    if (filterMode === "industry") {
      counts = getCountsByIndustry(selectedIndustry);
    } else if (filterMode === "projectType") {
      counts = getCountsByProjectType(selectedProjectType);
    } else {
      counts = getCountsByCountry(selectedCountry);
    }
    
    const data = GENRES.map(genre => ({
      name: genre,
      value: counts[genre] || 0
    }));
    
    setChartData(data);
    setIsLoading(false);
  };
  
  const loadUserNotes = () => {
    const allVotes = getVotes();
    let filteredVotes;
    
    if (filterMode === "industry") {
      filteredVotes = allVotes.filter(vote => 
        vote.filmIndustry === selectedIndustry && vote.notes?.trim()
      );
    } else if (filterMode === "projectType") {
      filteredVotes = allVotes.filter(vote => 
        vote.projectType === selectedProjectType && vote.notes?.trim()
      );
    } else {
      filteredVotes = allVotes.filter(vote => 
        vote.country === selectedCountry && vote.notes?.trim()
      );
    }
    
    // Sort by timestamp, most recent first
    filteredVotes.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    setUserNotes(filteredVotes);
  };
  
  const handleFilterModeChange = (mode: FilterMode) => {
    setFilterMode(mode);
  };
  
  const handleIndustryChange = (industry: string) => {
    setSelectedIndustry(industry as FilmIndustry);
  };
  
  const handleProjectTypeChange = (type: string) => {
    setSelectedProjectType(type as ProjectType);
  };
  
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country as Country);
  };
  
  const handleViewChange = (view: ViewType) => {
    setViewType(view);
  };
  
  const handleDownload = (format: string) => {
    const filterLabel = filterMode === "industry" 
      ? selectedIndustry 
      : filterMode === "projectType" 
      ? PROJECT_TYPE_LABELS[selectedProjectType]
      : selectedCountry;
      
    const data = chartData.map(item => ({
      Genre: item.name,
      Votes: item.value,
      FilterType: filterMode.charAt(0).toUpperCase() + filterMode.slice(1),
      FilterValue: filterLabel
    }));

    if (format === 'excel') {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Movie Preferences");
      XLSX.writeFile(workbook, `MoviePulse_${filterLabel}_Stats.xlsx`);
      
      toast({
        title: "Download successful",
        description: `Data exported to Excel format.`,
      });
    } else if (format === 'word') {
      // Convert data to HTML table for Word
      let html = '<table border="1" cellpadding="5" cellspacing="0">';
      html += '<tr><th>Genre</th><th>Votes</th><th>Filter Type</th><th>Filter Value</th></tr>';
      
      data.forEach(row => {
        html += `<tr><td>${row.Genre}</td><td>${row.Votes}</td><td>${row.FilterType}</td><td>${row.FilterValue}</td></tr>`;
      });
      html += '</table>';
      
      // Create a blob and download
      const blob = new Blob([html], { type: 'application/msword' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `MoviePulse_${filterLabel}_Stats.doc`;
      link.click();
      
      toast({
        title: "Download successful",
        description: `Data exported to Word format.`,
      });
    } else if (format === 'text') {
      // Convert data to plain text
      let text = `Movie Preferences Statistics - ${filterLabel}\n\n`;
      text += "Genre\tVotes\tFilter Type\tFilter Value\n";
      
      data.forEach(row => {
        text += `${row.Genre}\t${row.Votes}\t${row.FilterType}\t${row.FilterValue}\n`;
      });
      
      // Create a blob and download
      const blob = new Blob([text], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `MoviePulse_${filterLabel}_Stats.txt`;
      link.click();
      
      toast({
        title: "Download successful",
        description: `Data exported to text format.`,
      });
    }
  };
  
  const toggleUserNotes = () => {
    setShowNotes(!showNotes);
  };
  
  const renderChart = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-60 md:h-80">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-muted"></div>
            <div className="mt-4 w-24 h-5 bg-muted rounded"></div>
          </div>
        </div>
      );
    }
    
    if (chartData.every(item => item.value === 0)) {
      return (
        <div className="flex items-center justify-center h-60 md:h-80 text-center px-4">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold mb-2">No Data Available</h3>
            <p className="text-muted-foreground text-sm">
              There are currently no votes for {filterMode === "industry" 
                ? selectedIndustry 
                : filterMode === "projectType" 
                ? PROJECT_TYPE_LABELS[selectedProjectType]
                : selectedCountry}. Be the first to cast your vote!
            </p>
          </div>
        </div>
      );
    }
    
    switch (viewType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300} className="md:!h-[400px]">
            <BarChart data={chartData} margin={{ top: 20, right: 10, left: 10, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={80}
                fontSize={12}
                interval={0}
              />
              <YAxis fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: "8px", 
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  border: "none",
                  fontSize: "12px"
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
          <ResponsiveContainer width="100%" height={300} className="md:!h-[400px]">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={window.innerWidth < 768 ? 80 : 150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => 
                  window.innerWidth < 768 
                    ? `${(percent * 100).toFixed(0)}%`
                    : `${name}: ${(percent * 100).toFixed(0)}%`
                }
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
                  <th className="px-2 md:px-4 py-3 text-left font-medium text-sm">Genre</th>
                  <th className="px-2 md:px-4 py-3 text-left font-medium text-sm">Count</th>
                  <th className="px-2 md:px-4 py-3 text-left font-medium text-sm">%</th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((item, index) => {
                  const total = chartData.reduce((sum, item) => sum + item.value, 0);
                  const percentage = total > 0 ? (item.value / total) * 100 : 0;
                  
                  return (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="px-2 md:px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                          <span className="truncate">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-2 md:px-4 py-3 text-sm">{item.value}</td>
                      <td className="px-2 md:px-4 py-3 text-sm">{percentage.toFixed(1)}%</td>
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
          <label className="block text-sm font-medium mb-2">Filter By</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterMode("industry")}
              className={cn(
                "px-3 py-2 rounded-lg font-medium transition-all text-sm",
                filterMode === "industry" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              Film Industry
            </button>
            <button
              onClick={() => setFilterMode("projectType")}
              className={cn(
                "px-3 py-2 rounded-lg font-medium transition-all text-sm",
                filterMode === "projectType" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              Project Type
            </button>
            <button
              onClick={() => setFilterMode("country")}
              className={cn(
                "px-3 py-2 rounded-lg font-medium transition-all text-sm",
                filterMode === "country" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              Country
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filterMode === "industry" && (
            <div>
              <label className="block text-sm font-medium mb-2">Select Industry</label>
              <Select
                value={selectedIndustry}
                onValueChange={(value) => setSelectedIndustry(value as FilmIndustry)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {FILM_INDUSTRIES.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {filterMode === "projectType" && (
            <div>
              <label className="block text-sm font-medium mb-2">Select Project Type</label>
              <Select
                value={selectedProjectType}
                onValueChange={(value) => setSelectedProjectType(value as ProjectType)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  {PROJECT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {PROJECT_TYPE_LABELS[type]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {filterMode === "country" && (
            <div>
              <label className="block text-sm font-medium mb-2">Select Country</label>
              <Select
                value={selectedCountry}
                onValueChange={(value) => setSelectedCountry(value as Country)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-2">View Options</label>
            <div className="flex gap-2">
              <button
                onClick={() => setViewType("bar")}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  viewType === "bar" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                )}
                title="Bar Chart"
              >
                <BarChart2 className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button
                onClick={() => setViewType("pie")}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  viewType === "pie" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                )}
                title="Pie Chart"
              >
                <PieChartIcon className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button
                onClick={() => setViewType("table")}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  viewType === "table" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                )}
                title="Table View"
              >
                <Table className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderUserNotes = () => {
    if (!showNotes) return null;
    
    if (userNotes.length === 0) {
      return (
        <div className="mt-8 p-6 bg-muted/20 rounded-lg text-center">
          <p className="text-muted-foreground">No user notes available for this selection.</p>
        </div>
      );
    }
    
    return (
      <div className="mt-8 space-y-4">
        <h3 className="heading-sm">User Comments & Insights</h3>
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {userNotes.map((vote) => (
            <div key={vote.id} className="p-4 rounded-lg border bg-card">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>{vote.genre}</span>
                  <span className="text-muted-foreground">•</span>
                  <span>{vote.filmIndustry}</span>
                  <span className="text-muted-foreground">•</span>
                  <span>{PROJECT_TYPE_LABELS[vote.projectType]}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(vote.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="text-muted-foreground">{vote.notes}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <section id="stats" className="section-container py-10 md:py-20 bg-muted/30">
      <div className={`space-y-6 md:space-y-8 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
        <div className="text-center space-y-4 max-w-3xl mx-auto px-4">
          <div className="chip bg-primary/10 text-primary mx-auto">Insights</div>
          <h2 className="text-2xl md:text-4xl font-bold">Genre Preferences</h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Explore real-time statistics on audience preferences across different film industries,
            project types, and countries. These insights help filmmakers make data-driven decisions
            for their next projects.
          </p>
        </div>
        
        <div className="glass rounded-xl p-4 md:p-8 mx-4 md:mx-0">
          {renderFilterControls()}
          
          <div className="mb-6">{renderChart()}</div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2 border-t mt-6 pt-4">
            <div className="flex flex-wrap gap-2">
              <button
                className="px-3 py-2 bg-secondary text-secondary-foreground rounded-lg flex items-center gap-2 hover:bg-secondary/80 transition-all text-sm"
                onClick={() => setShowNotes(!showNotes)}
              >
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">{showNotes ? "Hide" : "Show"} Comments</span>
                <span className="sm:hidden">{showNotes ? "Hide" : "Show"}</span>
              </button>
              
              <AppSocialShare variant="button" showStats={true} />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                className="px-3 py-2 bg-secondary text-secondary-foreground rounded-lg flex items-center gap-2 hover:bg-secondary/80 transition-all text-sm"
                onClick={() => {
                  const data = chartData.map(item => ({
                    Genre: item.name,
                    Votes: item.value,
                    FilterType: filterMode.charAt(0).toUpperCase() + filterMode.slice(1),
                    FilterValue: filterMode === "industry" 
                      ? selectedIndustry 
                      : filterMode === "projectType" 
                      ? PROJECT_TYPE_LABELS[selectedProjectType]
                      : selectedCountry
                  }));
                  
                  const worksheet = XLSX.utils.json_to_sheet(data);
                  const workbook = XLSX.utils.book_new();
                  XLSX.utils.book_append_sheet(workbook, worksheet, "Movie Preferences");
                  XLSX.writeFile(workbook, `MoviePulse_Stats.xlsx`);
                  
                  toast({
                    title: "Download successful",
                    description: "Data exported to Excel format.",
                  });
                }}
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span className="hidden sm:inline">Excel</span>
              </button>
            </div>
          </div>
          
          {showNotes && userNotes.length > 0 && (
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold">User Comments & Insights</h3>
              <div className="space-y-4 max-h-[300px] md:max-h-[400px] overflow-y-auto pr-2">
                {userNotes.map((vote) => (
                  <div key={vote.id} className="p-3 md:p-4 rounded-lg border bg-card">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                      <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-medium">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span>{vote.genre}</span>
                        <span className="text-muted-foreground">•</span>
                        <span>{vote.filmIndustry}</span>
                        <span className="text-muted-foreground">•</span>
                        <span>{PROJECT_TYPE_LABELS[vote.projectType]}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(vote.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">{vote.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="text-center max-w-2xl mx-auto px-4">
          <h3 className="text-lg md:text-xl font-semibold mb-4">For Filmmakers & Producers</h3>
          <p className="text-muted-foreground mb-4 text-sm md:text-base">
            These statistics provide valuable insights for your next film project. By aligning your creative vision with audience preferences, 
            you can increase the likelihood of creating content that resonates with viewers.
          </p>
          <p className="text-muted-foreground text-sm md:text-base">
            Whether you're making a high-budget blockbuster, a low-budget indie film, a short film, or YouTube content,
            understanding genre preferences can help guide your creative decisions and potentially improve commercial success.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
