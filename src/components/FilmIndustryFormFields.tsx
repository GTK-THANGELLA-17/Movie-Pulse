
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilmIndustry, Genre, FilmProjectType } from "@/lib/types";
import { FILM_INDUSTRIES, GENRES, FILM_PROJECT_TYPES, FILM_PROJECT_TYPE_LABELS } from "@/lib/data";

interface FilmIndustryFormFieldsProps {
  filmIndustry: FilmIndustry;
  onFilmIndustryChange: (industry: FilmIndustry) => void;
  genre: Genre;
  onGenreChange: (genre: Genre) => void;
  filmProjectType?: FilmProjectType;
  onFilmProjectTypeChange?: (type: FilmProjectType) => void;
  notes: string;
  onNotesChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  showProjectTypeSelector?: boolean;
}

const FilmIndustryFormFields = ({
  filmIndustry,
  onFilmIndustryChange,
  genre,
  onGenreChange,
  filmProjectType,
  onFilmProjectTypeChange,
  notes,
  onNotesChange,
  disabled = false,
  showProjectTypeSelector = false
}: FilmIndustryFormFieldsProps) => {
  return (
    <div className="space-y-4">
      {showProjectTypeSelector && onFilmProjectTypeChange && (
        <div>
          <Label htmlFor="film-project-type">Film Type</Label>
          <Select
            value={filmProjectType}
            onValueChange={onFilmProjectTypeChange}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select film type" />
            </SelectTrigger>
            <SelectContent>
              {FILM_PROJECT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {FILM_PROJECT_TYPE_LABELS[type]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div>
        <Label htmlFor="film-industry">Film Industry</Label>
        <Select
          value={filmIndustry}
          onValueChange={onFilmIndustryChange}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select film industry" />
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

      <div>
        <Label htmlFor="film-genre">Genre</Label>
        <Select
          value={genre}
          onValueChange={onGenreChange}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select genre" />
          </SelectTrigger>
          <SelectContent>
            {GENRES.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label 
            htmlFor="film-notes" 
            className="text-sm font-medium flex items-center gap-1.5"
          >
            <BookText className="w-4 h-4" />
            Notes (Optional)
          </Label>
          <span className="text-xs text-muted-foreground">
            {notes.length}/500 characters
          </span>
        </div>
        <Textarea
          id="film-notes"
          value={notes}
          onChange={onNotesChange}
          className="min-h-[100px] resize-y"
          placeholder="Share your thoughts about this film project and genre preferences..."
          disabled={disabled}
          maxLength={500}
        />
      </div>
    </div>
  );
};

export default FilmIndustryFormFields;
