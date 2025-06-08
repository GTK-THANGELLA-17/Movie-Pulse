
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
import { OTTPlatform, Genre } from "@/lib/types";
import { OTT_PLATFORMS, OTT_GENRES } from "@/lib/data";

interface OTTFormFieldsProps {
  genre: Genre;
  onGenreChange: (genre: Genre) => void;
  ottPlatform: OTTPlatform;
  onOttPlatformChange: (platform: OTTPlatform) => void;
  notes: string;
  onNotesChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

const OTTFormFields = ({
  genre,
  onGenreChange,
  ottPlatform,
  onOttPlatformChange,
  notes,
  onNotesChange,
  disabled = false
}: OTTFormFieldsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="ott-platform">OTT Platform</Label>
        <Select
          value={ottPlatform}
          onValueChange={onOttPlatformChange}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select OTT platform" />
          </SelectTrigger>
          <SelectContent>
            {OTT_PLATFORMS.map((platform) => (
              <SelectItem key={platform} value={platform}>
                {platform}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="ott-genre">Genre</Label>
        <Select
          value={genre}
          onValueChange={onGenreChange}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select genre" />
          </SelectTrigger>
          <SelectContent>
            {OTT_GENRES.map((genre) => (
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
            htmlFor="ott-notes" 
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
          id="ott-notes"
          value={notes}
          onChange={onNotesChange}
          className="min-h-[100px] resize-y"
          placeholder="Share your thoughts about this OTT platform and content preferences..."
          disabled={disabled}
          maxLength={500}
        />
      </div>
    </div>
  );
};

export default OTTFormFields;
