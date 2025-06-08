
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
import { YouTubeContentCategory, YouTubeChannelType } from "@/lib/types";
import { 
  YOUTUBE_CHANNEL_TYPES, 
  YOUTUBE_CONTENT_CATEGORY_LABELS, 
  CHANNEL_TYPE_TO_CATEGORIES 
} from "@/lib/data";

interface YouTubeFormFieldsProps {
  youtubeChannelType: YouTubeChannelType;
  onYoutubeChannelTypeChange: (channelType: YouTubeChannelType) => void;
  youtubeContentCategory: YouTubeContentCategory;
  onYoutubeContentCategoryChange: (category: YouTubeContentCategory) => void;
  notes: string;
  onNotesChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

const YouTubeFormFields = ({
  youtubeChannelType,
  onYoutubeChannelTypeChange,
  youtubeContentCategory,
  onYoutubeContentCategoryChange,
  notes,
  onNotesChange,
  disabled = false
}: YouTubeFormFieldsProps) => {
  // Get available categories based on selected channel type
  const availableCategories = CHANNEL_TYPE_TO_CATEGORIES[youtubeChannelType] || [];

  const handleChannelTypeChange = (channelType: YouTubeChannelType) => {
    onYoutubeChannelTypeChange(channelType);
    
    // Auto-select the first relevant category when channel type changes
    const relevantCategories = CHANNEL_TYPE_TO_CATEGORIES[channelType];
    if (relevantCategories && relevantCategories.length > 0) {
      onYoutubeContentCategoryChange(relevantCategories[0]);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="youtube-channel-type">YouTube Channel Type</Label>
        <Select
          value={youtubeChannelType}
          onValueChange={handleChannelTypeChange}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select channel type" />
          </SelectTrigger>
          <SelectContent>
            {YOUTUBE_CHANNEL_TYPES.map((channelType) => (
              <SelectItem key={channelType} value={channelType}>
                {channelType}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="youtube-category">YouTube Content Category</Label>
        <Select
          value={youtubeContentCategory}
          onValueChange={onYoutubeContentCategoryChange}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select content category" />
          </SelectTrigger>
          <SelectContent>
            {availableCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {YOUTUBE_CONTENT_CATEGORY_LABELS[category]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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

export default YouTubeFormFields;
