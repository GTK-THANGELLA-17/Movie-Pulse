import { useState, useEffect } from 'react';
import { FilmIndustry, Genre, FilmProjectType, Country, OTTPlatform, YouTubeContentCategory, YouTubeChannelType, InstagramContentType, TelevisionContentType, MusicGenre, MusicMood, MusicLanguage } from "@/lib/types";
import { FILM_INDUSTRIES, GENRES, FILM_PROJECT_TYPES, COUNTRIES, OTT_PLATFORMS, YOUTUBE_CHANNEL_TYPES, YOUTUBE_CONTENT_CATEGORIES, MUSIC_GENRES, MUSIC_MOODS, MUSIC_LANGUAGES } from "@/lib/data";

export const useFormState = () => {
  const [filmProjectType, setFilmProjectType] = useState<FilmProjectType>(FILM_PROJECT_TYPES[0] as FilmProjectType);
  const [filmIndustry, setFilmIndustry] = useState<FilmIndustry>(FILM_INDUSTRIES[0] as FilmIndustry);
  const [genre, setGenre] = useState<Genre>(GENRES[0] as Genre);
  const [country, setCountry] = useState<Country>(COUNTRIES[0] as Country);
  const [televisionCountry, setTelevisionCountry] = useState<Country | "">(""); 
  const [ottPlatform, setOttPlatform] = useState<OTTPlatform>(OTT_PLATFORMS[0] as OTTPlatform);
  const [youtubeChannelType, setYoutubeChannelType] = useState<YouTubeChannelType>(YOUTUBE_CHANNEL_TYPES[0] as YouTubeChannelType);
  const [youtubeContentCategory, setYoutubeContentCategory] = useState<YouTubeContentCategory>(YOUTUBE_CONTENT_CATEGORIES[0] as YouTubeContentCategory);
  const [instagramContentType, setInstagramContentType] = useState<InstagramContentType>("Reels" as InstagramContentType);
  const [televisionChannel, setTelevisionChannel] = useState<string>("");
  const [televisionContentType, setTelevisionContentType] = useState<TelevisionContentType | "">(""); 
  const [musicGenre, setMusicGenre] = useState<MusicGenre>(MUSIC_GENRES[0] as MusicGenre);
  const [musicMood, setMusicMood] = useState<MusicMood>(MUSIC_MOODS[0] as MusicMood);
  const [musicLanguage, setMusicLanguage] = useState<MusicLanguage>(MUSIC_LANGUAGES[0] as MusicLanguage);
  const [notes, setNotes] = useState("");
  const [demographics, setDemographics] = useState({
    gender: "",
    age: "",
    region: ""
  });
  const [seriesType, setSeriesType] = useState(""); // For OTT series
  const [instagramProfileType, setInstagramProfileType] = useState(""); // For Instagram
  const [tvChannelContentTypes, setTvChannelContentTypes] = useState<string[]>([]);

  const resetForm = () => {
    setFilmProjectType(FILM_PROJECT_TYPES[0] as FilmProjectType);
    setFilmIndustry(FILM_INDUSTRIES[0] as FilmIndustry);
    setGenre(GENRES[0] as Genre);
    setCountry(COUNTRIES[0] as Country);
    setTelevisionCountry("");
    setOttPlatform(OTT_PLATFORMS[0] as OTTPlatform);
    setYoutubeChannelType(YOUTUBE_CHANNEL_TYPES[0] as YouTubeChannelType);
    setYoutubeContentCategory(YOUTUBE_CONTENT_CATEGORIES[0] as YouTubeContentCategory);
    setInstagramContentType("Reels" as InstagramContentType);
    setTelevisionChannel("");
    setTelevisionContentType("");
    setMusicGenre(MUSIC_GENRES[0] as MusicGenre);
    setMusicMood(MUSIC_MOODS[0] as MusicMood);
    setMusicLanguage(MUSIC_LANGUAGES[0] as MusicLanguage);
    setNotes("");
    setDemographics({ gender: "", age: "", region: "" });
    setSeriesType("");
    setInstagramProfileType("");
    setTvChannelContentTypes([]);
  };

  // Reset form state when the component mounts
  useEffect(() => {
    resetForm();
  }, []);

  return {
    formState: {
      filmProjectType,
      filmIndustry,
      genre,
      country,
      televisionCountry,
      ottPlatform,
      youtubeChannelType,
      youtubeContentCategory,
      instagramContentType,
      televisionChannel,
      televisionContentType,
      musicGenre,
      musicMood,
      musicLanguage,
      notes,
      demographics,
      seriesType,
      instagramProfileType,
      tvChannelContentTypes
    },
    setters: {
      setFilmProjectType,
      setFilmIndustry,
      setGenre,
      setCountry,
      setTelevisionCountry,
      setOttPlatform,
      setYoutubeChannelType,
      setYoutubeContentCategory,
      setInstagramContentType,
      setTelevisionChannel,
      setTelevisionContentType,
      setMusicGenre,
      setMusicMood,
      setMusicLanguage,
      setNotes,
      setDemographics,
      setSeriesType,
      setInstagramProfileType,
      setTvChannelContentTypes
    },
    resetForm
  };
};
