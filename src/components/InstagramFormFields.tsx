
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InstagramContentType } from "@/lib/types";
import { INSTAGRAM_PROFILE_TYPES } from "@/lib/data";

const INSTAGRAM_CONTENT_TYPES: InstagramContentType[] = [
  "Reels", "Stories", "Posts", "IGTV", "Live", "Shopping", "Fashion", 
  "Food", "Travel", "Fitness", "Beauty", "Lifestyle", "Comedy", 
  "Dance", "Music", "Art", "Photography", "Business", "Education",
  "News", "Sports", "Gaming", "Tech", "DIY", "Parenting", "Pets",
  "Motivation", "Health", "Cooking", "Reviews", "Unboxing", "Tutorial",
  "Behind the Scenes", "Challenges", "Trends", "Memes", "Documentary",
  "Interview", "Q&A", "Product Demo", "Brand Content", "Influencer",
  "Micro Content", "Carousel Posts", "Story Highlights", "User Generated Content"
];

interface InstagramFormFieldsProps {
  instagramContentType: InstagramContentType;
  instagramProfileType: string;
  onInstagramContentTypeChange: (value: InstagramContentType) => void;
  onInstagramProfileTypeChange: (value: string) => void;
  notes: string;
  onNotesChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

const InstagramFormFields = ({
  instagramContentType,
  instagramProfileType,
  onInstagramContentTypeChange,
  onInstagramProfileTypeChange,
  notes,
  onNotesChange,
  disabled = false
}: InstagramFormFieldsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="instagram-profile-type">Instagram Profile Type</Label>
        <Select
          value={instagramProfileType}
          onValueChange={onInstagramProfileTypeChange}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select profile type" />
          </SelectTrigger>
          <SelectContent>
            {INSTAGRAM_PROFILE_TYPES.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="instagramContentType">Instagram Content Type</Label>
        <Select
          value={instagramContentType}
          onValueChange={onInstagramContentTypeChange}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select content type" />
          </SelectTrigger>
          <SelectContent>
            {INSTAGRAM_CONTENT_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="notes">Additional Notes (Optional)</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={onNotesChange}
          placeholder="Share any additional thoughts about Instagram content..."
          disabled={disabled}
          rows={3}
        />
      </div>
    </div>
  );
};

export default InstagramFormFields;
