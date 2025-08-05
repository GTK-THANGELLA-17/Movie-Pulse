
import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const isMobile = useIsMobile();
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`border-t border-border bg-background/50 backdrop-blur-sm ${isMobile ? 'p-1.5' : 'p-2'}`}>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything..."
          className={`flex-1 ${
            isMobile ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'
          } border border-border rounded-full bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200`}
        />
        <Button
          onClick={handleSend}
          size="sm"
          className={`${
            isMobile ? 'px-2 py-1 h-7' : 'px-2.5 py-1.5'
          } rounded-full bg-primary hover:bg-primary/90 disabled:opacity-50 transition-all duration-200 hover:scale-105 active:scale-95`}
          disabled={!inputValue.trim()}
        >
          <Send className={isMobile ? "w-2.5 h-2.5" : "w-3 h-3"} />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
