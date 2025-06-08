
import { VotingFormSelect } from "@/components/VotingFormSelect";
import { COUNTRIES, YOUTUBE_CONTENT_CATEGORIES, YOUTUBE_CONTENT_CATEGORY_LABELS } from "@/lib/data";
import { Country, YouTubeContentCategory } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookText } from "lucide-react";

interface YoutubeContentFormFieldsProps {
  country: Country;
  onCountryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  youtubeSection: string;
  onYoutubeSectionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  youtubeCategory: YouTubeContentCategory | "";
  onYoutubeCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  notes: string;
  onNotesChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

const YoutubeContentFormFields = ({
  country,
  onCountryChange,
  youtubeSection,
  onYoutubeSectionChange,
  youtubeCategory,
  onYoutubeCategoryChange,
  notes,
  onNotesChange,
  disabled = false
}: YoutubeContentFormFieldsProps) => {
  const youtubeCategoriesForSection = YOUTUBE_CONTENT_CATEGORIES[youtubeSection] || [];

  return (
    <div className="space-y-4">
      <VotingFormSelect
        id="country"
        label="Your Country"
        value={country}
        onChange={onCountryChange}
        disabled={disabled}
        required={true}
        options={[
          { value: "", label: "Select your country" },
          ...COUNTRIES.map(country => ({ value: country, label: country }))
        ]}
      />

      <VotingFormSelect
        id="youtubeSection"
        label="YouTube Content Section"
        value={youtubeSection}
        onChange={onYoutubeSectionChange}
        disabled={disabled || !country}
        required={true}
        options={[
          { value: "", label: "Select content section" },
          ...Object.keys(YOUTUBE_CONTENT_CATEGORIES).map(section => ({ value: section, label: section }))
        ]}
      />
      
      <VotingFormSelect
        id="youtubeCategory"
        label="YouTube Content Category"
        value={youtubeCategory}
        onChange={onYoutubeCategoryChange}
        disabled={disabled || !youtubeSection || !country}
        required={true}
        options={[
          { value: "", label: "Select content category" },
          ...youtubeCategoriesForSection.map(category => ({ 
            value: category, 
            label: YOUTUBE_CONTENT_CATEGORY_LABELS[category] 
          }))
        ]}
      />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label 
            htmlFor="youtube-notes" 
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
          id="youtube-notes"
          value={notes}
          onChange={onNotesChange}
          className="min-h-[100px] resize-y"
          placeholder="Share your thoughts about this type of YouTube content..."
          disabled={disabled}
          maxLength={500}
        />
      </div>
    </div>
  );
};

export default YoutubeContentFormFields;
