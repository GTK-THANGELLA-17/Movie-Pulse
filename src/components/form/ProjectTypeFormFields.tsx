import React from "react";
import { ProjectType } from "@/lib/types";
import FilmIndustryFormFields from "@/components/FilmIndustryFormFields";
import YouTubeFormFields from "@/components/YouTubeFormFields";
import InstagramFormFields from "@/components/InstagramFormFields";
import OTTFormFields from "@/components/OTTFormFields";
import TelevisionFormFields from "@/components/TelevisionFormFields";
import MusicFormFields from "@/components/MusicFormFields";

interface ProjectTypeFormFieldsProps {
  projectType: ProjectType;
  formState: any;
  setters: any;
  disabled: boolean;
}

const ProjectTypeFormFields = ({ projectType, formState, setters, disabled }: ProjectTypeFormFieldsProps) => {
  if (projectType === "Films") {
    // ... pass expanded genres automatically by data file ...
    return (
      <FilmIndustryFormFields
        filmProjectType={formState.filmProjectType}
        onFilmProjectTypeChange={setters.setFilmProjectType}
        filmIndustry={formState.filmIndustry}
        onFilmIndustryChange={setters.setFilmIndustry}
        genre={formState.genre}
        onGenreChange={setters.setGenre}
        notes={formState.notes}
        onNotesChange={(e) => setters.setNotes(e.target.value)}
        disabled={disabled}
        showProjectTypeSelector={true}
      />
    );
  }
  
  if (projectType === "YouTubeFilm") {
    return (
      <FilmIndustryFormFields
        filmIndustry={formState.filmIndustry}
        onFilmIndustryChange={setters.setFilmIndustry}
        genre={formState.genre}
        onGenreChange={setters.setGenre}
        notes={formState.notes}
        onNotesChange={(e) => setters.setNotes(e.target.value)}
        disabled={disabled}
        showProjectTypeSelector={false}
      />
    );
  }
  
  if (projectType === "YouTubeContent") {
    return (
      <YouTubeFormFields
        youtubeChannelType={formState.youtubeChannelType}
        onYoutubeChannelTypeChange={setters.setYoutubeChannelType}
        youtubeContentCategory={formState.youtubeContentCategory}
        onYoutubeContentCategoryChange={setters.setYoutubeContentCategory}
        notes={formState.notes}
        onNotesChange={(e) => setters.setNotes(e.target.value)}
        disabled={disabled}
      />
    );
  }
  
  if (projectType === "InstagramContent") {
    return (
      <InstagramFormFields
        instagramContentType={formState.instagramContentType}
        instagramProfileType={formState.instagramProfileType}
        onInstagramContentTypeChange={setters.setInstagramContentType}
        onInstagramProfileTypeChange={setters.setInstagramProfileType}
        notes={formState.notes}
        onNotesChange={(e) => setters.setNotes(e.target.value)}
        disabled={disabled}
      />
    );
  }
  
  if (projectType === "OTTPlatform") {
    return (
      <OTTFormFields
        genre={formState.genre}
        onGenreChange={setters.setGenre}
        ottPlatform={formState.ottPlatform}
        onOttPlatformChange={setters.setOttPlatform}
        seriesType={formState.seriesType}
        onSeriesTypeChange={setters.setSeriesType}
        notes={formState.notes}
        onNotesChange={(e) => setters.setNotes(e.target.value)}
        disabled={disabled}
      />
    );
  }
  
  if (projectType === "Television") {
    return (
      <TelevisionFormFields
        country={formState.televisionCountry}
        onCountryChange={(value: string) => setters.setTelevisionCountry(value)}
        televisionChannel={formState.televisionChannel}
        onTelevisionChannelChange={setters.setTelevisionChannel}
        televisionContentType={formState.televisionContentType}
        onTelevisionContentTypeChange={(value: string) => setters.setTelevisionContentType(value)}
        notes={formState.notes}
        onNotesChange={(e) => setters.setNotes(e.target.value)}
        disabled={disabled}
      />
    );
  }

  if (projectType === "MusicContent") {
    // ... keep existing music form ...
    return (
      <MusicFormFields
        musicGenre={formState.musicGenre}
        onMusicGenreChange={setters.setMusicGenre}
        musicMood={formState.musicMood}
        onMusicMoodChange={setters.setMusicMood}
        musicLanguage={formState.musicLanguage}
        onMusicLanguageChange={setters.setMusicLanguage}
        notes={formState.notes}
        onNotesChange={(e) => setters.setNotes(e.target.value)}
        disabled={disabled}
      />
    );
  }
  
  return null;
};

export default ProjectTypeFormFields;
