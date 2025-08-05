
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface NotesSectionProps {
  notes: string;
  setNotes: (notes: string) => void;
}

const NotesSection = ({ notes, setNotes }: NotesSectionProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="notes" className="text-sm font-medium">
        Suggestions/Feedback/Comments/Notes (Optional)
      </Label>
      <Textarea
        id="notes"
        placeholder="Share your thoughts, suggestions, or feedback about this content type. Your insights help creators understand audience preferences..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="min-h-[80px] resize-none"
        maxLength={500}
      />
      <p className="text-xs text-muted-foreground">
        Your suggestions and feedback are valuable for content creators to understand audience preferences and improve their work.
      </p>
    </div>
  );
};

export default NotesSection;
