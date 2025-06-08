import React, { useState, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Filter, Share2, FileText, FileSpreadsheet, FileType } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Vote } from "@/lib/types";
import { getVotes, COUNTRIES } from "@/lib/data";
import * as XLSX from 'xlsx';
import SocialShare from "./SocialShare";

interface FilterState {
  selectedCountry: string;
  selectedGender: string;
  selectedAge: string;
  selectedContentType: string;
  selectedGenre: string;
  selectedFilmIndustry: string;
  selectedOttPlatform: string;
  selectedYoutubeCategory: string;
  selectedYoutubeChannel: string;
  selectedTelevisionContentType: string;
  dateRange: string;
}

interface StatsData {
  total: number;
  recent: number;
  byProjectType: Record<string, number>;
  byCountry: Record<string, number>;
  byGenre: Record<string, number>;
  byFilmIndustry: Record<string, number>;
  byOttPlatform: Record<string, number>;
  byYoutubeCategory: Record<string, number>;
  byYoutubeChannel: Record<string, number>;
  byTelevisionContentType: Record<string, number>;
  byDemographics: {
    gender: Record<string, number>;
    age: Record<string, number>;
    region: Record<string, number>;
  };
}

const LocalStatsDisplay = () => {
  const [filters, setFilters] = useState<FilterState>({
    selectedCountry: "all",
    selectedGender: "all",
    selectedAge: "all",
    selectedContentType: "all",
    selectedGenre: "all",
    selectedFilmIndustry: "all",
    selectedOttPlatform: "all",
    selectedYoutubeCategory: "all",
    selectedYoutubeChannel: "all",
    selectedTelevisionContentType: "all",
    dateRange: "all"
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showShare, setShowShare] = useState(false);

  console.log("Loading local stats with filters:", filters);

  const getFilteredVoteStats = useCallback((filterOptions: Partial<FilterState> = {}): StatsData => {
    const appliedFilters = { ...filters, ...filterOptions };
    console.log("Getting filtered vote stats with filters:", appliedFilters);
    
    const allVotes = getVotes();
    console.log("All votes before filtering:", allVotes.length, allVotes);
    
    const filteredVotes = allVotes.filter((vote: Vote) => {
      if (appliedFilters.selectedCountry !== "all" && vote.country !== appliedFilters.selectedCountry) return false;
      if (appliedFilters.selectedGender !== "all" && vote.demographics?.gender !== appliedFilters.selectedGender) return false;
      if (appliedFilters.selectedContentType !== "all" && vote.projectType !== appliedFilters.selectedContentType) return false;
      if (appliedFilters.selectedGenre !== "all" && vote.genre !== appliedFilters.selectedGenre) return false;
      if (appliedFilters.selectedFilmIndustry !== "all" && vote.filmIndustry !== appliedFilters.selectedFilmIndustry) return false;
      if (appliedFilters.selectedOttPlatform !== "all" && vote.ottPlatform !== appliedFilters.selectedOttPlatform) return false;
      if (appliedFilters.selectedYoutubeCategory !== "all" && vote.youtubeContentCategory !== appliedFilters.selectedYoutubeCategory) return false;
      if (appliedFilters.selectedYoutubeChannel !== "all" && vote.youtubeChannelType !== appliedFilters.selectedYoutubeChannel) return false;
      if (appliedFilters.selectedTelevisionContentType !== "all" && vote.televisionContentType !== appliedFilters.selectedTelevisionContentType) return false;
      
      if (appliedFilters.selectedAge !== "all") {
        const ageGroup = vote.demographics?.age;
        if (typeof ageGroup === 'number') {
          const ageStr = ageGroup < 18 ? "13-17" : 
                        ageGroup < 25 ? "18-24" :
                        ageGroup < 35 ? "25-34" :
                        ageGroup < 45 ? "35-44" :
                        ageGroup < 55 ? "45-54" :
                        ageGroup < 65 ? "55-64" : "65+";
          if (ageStr !== appliedFilters.selectedAge) return false;
        }
      }
      
      if (appliedFilters.dateRange !== "all") {
        const voteDate = new Date(vote.timestamp);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - voteDate.getTime()) / (1000 * 60 * 60 * 24));
        
        switch (appliedFilters.dateRange) {
          case "week":
            if (daysDiff > 7) return false;
            break;
          case "month":
            if (daysDiff > 30) return false;
            break;
          case "year":
            if (daysDiff > 365) return false;
            break;
        }
      }
      
      return true;
    });
    
    console.log("Final filtered votes:", filteredVotes.length);
    
    // Calculate stats
    const stats: StatsData = {
      total: filteredVotes.length,
      recent: filteredVotes.filter(vote => {
        const voteDate = new Date(vote.timestamp);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return voteDate >= weekAgo;
      }).length,
      byProjectType: {},
      byCountry: {},
      byGenre: {},
      byFilmIndustry: {},
      byOttPlatform: {},
      byYoutubeCategory: {},
      byYoutubeChannel: {},
      byTelevisionContentType: {},
      byDemographics: {
        gender: {},
        age: {},
        region: {}
      }
    };

    filteredVotes.forEach((vote: Vote) => {
      // Project type
      stats.byProjectType[vote.projectType] = (stats.byProjectType[vote.projectType] || 0) + 1;
      
      // Country
      if (vote.country) {
        stats.byCountry[vote.country] = (stats.byCountry[vote.country] || 0) + 1;
      }
      
      // Genre
      if (vote.genre) {
        stats.byGenre[vote.genre] = (stats.byGenre[vote.genre] || 0) + 1;
      }
      
      // Film Industry
      if (vote.filmIndustry) {
        stats.byFilmIndustry[vote.filmIndustry] = (stats.byFilmIndustry[vote.filmIndustry] || 0) + 1;
      }
      
      // OTT Platform
      if (vote.ottPlatform) {
        stats.byOttPlatform[vote.ottPlatform] = (stats.byOttPlatform[vote.ottPlatform] || 0) + 1;
      }
      
      // YouTube Category
      if (vote.youtubeContentCategory) {
        stats.byYoutubeCategory[vote.youtubeContentCategory] = (stats.byYoutubeCategory[vote.youtubeContentCategory] || 0) + 1;
      }
      
      // YouTube Channel
      if (vote.youtubeChannelType) {
        stats.byYoutubeChannel[vote.youtubeChannelType] = (stats.byYoutubeChannel[vote.youtubeChannelType] || 0) + 1;
      }
      
      // Television Content Type
      if (vote.televisionContentType) {
        stats.byTelevisionContentType[vote.televisionContentType] = (stats.byTelevisionContentType[vote.televisionContentType] || 0) + 1;
      }
      
      // Demographics
      if (vote.demographics) {
        if (vote.demographics.gender) {
          stats.byDemographics.gender[vote.demographics.gender] = (stats.byDemographics.gender[vote.demographics.gender] || 0) + 1;
        }
        
        if (vote.demographics.age) {
          const ageGroup = typeof vote.demographics.age === 'number' 
            ? (vote.demographics.age < 18 ? "13-17" : 
               vote.demographics.age < 25 ? "18-24" :
               vote.demographics.age < 35 ? "25-34" :
               vote.demographics.age < 45 ? "35-44" :
               vote.demographics.age < 55 ? "45-54" :
               vote.demographics.age < 65 ? "55-64" : "65+")
            : vote.demographics.age;
          stats.byDemographics.age[ageGroup] = (stats.byDemographics.age[ageGroup] || 0) + 1;
        }
        
        if (vote.demographics.region) {
          stats.byDemographics.region[vote.demographics.region] = (stats.byDemographics.region[vote.demographics.region] || 0) + 1;
        }
      }
    });
    
    console.log("Calculated stats:", stats);
    return stats;
  }, [filters]);

  const stats = useMemo(() => getFilteredVoteStats(), [getFilteredVoteStats]);
  console.log("Filtered stats result:", stats);

  const generateExportData = () => {
    const appliedFiltersText = Object.entries(filters)
      .filter(([_, value]) => value !== "all")
      .map(([key, value]) => `${key.replace('selected', '').replace(/([A-Z])/g, ' $1').trim()}: ${value}`)
      .join(", ");

    return {
      summary: {
        title: "MoviePulse Local Statistics Export",
        exportDate: new Date().toLocaleString(),
        appliedFilters: appliedFiltersText || "No filters applied",
        totalOpinions: stats.total,
        recentOpinions: stats.recent
      },
      sections: [
        {
          title: "Content Type Distribution",
          data: Object.entries(stats.byProjectType).map(([type, count]) => ({
            "Content Type": type,
            "Number of Opinions": count,
            "Percentage": `${((count / stats.total) * 100).toFixed(1)}%`
          }))
        },
        {
          title: "Country Distribution", 
          data: Object.entries(stats.byCountry).map(([country, count]) => ({
            "Country": country,
            "Number of Opinions": count,
            "Percentage": `${((count / stats.total) * 100).toFixed(1)}%`
          }))
        },
        {
          title: "Gender Distribution",
          data: Object.entries(stats.byDemographics.gender).map(([gender, count]) => ({
            "Gender": gender,
            "Number of Opinions": count, 
            "Percentage": `${((count / stats.total) * 100).toFixed(1)}%`
          }))
        },
        {
          title: "Age Group Distribution",
          data: Object.entries(stats.byDemographics.age).map(([age, count]) => ({
            "Age Group": age,
            "Number of Opinions": count,
            "Percentage": `${((count / stats.total) * 100).toFixed(1)}%`
          }))
        },
        {
          title: "Genre Preferences",
          data: Object.entries(stats.byGenre).map(([genre, count]) => ({
            "Genre": genre,
            "Number of Opinions": count,
            "Percentage": `${((count / stats.total) * 100).toFixed(1)}%`
          }))
        },
        {
          title: "Film Industry Preferences", 
          data: Object.entries(stats.byFilmIndustry).map(([industry, count]) => ({
            "Film Industry": industry,
            "Number of Opinions": count,
            "Percentage": `${((count / stats.total) * 100).toFixed(1)}%`
          }))
        },
        {
          title: "OTT Platform Preferences",
          data: Object.entries(stats.byOttPlatform).map(([platform, count]) => ({
            "OTT Platform": platform,
            "Number of Opinions": count,
            "Percentage": `${((count / stats.total) * 100).toFixed(1)}%`
          }))
        },
        {
          title: "YouTube Content Categories",
          data: Object.entries(stats.byYoutubeCategory).map(([category, count]) => ({
            "YouTube Category": category,
            "Number of Opinions": count,
            "Percentage": `${((count / stats.total) * 100).toFixed(1)}%`
          }))
        },
        {
          title: "Television Content Types",
          data: Object.entries(stats.byTelevisionContentType).map(([type, count]) => ({
            "Television Content Type": type,
            "Number of Opinions": count,
            "Percentage": `${((count / stats.total) * 100).toFixed(1)}%`
          }))
        },
        {
          title: "Regional Distribution",
          data: Object.entries(stats.byDemographics.region).map(([region, count]) => ({
            "Region": region,
            "Number of Opinions": count,
            "Percentage": `${((count / stats.total) * 100).toFixed(1)}%`
          }))
        }
      ].filter(section => section.data.length > 0)
    };
  };

  const exportToExcel = () => {
    const exportData = generateExportData();
    const wb = XLSX.utils.book_new();
    
    // Summary sheet
    const summaryData = [
      ["MoviePulse Local Statistics Export"],
      [""],
      ["Export Date", exportData.summary.exportDate],
      ["Applied Filters", exportData.summary.appliedFilters],
      ["Total Opinions", exportData.summary.totalOpinions],
      ["Recent Opinions (Last 7 Days)", exportData.summary.recentOpinions],
      [""]
    ];
    
    const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, summaryWs, "Summary");
    
    // Data sheets
    exportData.sections.forEach(section => {
      if (section.data.length > 0) {
        const ws = XLSX.utils.json_to_sheet(section.data);
        XLSX.utils.book_append_sheet(wb, ws, section.title.substring(0, 31));
      }
    });
    
    XLSX.writeFile(wb, `moviepulse_local_stats_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const exportToWord = () => {
    const exportData = generateExportData();
    let content = `MoviePulse Local Statistics Export\n\n`;
    content += `Export Date: ${exportData.summary.exportDate}\n`;
    content += `Applied Filters: ${exportData.summary.appliedFilters}\n`;
    content += `Total Opinions: ${exportData.summary.totalOpinions}\n`;
    content += `Recent Opinions (Last 7 Days): ${exportData.summary.recentOpinions}\n\n`;
    
    exportData.sections.forEach(section => {
      content += `${section.title}\n`;
      content += "=".repeat(section.title.length) + "\n\n";
      
      section.data.forEach(item => {
        Object.entries(item).forEach(([key, value]) => {
          content += `${key}: ${value}\n`;
        });
        content += "\n";
      });
      content += "\n";
    });
    
    const blob = new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `moviepulse_local_stats_${new Date().toISOString().split('T')[0]}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportToText = () => {
    const exportData = generateExportData();
    let content = `MOVIEPULSE LOCAL STATISTICS EXPORT\n`;
    content += "=".repeat(40) + "\n\n";
    content += `Export Date: ${exportData.summary.exportDate}\n`;
    content += `Applied Filters: ${exportData.summary.appliedFilters}\n`;
    content += `Total Opinions: ${exportData.summary.totalOpinions}\n`;
    content += `Recent Opinions (Last 7 Days): ${exportData.summary.recentOpinions}\n\n`;
    
    exportData.sections.forEach(section => {
      content += `${section.title.toUpperCase()}\n`;
      content += "-".repeat(section.title.length) + "\n";
      
      section.data.forEach(item => {
        Object.entries(item).forEach(([key, value]) => {
          content += `  ${key}: ${value}\n`;
        });
        content += "\n";
      });
      content += "\n";
    });
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `moviepulse_local_stats_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getUniqueValues = (field: string) => {
    const allVotes = getVotes();
    const values = new Set<string>();
    
    allVotes.forEach((vote: Vote) => {
      let value;
      switch (field) {
        case 'country':
          value = vote.country;
          break;
        case 'gender':
          value = vote.demographics?.gender;
          break;
        case 'contentType':
          value = vote.projectType;
          break;
        case 'genre':
          value = vote.genre;
          break;
        case 'filmIndustry':
          value = vote.filmIndustry;
          break;
        case 'ottPlatform':
          value = vote.ottPlatform;
          break;
        case 'youtubeCategory':
          value = vote.youtubeContentCategory;
          break;
        case 'youtubeChannel':
          value = vote.youtubeChannelType;
          break;
        case 'televisionContentType':
          value = vote.televisionContentType;
          break;
        default:
          return;
      }
      if (value) values.add(value);
    });
    
    return Array.from(values).sort();
  };

  // Get predefined options that match the voting form
  const getContentTypeOptions = () => ["Films", "YouTubeFilm", "YouTubeContent", "OTTPlatform", "Television"];
  const getGenderOptions = () => ["male", "female", "non-binary", "prefer-not-to-say"];
  const getGenreOptions = () => ["Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "History", "Horror", "Music", "Mystery", "Romance", "Sci-Fi", "Sport", "Thriller", "War", "Western"];
  const getFilmIndustryOptions = () => ["Hollywood", "Bollywood", "Tollywood", "Kollywood", "Sandalwood", "Mollywood", "Marathi Cinema", "Bengali Cinema", "Punjabi Cinema", "Korean Cinema", "Japanese Cinema", "Chinese Cinema", "French Cinema", "Spanish Cinema", "Italian Cinema", "German Cinema", "Russian Cinema", "Other"];
  const getOttPlatformOptions = () => ["Netflix", "Amazon Prime Video", "Disney+", "Hotstar", "HBO Max", "Hulu", "Apple TV+", "Paramount+", "Peacock", "Sony LIV", "Zee5", "Voot", "MX Player", "ALTBalaji", "Eros Now", "Shemaroo", "YouTube Premium", "Other"];
  const getYoutubeCategoryOptions = () => ["Gaming", "Music", "Comedy", "Education", "Technology", "Lifestyle", "Beauty & Fashion", "Food & Cooking", "Travel", "Sports", "News & Politics", "Entertainment", "Science", "How-to & DIY", "Vlogs", "Reviews", "Animation", "Kids Content", "Health & Fitness", "Business", "Art & Crafts", "Other"];
  const getYoutubeChannelOptions = () => ["Individual Creator", "Brand/Company", "Media House", "Educational Institution", "Non-Profit Organization", "Government", "Music Label", "Gaming Company", "Tech Company", "Entertainment Company", "News Channel", "Sports Organization", "Other"];
  const getTelevisionContentOptions = () => ["Drama Series", "Comedy Series", "Reality Shows", "Talk Shows", "News Programs", "Sports Programs", "Documentary Series", "Game Shows", "Variety Shows", "Kids Shows", "Soap Operas", "Mini Series", "Award Shows", "Music Shows", "Educational Programs", "Other"];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Filter Local Statistics</span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Apply filters to see specific opinion patterns
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 border rounded-lg p-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Content Type</label>
                  <Select
                    value={filters.selectedContentType}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, selectedContentType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Content Types" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border shadow-lg z-50">
                      <SelectItem value="all">All Content Types</SelectItem>
                      {getContentTypeOptions().map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Country</label>
                  <Select
                    value={filters.selectedCountry}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, selectedCountry: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Countries" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border shadow-lg z-50">
                      <SelectItem value="all">All Countries</SelectItem>
                      {COUNTRIES.map(country => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Gender</label>
                  <Select
                    value={filters.selectedGender}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, selectedGender: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Genders" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border shadow-lg z-50">
                      <SelectItem value="all">All Genders</SelectItem>
                      {getGenderOptions().map(gender => (
                        <SelectItem key={gender} value={gender}>
                          {gender === 'prefer-not-to-say' ? 'Prefer not to say' : 
                           gender === 'non-binary' ? 'Non-binary' : 
                           gender.charAt(0).toUpperCase() + gender.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Age Group</label>
                  <Select
                    value={filters.selectedAge}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, selectedAge: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Ages" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border shadow-lg z-50">
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
                  <label className="block text-sm font-medium mb-2">Genre</label>
                  <Select
                    value={filters.selectedGenre}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, selectedGenre: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Genres" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border shadow-lg z-50">
                      <SelectItem value="all">All Genres</SelectItem>
                      {getGenreOptions().map(genre => (
                        <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Film Industry</label>
                  <Select
                    value={filters.selectedFilmIndustry}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, selectedFilmIndustry: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Film Industries" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border shadow-lg z-50">
                      <SelectItem value="all">All Film Industries</SelectItem>
                      {getFilmIndustryOptions().map(industry => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">OTT Platform</label>
                  <Select
                    value={filters.selectedOttPlatform}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, selectedOttPlatform: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All OTT Platforms" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border shadow-lg z-50">
                      <SelectItem value="all">All OTT Platforms</SelectItem>
                      {getOttPlatformOptions().map(platform => (
                        <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">YouTube Category</label>
                  <Select
                    value={filters.selectedYoutubeCategory}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, selectedYoutubeCategory: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All YouTube Categories" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border shadow-lg z-50">
                      <SelectItem value="all">All YouTube Categories</SelectItem>
                      {getYoutubeCategoryOptions().map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">YouTube Channel Type</label>
                  <Select
                    value={filters.selectedYoutubeChannel}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, selectedYoutubeChannel: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Channel Types" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border shadow-lg z-50">
                      <SelectItem value="all">All Channel Types</SelectItem>
                      {getYoutubeChannelOptions().map(channel => (
                        <SelectItem key={channel} value={channel}>{channel}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Television Content Type</label>
                  <Select
                    value={filters.selectedTelevisionContentType}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, selectedTelevisionContentType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All TV Content Types" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border shadow-lg z-50">
                      <SelectItem value="all">All TV Content Types</SelectItem>
                      {getTelevisionContentOptions().map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Time Period</label>
                  <Select
                    value={filters.dateRange}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Time" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border shadow-lg z-50">
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="week">Last Week</SelectItem>
                      <SelectItem value="month">Last Month</SelectItem>
                      <SelectItem value="year">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-between items-center">
                <Button
                  variant="outline"
                  onClick={() => setFilters({
                    selectedCountry: "all",
                    selectedGender: "all", 
                    selectedAge: "all",
                    selectedContentType: "all",
                    selectedGenre: "all",
                    selectedFilmIndustry: "all",
                    selectedOttPlatform: "all",
                    selectedYoutubeCategory: "all",
                    selectedYoutubeChannel: "all",
                    selectedTelevisionContentType: "all",
                    dateRange: "all"
                  })}
                >
                  Clear Filters
                </Button>
                
                {/* Share button moved closer to the filters */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowShare(!showShare)}
                  className="flex items-center gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  {showShare ? "Hide Share" : "Share"}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Share Section - Appears right after filters when Share is clicked */}
        <AnimatePresence>
          {showShare && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border rounded-lg p-4"
            >
              <h3 className="text-lg font-semibold mb-4">Share These Statistics</h3>
              <div className="w-full">
                <SocialShare 
                  url={window.location.href}
                  title="MoviePulse Local Statistics"
                  description={`Check out these local entertainment statistics: ${stats.total} total opinions analyzed`}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Statistics Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Summary</h3>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm">Total Opinions: <span className="font-semibold">{stats.total}</span></p>
              <p className="text-sm">Recent (Last 7 Days): <span className="font-semibold">{stats.recent}</span></p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Export Options</h3>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm" onClick={exportToExcel} className="flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                Excel
              </Button>
              <Button variant="outline" size="sm" onClick={exportToWord} className="flex items-center gap-2">
                <FileType className="h-4 w-4" />
                Word
              </Button>
              <Button variant="outline" size="sm" onClick={exportToText} className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Text
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics Sections */}
        {Object.keys(stats.byProjectType).length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Content Type Distribution</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(stats.byProjectType).map(([type, count]) => (
                <div key={type} className="bg-muted p-3 rounded-lg">
                  <p className="font-medium">{type}</p>
                  <p className="text-sm text-muted-foreground">{count} opinions ({((count / stats.total) * 100).toFixed(1)}%)</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {Object.keys(stats.byCountry).length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Country Distribution</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(stats.byCountry).map(([country, count]) => (
                <div key={country} className="bg-muted p-3 rounded-lg">
                  <p className="font-medium">{country}</p>
                  <p className="text-sm text-muted-foreground">{count} opinions ({((count / stats.total) * 100).toFixed(1)}%)</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {Object.keys(stats.byGenre).length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Genre Distribution</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(stats.byGenre).map(([genre, count]) => (
                <div key={genre} className="bg-muted p-3 rounded-lg">
                  <p className="font-medium">{genre}</p>
                  <p className="text-sm text-muted-foreground">{count} opinions ({((count / stats.total) * 100).toFixed(1)}%)</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {Object.keys(stats.byDemographics.gender).length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Gender Distribution</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(stats.byDemographics.gender).map(([gender, count]) => (
                <div key={gender} className="bg-muted p-3 rounded-lg">
                  <p className="font-medium">{gender}</p>
                  <p className="text-sm text-muted-foreground">{count} opinions ({((count / stats.total) * 100).toFixed(1)}%)</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {Object.keys(stats.byDemographics.age).length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Age Group Distribution</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(stats.byDemographics.age).map(([age, count]) => (
                <div key={age} className="bg-muted p-3 rounded-lg">
                  <p className="font-medium">{age}</p>
                  <p className="text-sm text-muted-foreground">{count} opinions ({((count / stats.total) * 100).toFixed(1)}%)</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LocalStatsDisplay;
