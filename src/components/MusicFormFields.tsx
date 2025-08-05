
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MusicGenre, MusicMood, MusicLanguage, Country } from "@/lib/types";

interface MusicFormFieldsProps {
  musicGenre?: MusicGenre;
  onMusicGenreChange: (value: MusicGenre) => void;
  musicMood?: MusicMood;
  onMusicMoodChange: (value: MusicMood) => void;
  musicLanguage?: MusicLanguage;
  onMusicLanguageChange: (value: MusicLanguage) => void;
  notes: string;
  onNotesChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled: boolean;
}

const MUSIC_GENRES: MusicGenre[] = [
  "Pop", "Rock", "Hip Hop", "R&B", "Country", "Jazz", "Classical", "Electronic", 
  "Folk", "Reggae", "Blues", "Punk", "Metal", "Alternative", "Indie", "Soul", 
  "Funk", "Disco", "House", "Techno", "Trance", "Dubstep", "Bollywood", 
  "Regional Indian", "Sufi", "Qawwali", "Ghazal", "Devotional", "Punjabi", 
  "Tamil", "Telugu", "Bengali", "Marathi", "Gujarati", "Other"
];

const MUSIC_MOODS: MusicMood[] = [
  "Happy", "Sad", "Romantic", "Energetic", "Relaxing", "Motivational", "Party", 
  "Workout", "Study", "Sleep", "Meditative", "Nostalgic", "Angry", "Uplifting", 
  "Melancholic", "Chill", "Intense", "Peaceful", "Emotional", "Feel Good"
];

const MUSIC_LANGUAGES: MusicLanguage[] = [
  "English", "Hindi", "Punjabi", "Tamil", "Telugu", "Bengali", "Marathi", 
  "Gujarati", "Kannada", "Malayalam", "Urdu", "Sanskrit", "Spanish", "French", 
  "Korean", "Japanese", "Arabic", "Other"
];

const MusicFormFields = ({
  musicGenre,
  onMusicGenreChange,
  musicMood,
  onMusicMoodChange,
  musicLanguage,
  onMusicLanguageChange,
  notes,
  onNotesChange,
  disabled
}: MusicFormFieldsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="music-genre">Preferred Music Genre *</Label>
          <Select 
            value={musicGenre} 
            onValueChange={(value: string) => onMusicGenreChange(value as MusicGenre)}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select music genre" />
            </SelectTrigger>
            <SelectContent>
              {MUSIC_GENRES.map(genre => (
                <SelectItem key={genre} value={genre}>{genre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="music-mood">Preferred Music Mood *</Label>
          <Select 
            value={musicMood} 
            onValueChange={(value: string) => onMusicMoodChange(value as MusicMood)}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select music mood" />
            </SelectTrigger>
            <SelectContent>
              {MUSIC_MOODS.map(mood => (
                <SelectItem key={mood} value={mood}>{mood}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="music-language">Preferred Music Language *</Label>
        <Select 
          value={musicLanguage} 
          onValueChange={(value: string) => onMusicLanguageChange(value as MusicLanguage)}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select music language" />
          </SelectTrigger>
          <SelectContent>
            {MUSIC_LANGUAGES.map(language => (
              <SelectItem key={language} value={language}>{language}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="notes">Additional Notes (Optional)</Label>
        <Textarea
          id="notes"
          placeholder="Share any specific music preferences, artists you like, or occasions when you listen to this type of music..."
          value={notes}
          onChange={onNotesChange}
          disabled={disabled}
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};

export default MusicFormFields;
