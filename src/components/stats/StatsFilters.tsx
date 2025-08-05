
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, FileSpreadsheet, FileText, Download } from "lucide-react";
import { 
  COUNTRIES,
  FILM_INDUSTRIES,
  OTT_PLATFORMS,
  YOUTUBE_CONTENT_CATEGORIES,
  GENRES
} from "@/lib/data";
import { Country, FilmIndustry, OTTPlatform, YouTubeContentCategory, Genre } from "@/lib/types";
import AppSocialShare from "@/components/AppSocialShare";

interface StatsFiltersProps {
  selectedCountry: Country | "all";
  setSelectedCountry: (value: Country | "all") => void;
  selectedGender: string;
  setSelectedGender: (value: string) => void;
  selectedAge: string;
  setSelectedAge: (value: string) => void;
  selectedFilmIndustry: FilmIndustry | "all";
  setSelectedFilmIndustry: (value: FilmIndustry | "all") => void;
  selectedOttPlatform: OTTPlatform | "all";
  setSelectedOttPlatform: (value: OTTPlatform | "all") => void;
  selectedYoutubeCategory: YouTubeContentCategory | "all";
  setSelectedYoutubeCategory: (value: YouTubeContentCategory | "all") => void;
  selectedProjectType: string;
  setSelectedProjectType: (value: string) => void;
  selectedGenre: Genre | "all";
  setSelectedGenre: (value: Genre | "all") => void;
  selectedTvChannel: string;
  setSelectedTvChannel: (value: string) => void;
  dateRange: string;
  setDateRange: (value: string) => void;
  stats: any;
  isRefreshing: boolean;
  onRefresh: () => void;
  onDownload: (format: 'excel' | 'word' | 'text') => void;
  getAppliedFilters: () => string;
  title: string;
  description: string;
  showSectionSpecific?: boolean;
  activeSection?: string;
}

const TV_CHANNELS = [
  "Star Plus", "Colors", "Sony TV", "Zee TV", "Star Bharat", "Colors Rishtey",
  "Sony SAB", "And TV", "Star Utsav", "Zee Anmol", "Colors Cineplex",
  "Sony MAX", "Star Gold", "Zee Cinema", "Colors Infinity", "Sony PIX",
  "National Geographic", "Discovery Channel", "History TV18", "Animal Planet",
  "CNN", "BBC", "NDTV", "Times Now", "Republic TV", "Aaj Tak",
  "MTV", "Channel V", "9XM", "Zoom", "E24", "VH1"
];

const StatsFilters = ({
  selectedCountry,
  setSelectedCountry,
  selectedGender,
  setSelectedGender,
  selectedAge,
  setSelectedAge,
  selectedFilmIndustry,
  setSelectedFilmIndustry,
  selectedOttPlatform,
  setSelectedOttPlatform,
  selectedYoutubeCategory,
  setSelectedYoutubeCategory,
  selectedProjectType,
  setSelectedProjectType,
  selectedGenre,
  setSelectedGenre,
  selectedTvChannel,
  setSelectedTvChannel,
  dateRange,
  setDateRange,
  stats,
  isRefreshing,
  onRefresh,
  onDownload,
  getAppliedFilters,
  title,
  description,
  showSectionSpecific = true,
  activeSection
}: StatsFiltersProps) => {
  const renderSectionSpecificFilters = () => {
    if (!showSectionSpecific || !activeSection) return null;

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

      case "youtube-content":
        return (
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
        );

      case "ott":
        return (
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

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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
                <SelectItem value="YouTubeFilm">YouTube Film</SelectItem>
                <SelectItem value="YouTubeContent">YouTube Content</SelectItem>
                <SelectItem value="OTTPlatform">OTT Platform</SelectItem>
                <SelectItem value="Television">Television</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="genre">Genre</Label>
            <Select 
              value={selectedGenre} 
              onValueChange={(value: string) => setSelectedGenre(value as Genre | "all")}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Genres" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {GENRES.map(genre => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
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

          {renderSectionSpecificFilters()}
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-4 flex-wrap">
            {stats && (
              <>
                <Badge variant="outline">Total Opinions: {stats.total}</Badge>
                <Badge variant="outline">Recent Opinions: {stats.recent}</Badge>
                <Badge variant="outline">Categories: {Object.keys(stats.byProjectType || {}).length}</Badge>
              </>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDownload('excel')}
                className="flex items-center gap-2 flex-1 sm:flex-none"
              >
                <FileSpreadsheet className="w-4 h-4" />
                Excel
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDownload('word')}
                className="flex items-center gap-2 flex-1 sm:flex-none"
              >
                <FileText className="w-4 h-4" />
                Word
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDownload('text')}
                className="flex items-center gap-2 flex-1 sm:flex-none"
              >
                <Download className="w-4 h-4" />
                Text
              </Button>
            </div>
            
            <div className="w-full sm:w-auto">
              <AppSocialShare variant="button" showStats={true} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsFilters;
