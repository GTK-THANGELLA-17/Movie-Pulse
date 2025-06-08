import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, Share2, FileSpreadsheet, FileText, RefreshCw } from "lucide-react";
import { 
  getFilteredVoteStats,
  COUNTRIES,
  FILM_INDUSTRIES,
  OTT_PLATFORMS,
  YOUTUBE_CONTENT_CATEGORIES,
  PROJECT_TYPE_LABELS
} from "@/lib/data";
import { Country, FilmIndustry, OTTPlatform, YouTubeContentCategory } from "@/lib/types";
import SummaryCards from "@/components/stats/SummaryCards";
import DemographicStats from "@/components/stats/DemographicStats";
import StatsCharts from "@/components/stats/StatsCharts";
import AppSocialShare from "@/components/AppSocialShare";
import * as XLSX from 'xlsx';
import { useToast } from "@/hooks/use-toast";

interface StatsContainerProps {
  activeSection: string;
}

const StatsContainer = ({ activeSection }: StatsContainerProps) => {
  const { toast } = useToast();
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | "all">("all");
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [selectedAge, setSelectedAge] = useState<string>("all");
  const [selectedFilmIndustry, setSelectedFilmIndustry] = useState<FilmIndustry | "all">("all");
  const [selectedOttPlatform, setSelectedOttPlatform] = useState<OTTPlatform | "all">("all");
  const [selectedYoutubeCategory, setSelectedYoutubeCategory] = useState<YouTubeContentCategory | "all">("all");
  const [selectedProjectType, setSelectedProjectType] = useState<string>("all");
  const [selectedTvChannel, setSelectedTvChannel] = useState<string>("all");
  const [dateRange, setDateRange] = useState<string>("all");

  // TV Channels list - you may want to expand this based on your data
  const TV_CHANNELS = [
    "Star Plus", "Colors", "Sony TV", "Zee TV", "Star Bharat", "Colors Rishtey",
    "Sony SAB", "And TV", "Star Utsav", "Zee Anmol", "Colors Cineplex",
    "Sony MAX", "Star Gold", "Zee Cinema", "Colors Infinity", "Sony PIX",
    "National Geographic", "Discovery Channel", "History TV18", "Animal Planet",
    "CNN", "BBC", "NDTV", "Times Now", "Republic TV", "Aaj Tak",
    "MTV", "Channel V", "9XM", "Zoom", "E24", "VH1"
  ];

  const loadStats = async () => {
    console.log('Loading stats for section:', activeSection);
    console.log('Filters:', { 
      selectedCountry, selectedGender, selectedAge, selectedFilmIndustry, 
      selectedOttPlatform, selectedYoutubeCategory, selectedProjectType, 
      selectedTvChannel, dateRange 
    });
    
    setIsLoading(true);
    
    try {
      const filters: any = {};
      
      // Map activeSection to projectType filter
      switch (activeSection) {
        case "films":
          filters.projectType = "Films";
          break;
        case "youtube-films":
          filters.projectType = "YouTubeFilm";
          break;
        case "youtube-content":
          filters.projectType = "YouTubeContent";
          break;
        case "ott":
          filters.projectType = "OTTPlatform";
          break;
        case "television":
          filters.projectType = "Television";
          break;
      }
      
      // Apply additional filters
      if (selectedCountry !== "all") filters.country = selectedCountry;
      if (selectedGender !== "all") filters.gender = selectedGender;
      if (selectedAge !== "all") filters.ageGroup = selectedAge;
      if (selectedFilmIndustry !== "all") filters.filmIndustry = selectedFilmIndustry;
      if (selectedOttPlatform !== "all") filters.ottPlatform = selectedOttPlatform;
      if (selectedYoutubeCategory !== "all") filters.youtubeContentCategory = selectedYoutubeCategory;
      if (selectedProjectType !== "all") filters.specificProjectType = selectedProjectType;
      if (selectedTvChannel !== "all") filters.televisionChannel = selectedTvChannel;

      // Date range filtering
      if (dateRange !== "all") {
        const now = new Date();
        const start = new Date();
        
        switch(dateRange) {
          case "day":
            start.setDate(now.getDate() - 1);
            break;
          case "week":
            start.setDate(now.getDate() - 7);
            break;
          case "month":
            start.setMonth(now.getMonth() - 1);
            break;
          case "year":
            start.setFullYear(now.getFullYear() - 1);
            break;
        }
        
        filters.dateRange = { start, end: now };
      }

      const filteredStats = getFilteredVoteStats(filters);
      console.log('Final stats for section:', activeSection, filteredStats);
      setStats(filteredStats);
      
      // Show success message if refreshing
      if (isRefreshing) {
        toast({
          title: "Statistics Updated",
          description: "Latest data has been loaded successfully.",
        });
        setIsRefreshing(false);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
      toast({
        title: "Error Loading Statistics",
        description: "Failed to load the latest statistics. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadStats();
  };

  const handleDownload = (format: 'excel' | 'word' | 'text') => {
    if (!stats || stats.total === 0) {
      toast({
        title: "No data to export",
        description: "There's no data available for the selected filters.",
        variant: "destructive"
      });
      return;
    }

    const sectionName = getSectionDisplayName();
    const currentDate = new Date().toLocaleDateString();
    
    // Prepare organized data for export
    const exportData = [];
    
    // Add header information
    exportData.push({
      Section: sectionName,
      'Export Date': currentDate,
      'Total Opinions': stats.total,
      'Applied Filters': getAppliedFilters(),
      Category: '',
      Name: '',
      Count: ''
    });
    
    // Add empty row for separation
    exportData.push({
      Section: '',
      'Export Date': '',
      'Total Opinions': '',
      'Applied Filters': '',
      Category: '',
      Name: '',
      Count: ''
    });
    
    // Add content type data
    if (stats.byProjectType && Object.keys(stats.byProjectType).length > 0) {
      exportData.push({
        Section: '',
        'Export Date': '',
        'Total Opinions': '',
        'Applied Filters': '',
        Category: 'CONTENT TYPE BREAKDOWN',
        Name: '',
        Count: ''
      });
      
      Object.entries(stats.byProjectType).forEach(([type, count]) => {
        exportData.push({
          Section: '',
          'Export Date': '',
          'Total Opinions': '',
          'Applied Filters': '',
          Category: 'Content Type',
          Name: type,
          Count: count
        });
      });
    }
    
    // Add genre data
    if (stats.byGenre && Object.keys(stats.byGenre).length > 0) {
      exportData.push({
        Section: '',
        'Export Date': '',
        'Total Opinions': '',
        'Applied Filters': '',
        Category: 'GENRE BREAKDOWN',
        Name: '',
        Count: ''
      });
      
      Object.entries(stats.byGenre).forEach(([genre, count]) => {
        exportData.push({
          Section: '',
          'Export Date': '',
          'Total Opinions': '',
          'Applied Filters': '',
          Category: 'Genre',
          Name: genre,
          Count: count
        });
      });
    }
    
    // Add country data
    if (stats.byCountry && Object.keys(stats.byCountry).length > 0) {
      exportData.push({
        Section: '',
        'Export Date': '',
        'Total Opinions': '',
        'Applied Filters': '',
        Category: 'COUNTRY BREAKDOWN',
        Name: '',
        Count: ''
      });
      
      Object.entries(stats.byCountry).forEach(([country, count]) => {
        exportData.push({
          Section: '',
          'Export Date': '',
          'Total Opinions': '',
          'Applied Filters': '',
          Category: 'Country',
          Name: country,
          Count: count
        });
      });
    }

    const filename = `MoviePulse_${sectionName.replace(/\s+/g, '_')}_Stats_${new Date().toISOString().split('T')[0]}`;

    switch (format) {
      case 'excel':
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, sectionName);
        XLSX.writeFile(workbook, `${filename}.xlsx`);
        break;
        
      case 'word':
        let html = `
          <h1>MoviePulse ${sectionName} Statistics</h1>
          <p><strong>Export Date:</strong> ${currentDate}</p>
          <p><strong>Total Opinions:</strong> ${stats.total}</p>
          <p><strong>Applied Filters:</strong> ${getAppliedFilters()}</p>
          <hr/>
          <table border="1" cellpadding="5" cellspacing="0" style="width:100%; border-collapse: collapse;">
            <tr style="background-color: #f0f0f0;">
              <th>Category</th>
              <th>Name</th>
              <th>Opinion Count</th>
            </tr>
        `;
        
        // Add organized data to HTML table
        if (stats.byProjectType && Object.keys(stats.byProjectType).length > 0) {
          html += '<tr><td colspan="3" style="background-color: #e0e0e0; font-weight: bold;">CONTENT TYPE BREAKDOWN</td></tr>';
          Object.entries(stats.byProjectType).forEach(([type, count]) => {
            html += `<tr><td>Content Type</td><td>${type}</td><td>${count}</td></tr>`;
          });
        }
        
        if (stats.byGenre && Object.keys(stats.byGenre).length > 0) {
          html += '<tr><td colspan="3" style="background-color: #e0e0e0; font-weight: bold;">GENRE BREAKDOWN</td></tr>';
          Object.entries(stats.byGenre).forEach(([genre, count]) => {
            html += `<tr><td>Genre</td><td>${genre}</td><td>${count}</td></tr>`;
          });
        }
        
        if (stats.byCountry && Object.keys(stats.byCountry).length > 0) {
          html += '<tr><td colspan="3" style="background-color: #e0e0e0; font-weight: bold;">COUNTRY BREAKDOWN</td></tr>';
          Object.entries(stats.byCountry).forEach(([country, count]) => {
            html += `<tr><td>Country</td><td>${country}</td><td>${count}</td></tr>`;
          });
        }
        
        html += '</table>';
        
        const blob = new Blob([html], { type: 'application/msword' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${filename}.doc`;
        link.click();
        break;
        
      case 'text':
        let text = `MoviePulse ${sectionName} Statistics\n`;
        text += `Export Date: ${currentDate}\n`;
        text += `Total Opinions: ${stats.total}\n`;
        text += `Applied Filters: ${getAppliedFilters()}\n`;
        text += `\n${'='.repeat(50)}\n\n`;
        
        if (stats.byProjectType && Object.keys(stats.byProjectType).length > 0) {
          text += 'CONTENT TYPE BREAKDOWN\n';
          text += '-'.repeat(25) + '\n';
          Object.entries(stats.byProjectType).forEach(([type, count]) => {
            text += `${type}: ${count} opinions\n`;
          });
          text += '\n';
        }
        
        if (stats.byGenre && Object.keys(stats.byGenre).length > 0) {
          text += 'GENRE BREAKDOWN\n';
          text += '-'.repeat(16) + '\n';
          Object.entries(stats.byGenre).forEach(([genre, count]) => {
            text += `${genre}: ${count} opinions\n`;
          });
          text += '\n';
        }
        
        if (stats.byCountry && Object.keys(stats.byCountry).length > 0) {
          text += 'COUNTRY BREAKDOWN\n';
          text += '-'.repeat(18) + '\n';
          Object.entries(stats.byCountry).forEach(([country, count]) => {
            text += `${country}: ${count} opinions\n`;
          });
        }
        
        const textBlob = new Blob([text], { type: 'text/plain' });
        const textLink = document.createElement('a');
        textLink.href = URL.createObjectURL(textBlob);
        textLink.download = `${filename}.txt`;
        textLink.click();
        break;
    }

    toast({
      title: "Download successful",
      description: `Data exported in ${format.toUpperCase()} format.`,
    });
  };

  const getAppliedFilters = () => {
    const filters = [];
    if (selectedCountry !== "all") filters.push(`Country: ${selectedCountry}`);
    if (selectedGender !== "all") filters.push(`Gender: ${selectedGender}`);
    if (selectedAge !== "all") filters.push(`Age: ${selectedAge}`);
    if (dateRange !== "all") filters.push(`Time: ${dateRange}`);
    return filters.length > 0 ? filters.join(', ') : 'No filters applied';
  };

  const getSectionDisplayName = () => {
    switch (activeSection) {
      case "films": return "Films";
      case "youtube-films": return "YouTube Films";
      case "youtube-content": return "YouTube Content";
      case "ott": return "OTT Platforms";
      case "television": return "Television";
      default: return activeSection;
    }
  };

  const renderSectionSpecificFilters = () => {
    switch (activeSection) {
      case "films":
        return (
          <>
            <div>
              <Label htmlFor="project-type">Project Type</Label>
              <Select value={selectedProjectType} onValueChange={setSelectedProjectType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Project Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Project Types</SelectItem>
                  <SelectItem value="HighBudgetFilm">High Budget Film</SelectItem>
                  <SelectItem value="LowBudgetFilm">Low Budget Film</SelectItem>
                  <SelectItem value="ShortFilm">Short Film</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="film-industry">Film Industry</Label>
              <Select 
                value={selectedFilmIndustry} 
                onValueChange={(value: string) => setSelectedFilmIndustry(value as FilmIndustry | "all")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Industries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {FILM_INDUSTRIES.map(industry => (
                    <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case "youtube-films":
        return (
          <>
            <div>
              <Label htmlFor="project-type">Project Type</Label>
              <Select value={selectedProjectType} onValueChange={setSelectedProjectType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Project Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Project Types</SelectItem>
                  <SelectItem value="YouTubeFilm">YouTube Film</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="film-industry">Film Industry</Label>
              <Select 
                value={selectedFilmIndustry} 
                onValueChange={(value: string) => setSelectedFilmIndustry(value as FilmIndustry | "all")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Industries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {FILM_INDUSTRIES.map(industry => (
                    <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case "youtube-content":
        return (
          <>
            <div>
              <Label htmlFor="youtube-category">YouTube Content Category</Label>
              <Select 
                value={selectedYoutubeCategory} 
                onValueChange={(value: string) => setSelectedYoutubeCategory(value as YouTubeContentCategory | "all")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {YOUTUBE_CONTENT_CATEGORIES.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="youtube-content-type">YouTube Channel Type</Label>
              <Select value={selectedProjectType} onValueChange={setSelectedProjectType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Channel Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Channel Types</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Educational">Educational</SelectItem>
                  <SelectItem value="Gaming">Gaming</SelectItem>
                  <SelectItem value="Tech Reviews">Tech Reviews</SelectItem>
                  <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="Music">Music</SelectItem>
                  <SelectItem value="Comedy">Comedy</SelectItem>
                  <SelectItem value="News">News</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Cooking">Cooking</SelectItem>
                  <SelectItem value="Travel">Travel</SelectItem>
                  <SelectItem value="Fashion">Fashion</SelectItem>
                  <SelectItem value="DIY/Crafts">DIY/Crafts</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Health & Fitness">Health & Fitness</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Art & Design">Art & Design</SelectItem>
                  <SelectItem value="Movie Reviews">Movie Reviews</SelectItem>
                  <SelectItem value="Vlogs">Vlogs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case "ott":
        return (
          <>
            <div>
              <Label htmlFor="project-type">Project Type</Label>
              <Select value={selectedProjectType} onValueChange={setSelectedProjectType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Project Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Project Types</SelectItem>
                  <SelectItem value="OTTPlatform">OTT Platform</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="film-industry">Film Industry</Label>
              <Select 
                value={selectedFilmIndustry} 
                onValueChange={(value: string) => setSelectedFilmIndustry(value as FilmIndustry | "all")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Industries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {FILM_INDUSTRIES.map(industry => (
                    <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="ott-platform">OTT Platform</Label>
              <Select 
                value={selectedOttPlatform} 
                onValueChange={(value: string) => setSelectedOttPlatform(value as OTTPlatform | "all")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Platforms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  {OTT_PLATFORMS.map(platform => (
                    <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case "television":
        return (
          <div>
            <Label htmlFor="tv-channel">TV Channel</Label>
            <Select value={selectedTvChannel} onValueChange={setSelectedTvChannel}>
              <SelectTrigger>
                <SelectValue placeholder="All TV Channels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All TV Channels</SelectItem>
                {TV_CHANNELS.map(channel => (
                  <SelectItem key={channel} value={channel}>{channel}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      default:
        return null;
    }
  };

  // Always render filters
  const renderFilters = () => (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Filter {getSectionDisplayName()} Statistics</CardTitle>
            <CardDescription>Apply filters to see specific opinion patterns in {getSectionDisplayName()}</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Standard filters */}
          <div>
            <Label htmlFor="country">Country</Label>
            <Select 
              value={selectedCountry} 
              onValueChange={(value: string) => setSelectedCountry(value as Country | "all")}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {COUNTRIES.map(country => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select value={selectedGender} onValueChange={setSelectedGender}>
              <SelectTrigger>
                <SelectValue placeholder="All Genders" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genders</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="non-binary">Non-binary</SelectItem>
                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="age">Age Group</Label>
            <Select value={selectedAge} onValueChange={setSelectedAge}>
              <SelectTrigger>
                <SelectValue placeholder="All Ages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ages</SelectItem>
                <SelectItem value="13-17">13-17</SelectItem>
                <SelectItem value="18-24">18-24</SelectItem>
                <SelectItem value="25-34">25-34</SelectItem>
                <SelectItem value="35-44">35-44</SelectItem>
                <SelectItem value="45-54">45-54</SelectItem>
                <SelectItem value="55-64">55-64</SelectItem>
                <SelectItem value="65+">65+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="date-range">Time Period</Label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="All Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="day">Last 24 Hours</SelectItem>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Section-specific filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {renderSectionSpecificFilters()}
        </div>

        {/* Mobile-optimized action buttons */}
        <div className="mt-6 space-y-4">
          {/* Stats badges */}
          <div className="flex items-center gap-4 flex-wrap">
            {stats && (
              <>
                <Badge variant="outline">Total Opinions: {stats.total}</Badge>
                <Badge variant="outline">Recent Opinions: {stats.recent}</Badge>
                <Badge variant="outline">Categories: {Object.keys(stats.byProjectType || {}).length}</Badge>
              </>
            )}
          </div>
          
          {/* Action buttons - Mobile responsive layout */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Download buttons */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload('excel')}
                className="flex items-center gap-2 flex-1 sm:flex-none"
              >
                <FileSpreadsheet className="w-4 h-4" />
                Excel
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload('word')}
                className="flex items-center gap-2 flex-1 sm:flex-none"
              >
                <FileText className="w-4 h-4" />
                Word
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload('text')}
                className="flex items-center gap-2 flex-1 sm:flex-none"
              >
                <Download className="w-4 h-4" />
                Text
              </Button>
            </div>
            
            {/* Share button - Always inside the card on mobile */}
            <div className="w-full sm:w-auto">
              <AppSocialShare variant="button" showStats={true} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  useEffect(() => {
    loadStats();
  }, [activeSection, selectedCountry, selectedGender, selectedAge, selectedFilmIndustry, 
      selectedOttPlatform, selectedYoutubeCategory, selectedProjectType, selectedTvChannel, dateRange]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {renderFilters()}
        <Card>
          <CardHeader>
            <CardTitle>Loading Statistics...</CardTitle>
            <CardDescription>Please wait while we load the data</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!stats || stats.total === 0) {
    return (
      <div className="space-y-6">
        {renderFilters()}
        <Card>
          <CardHeader>
            <CardTitle>No Data Available</CardTitle>
            <CardDescription>
              There are currently no opinions for the selected filters in {getSectionDisplayName().toLowerCase()}. 
              Try adjusting your filters or cast some opinions to see statistics.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-lg font-medium mb-2">Be the first to cast your opinion in this category!</p>
              <p>Your opinion will help shape future content preferences.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Prepare data for charts
  const projectTypeData = Object.entries(stats.byProjectType).map(([type, count]) => ({
    name: type,
    value: count as number
  }));

  const countryData = Object.entries(stats.byCountry)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 10)
    .map(([country, count]) => ({
      name: country,
      value: count as number
    }));

  const genreData = Object.entries(stats.byGenre)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 10)
    .map(([genre, count]) => ({
      name: genre,
      value: count as number
    }));

  const youtubeData = (activeSection === "youtube-content" || activeSection === "youtube-films") ? Object.entries(stats.byYoutubeCategory || {})
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 10)
    .map(([category, count]) => ({
      name: category,
      value: count as number
    })) : undefined;

  // Prepare region data from demographics
  const regionData = Object.entries(stats.byDemographics.region || {})
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 10)
    .map(([region, count]) => ({
      name: region,
      value: count as number
    }));

  return (
    <div className="space-y-6">
      {renderFilters()}

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <SummaryCards stats={stats} />
      </motion.div>

      {/* Demographics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <DemographicStats demographics={stats.byDemographics} />
      </motion.div>

      {/* Regional Distribution */}
      {regionData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Regional Distribution</CardTitle>
              <CardDescription>Opinions by cities, towns, and villages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {regionData.map((region, index) => (
                  <div key={region.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="font-medium">{region.name}</span>
                    <Badge variant="secondary">{region.value} opinions</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <StatsCharts 
          projectTypeData={projectTypeData}
          countryData={countryData}
          genreData={genreData}
          youtubeData={youtubeData}
        />
      </motion.div>
    </div>
  );
};

export default StatsContainer;
