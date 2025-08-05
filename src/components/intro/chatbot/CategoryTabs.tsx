
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Category } from "./types";

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryTabs = ({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) => {
  // Prevent scroll events from bubbling to parent
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50/80 to-white/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-sm">
      <div className="mb-2">
        <h4 className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
          Categories
        </h4>
      </div>
      <ScrollArea 
        className="w-full"
        onWheel={handleWheel}
        onTouchMove={handleTouchMove}
      >
        <div className="flex gap-2 pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category.id)}
              className={`text-xs h-8 px-3 whitespace-nowrap flex-shrink-0 transition-all duration-300 ${
                activeCategory === category.id 
                  ? 'bg-gradient-to-r from-primary to-primary/90 text-white shadow-md hover:shadow-lg transform hover:scale-[1.02]' 
                  : 'hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 hover:border-primary/30 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm'
              }`}
            >
              <span className="mr-1.5">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CategoryTabs;
