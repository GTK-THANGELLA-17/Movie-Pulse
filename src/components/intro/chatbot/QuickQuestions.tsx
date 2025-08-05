
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { QuickQuestion } from "./types";

interface QuickQuestionsProps {
  questions: QuickQuestion[];
  activeCategory: string;
  onQuestionClick: (question: QuickQuestion) => void;
}

const QuickQuestions = ({ questions, activeCategory, onQuestionClick }: QuickQuestionsProps) => {
  const isMobile = useIsMobile();
  const filteredQuestions = questions.filter(q => q.category === activeCategory);

  // Prevent scroll events from bubbling to parent
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={`border-t border-border bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm ${isMobile ? 'p-2 max-h-32' : 'p-3 max-h-36'}`}>
      <div className="mb-2">
        <h4 className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
          Quick Questions
        </h4>
      </div>
      <ScrollArea 
        className="h-full"
        onWheel={handleWheel}
        onTouchMove={handleTouchMove}
      >
        <div className="grid grid-cols-1 gap-2">
          {filteredQuestions.map((q) => (
            <Button
              key={q.id}
              variant="outline"
              size="sm"
              onClick={() => onQuestionClick(q)}
              className={`${
                isMobile 
                  ? 'text-xs h-8 px-3 justify-start' 
                  : 'text-xs h-9 px-3 justify-start'
              } hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-sm active:scale-[0.98] border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm`}
            >
              <span className="mr-2 text-sm flex-shrink-0">
                {q.icon}
              </span>
              <span className="text-left leading-tight truncate">
                {q.question}
              </span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default QuickQuestions;
