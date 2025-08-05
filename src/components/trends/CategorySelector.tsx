
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface Category {
  id: string;
  label: string;
  icon: string;
}

interface CategorySelectorProps {
  categories: Category[];
  activeCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

const CategorySelector = ({ categories, activeCategory, onCategorySelect }: CategorySelectorProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleCategorySelect = (categoryId: string) => {
    onCategorySelect(categoryId);
    if (isMobile) {
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className="mb-12">
      {isMobile ? (
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-2 border-[#5b2333]/20 dark:border-gray-600 rounded-xl font-medium text-[#5b2333] dark:text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{categories.find(c => c.id === activeCategory)?.icon}</span>
              <span>{categories.find(c => c.id === activeCategory)?.label}</span>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-gray-800 border-2 border-[#5b2333]/20 dark:border-gray-600 rounded-xl shadow-2xl z-50 overflow-hidden"
              >
                {categories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    onClick={() => handleCategorySelect(category.id)}
                    className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-[#5b2333]/10 dark:hover:bg-gray-700 transition-all duration-200 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                  >
                    <span className="text-xl">{category.icon}</span>
                    <span className="text-[#5b2333] dark:text-white font-medium">{category.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => handleCategorySelect(category.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-[#5b2333] to-[#983b55] text-white shadow-lg shadow-[#5b2333]/30"
                  : "bg-white/80 text-[#5b2333] hover:bg-white border-2 border-[#5b2333]/20 hover:border-[#5b2333]/40 dark:bg-gray-800/80 dark:text-white dark:hover:bg-gray-800 dark:border-gray-600"
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.label}</span>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
