
import { Film, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";

interface ChatHeaderProps {
  onClose: () => void;
}

const ChatHeader = ({ onClose }: ChatHeaderProps) => {
  return (
    <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white p-3 rounded-t-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-white/20 rounded-full">
            <Film className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">AUDIENCE PULSE AI</h3>
            <p className="text-xs opacity-90">🎬 Entertainment Guide</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-white hover:bg-white/20 p-1 h-auto"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </CardHeader>
  );
};

export default ChatHeader;
