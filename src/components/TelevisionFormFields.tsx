
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COUNTRIES, TELEVISION_CHANNELS_BY_COUNTRY, TELEVISION_CONTENT_TYPES, TELEVISION_CONTENT_TYPES_BY_CHANNEL } from "@/lib/data";
import { Country, TelevisionChannel, TelevisionContentType } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookText } from "lucide-react";
import { useState, useEffect } from "react";

interface TelevisionFormFieldsProps {
  country: Country | "";
  onCountryChange: (value: string) => void;
  televisionChannel: TelevisionChannel | "";
  onTelevisionChannelChange: (value: string) => void;
  televisionContentType: TelevisionContentType | "";
  onTelevisionContentTypeChange: (value: string) => void;
  notes: string;
  onNotesChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

const TelevisionFormFields = ({
  country,
  onCountryChange,
  televisionChannel,
  onTelevisionChannelChange,
  televisionContentType,
  onTelevisionContentTypeChange,
  notes,
  onNotesChange,
  disabled = false
}: TelevisionFormFieldsProps) => {
  const [availableChannels, setAvailableChannels] = useState<TelevisionChannel[]>([]);
  const [availableContentTypes, setAvailableContentTypes] = useState<string[]>([]);

  useEffect(() => {
    if (country) {
      const channels = TELEVISION_CHANNELS_BY_COUNTRY[country] || [];
      setAvailableChannels(channels);
    } else {
      setAvailableChannels([]);
    }
  }, [country]);

  useEffect(() => {
    if (televisionChannel) {
      const contentTypes = TELEVISION_CONTENT_TYPES_BY_CHANNEL[televisionChannel] || [];
      setAvailableContentTypes(contentTypes.length > 0 ? contentTypes : TELEVISION_CONTENT_TYPES);
    } else {
      setAvailableContentTypes(TELEVISION_CONTENT_TYPES);
    }
  }, [televisionChannel]);

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="country">Your Country</Label>
        <Select
          value={country}
          onValueChange={onCountryChange}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your country" />
          </SelectTrigger>
          <SelectContent>
            {COUNTRIES.map((country) => (
              <SelectItem key={country} value={country}>{country}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="television-channel">Television Channel</Label>
        <Select
          value={televisionChannel}
          onValueChange={onTelevisionChannelChange}
          disabled={disabled || !country}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select television channel" />
          </SelectTrigger>
          <SelectContent>
            {availableChannels.map((channel) => (
              <SelectItem key={channel} value={channel}>{channel}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="television-content-type">TV Content Type</Label>
        <Select
          value={televisionContentType}
          onValueChange={onTelevisionContentTypeChange}
          disabled={disabled || !country || !televisionChannel}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select content type" />
          </SelectTrigger>
          <SelectContent>
            {availableContentTypes.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label 
            htmlFor="tv-notes" 
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
          id="tv-notes"
          value={notes}
          onChange={onNotesChange}
          className="min-h-[100px] resize-y"
          placeholder="Share your thoughts about this TV channel and content preferences..."
          disabled={disabled}
          maxLength={500}
        />
      </div>
    </div>
  );
};

export default TelevisionFormFields;
