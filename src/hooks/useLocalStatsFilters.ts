
import { useState } from "react";
import { Country, FilmIndustry, OTTPlatform, YouTubeContentCategory, Genre } from "@/lib/types";

export const useLocalStatsFilters = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | "all">("all");
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [selectedAge, setSelectedAge] = useState<string>("all");
  const [selectedFilmIndustry, setSelectedFilmIndustry] = useState<FilmIndustry | "all">("all");
  const [selectedOttPlatform, setSelectedOttPlatform] = useState<OTTPlatform | "all">("all");
  const [selectedYoutubeCategory, setSelectedYoutubeCategory] = useState<YouTubeContentCategory | "all">("all");
  const [selectedProjectType, setSelectedProjectType] = useState<string>("all");
  const [selectedGenre, setSelectedGenre] = useState<Genre | "all">("all");
  const [selectedTvChannel, setSelectedTvChannel] = useState<string>("all");
  const [dateRange, setDateRange] = useState<string>("all");

  const updateFilter = (key: string, value: any) => {
    switch (key) {
      case 'selectedCountry':
        setSelectedCountry(value);
        break;
      case 'selectedGender':
        setSelectedGender(value);
        break;
      case 'selectedAge':
        setSelectedAge(value);
        break;
      case 'selectedFilmIndustry':
        setSelectedFilmIndustry(value);
        break;
      case 'selectedOttPlatform':
        setSelectedOttPlatform(value);
        break;
      case 'selectedYoutubeCategory':
        setSelectedYoutubeCategory(value);
        break;
      case 'selectedProjectType':
        setSelectedProjectType(value);
        break;
      case 'selectedGenre':
        setSelectedGenre(value);
        break;
      case 'selectedTvChannel':
        setSelectedTvChannel(value);
        break;
      case 'dateRange':
        setDateRange(value);
        break;
    }
  };

  const resetFilters = () => {
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

  const getAppliedFiltersText = () => {
    const filters = [];
    if (selectedCountry !== "all") filters.push(`Country: ${selectedCountry}`);
    if (selectedGender !== "all") filters.push(`Gender: ${selectedGender}`);
    if (selectedAge !== "all") filters.push(`Age: ${selectedAge}`);
    if (selectedFilmIndustry !== "all") filters.push(`Film Industry: ${selectedFilmIndustry}`);
    if (selectedOttPlatform !== "all") filters.push(`OTT Platform: ${selectedOttPlatform}`);
    if (selectedYoutubeCategory !== "all") filters.push(`YouTube Category: ${selectedYoutubeCategory}`);
    if (selectedProjectType !== "all") filters.push(`Project Type: ${selectedProjectType}`);
    if (selectedGenre !== "all") filters.push(`Genre: ${selectedGenre}`);
    if (selectedTvChannel !== "all") filters.push(`TV Channel: ${selectedTvChannel}`);
    if (dateRange !== "all") filters.push(`Time: ${dateRange}`);
    return filters.length > 0 ? filters.join(', ') : 'No filters applied';
  };

  const applyFilters = (opinions: any[]) => {
    return opinions.filter((opinion: any) => {
      if (selectedCountry !== "all" && opinion.country !== selectedCountry) return false;
      if (selectedGender !== "all" && opinion.demographics?.gender !== selectedGender) return false;
      if (selectedAge !== "all" && opinion.demographics?.age !== selectedAge) return false;
      if (selectedFilmIndustry !== "all" && opinion.filmIndustry !== selectedFilmIndustry) return false;
      if (selectedOttPlatform !== "all" && opinion.ottPlatform !== selectedOttPlatform) return false;
      if (selectedYoutubeCategory !== "all" && opinion.youtubeContentCategory !== selectedYoutubeCategory) return false;
      if (selectedProjectType !== "all" && opinion.projectType !== selectedProjectType) return false;
      if (selectedGenre !== "all" && opinion.genre !== selectedGenre) return false;
      if (selectedTvChannel !== "all" && opinion.televisionChannel !== selectedTvChannel) return false;
      
      return true;
    });
  };

  const filters = {
    selectedCountry,
    selectedGender,
    selectedAge,
    selectedFilmIndustry,
    selectedOttPlatform,
    selectedYoutubeCategory,
    selectedProjectType,
    selectedGenre,
    selectedTvChannel,
    dateRange
  };

  return {
    filters,
    updateFilter,
    resetFilters,
    getAppliedFiltersText,
    applyFilters,
    // Include individual filter values for backward compatibility
    selectedCountry,
    selectedGender,
    selectedAge,
    selectedFilmIndustry,
    selectedOttPlatform,
    selectedYoutubeCategory,
    selectedProjectType,
    selectedGenre,
    selectedTvChannel,
    dateRange
  };
};
