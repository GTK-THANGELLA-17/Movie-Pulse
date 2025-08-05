
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Download, X } from "lucide-react";
import { Country, FilmIndustry, OTTPlatform, YouTubeContentCategory, Genre } from "@/lib/types";
import { ProcessedStats } from "@/types/stats";

interface LocalStatsFiltersProps {
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
  stats: ProcessedStats | null;
  isRefreshing: boolean;
  onRefresh: () => void;
  onDownload: (format: 'excel' | 'word' | 'text') => void;
  getAppliedFilters: () => string;
  title?: string;
  description?: string;
  showSectionSpecific?: boolean;
  activeSection?: string;
}

const LocalStatsFilters: React.FC<LocalStatsFiltersProps> = ({
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
  title = "Statistics Filters",
  description = "Filter and analyze data",
  showSectionSpecific = false,
  activeSection = "local"
}) => {
  // Safe access to stats with null checks
  const countries = stats?.byCountry ? Object.keys(stats.byCountry) : [];
  const genders = stats?.byDemographics?.gender ? Object.keys(stats.byDemographics.gender) : [];
  const ages = stats?.byDemographics?.age ? Object.keys(stats.byDemographics.age) : [];
  const filmIndustries = stats?.byFilmIndustry ? Object.keys(stats.byFilmIndustry) : [];
  const ottPlatforms = stats?.byOttPlatform ? Object.keys(stats.byOttPlatform) : [];
  const youtubeCategories = stats?.byYoutubeCategory ? Object.keys(stats.byYoutubeCategory) : [];
  const projectTypes = stats?.byProjectType ? Object.keys(stats.byProjectType) : [];
  const genres = stats?.byGenre ? Object.keys(stats.byGenre) : [];
  const tvChannels = stats?.byTvChannel ? Object.keys(stats.byTvChannel) : [];

  const resetAllFilters = () => {
    setSelectedCountry("all");
    setSelectedGender("all");
    setSelectedAge("all");
    setSelectedFilmIndustry("all");
    setSelectedOttPlatform("all");
    setSelectedYoutubeCategory("all");
    setSelectedProjectType("all");
    setSelectedGenre("all");
    setSelectedTvChannel("all");
    setDateRange("all");
  };

  const appliedFilters = getAppliedFilters();
  const hasFilters = appliedFilters !== 'No filters applied';

  return (
    <Card className="w-full mb-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-800">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {title}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={onRefresh}
              disabled={isRefreshing}
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
            
            <Select onValueChange={(format: 'excel' | 'word' | 'text') => onDownload(format)}>
              <SelectTrigger className="w-32">
                <Download className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Export" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="word">Word</SelectItem>
                <SelectItem value="text">Text</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Applied Filters Display */}
        {hasFilters && (
          <div className="flex flex-wrap items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Active Filters:</span>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
              {appliedFilters}
            </Badge>
            <Button
              onClick={resetAllFilters}
              size="sm"
              variant="ghost"
              className="ml-auto text-blue-600 hover:text-blue-800 hover:bg-blue-100"
            >
              <X className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          </div>
        )}

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Country Filter */}
          {countries.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country} ({stats?.byCountry?.[country] || 0})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Gender Filter */}
          {genders.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
              <Select value={selectedGender} onValueChange={setSelectedGender}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  {genders.map((gender) => (
                    <SelectItem key={gender} value={gender}>
                      {gender} ({stats?.byDemographics?.gender?.[gender] || 0})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Age Filter */}
          {ages.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Age Group</label>
              <Select value={selectedAge} onValueChange={setSelectedAge}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Age" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ages</SelectItem>
                  {ages.map((age) => (
                    <SelectItem key={age} value={age}>
                      {age} ({stats?.byDemographics?.age?.[age] || 0})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Project Type Filter */}
          {projectTypes.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Project Type</label>
              <Select value={selectedProjectType} onValueChange={setSelectedProjectType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {projectTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type} ({stats?.byProjectType?.[type] || 0})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Section-specific filters */}
          {showSectionSpecific && (
            <>
              {/* Film Industry Filter */}
              {filmIndustries.length > 0 && (activeSection === 'films' || activeSection === 'local') && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Film Industry</label>
                  <Select value={selectedFilmIndustry} onValueChange={setSelectedFilmIndustry}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      {filmIndustries.map((industry) => (
                        <SelectItem key={industry} value={industry as FilmIndustry}>
                          {industry} ({stats?.byFilmIndustry?.[industry] || 0})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* OTT Platform Filter */}
              {ottPlatforms.length > 0 && (activeSection === 'ott' || activeSection === 'local') && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">OTT Platform</label>
                  <Select value={selectedOttPlatform} onValueChange={setSelectedOttPlatform}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Platforms</SelectItem>
                      {ottPlatforms.map((platform) => (
                        <SelectItem key={platform} value={platform as OTTPlatform}>
                          {platform} ({stats?.byOttPlatform?.[platform] || 0})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* YouTube Category Filter */}
              {youtubeCategories.length > 0 && (activeSection === 'youtube-content' || activeSection === 'local') && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">YouTube Category</label>
                  <Select value={selectedYoutubeCategory} onValueChange={setSelectedYoutubeCategory}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {youtubeCategories.map((category) => (
                        <SelectItem key={category} value={category as YouTubeContentCategory}>
                          {category} ({stats?.byYoutubeCategory?.[category] || 0})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* TV Channel Filter */}
              {tvChannels.length > 0 && (activeSection === 'television' || activeSection === 'local') && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">TV Channel</label>
                  <Select value={selectedTvChannel} onValueChange={setSelectedTvChannel}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Channel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Channels</SelectItem>
                      {tvChannels.map((channel) => (
                        <SelectItem key={channel} value={channel}>
                          {channel} ({stats?.byTvChannel?.[channel] || 0})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Genre Filter */}
              {genres.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Genre</label>
                  <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Genres</SelectItem>
                      {genres.map((genre) => (
                        <SelectItem key={genre} value={genre as Genre}>
                          {genre} ({stats?.byGenre?.[genre] || 0})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </>
          )}

          {/* Time Range Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Time Period</label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Summary */}
        {stats && (
          <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Total Opinions:</span> {stats.total.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Recent Activity:</span> {stats.recent.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Countries:</span> {Object.keys(stats.byCountry || {}).length}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LocalStatsFilters;
