
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingNavbarProps {
  items: {
    label: string;
    href: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}

export const FloatingNavbar = ({ items, className }: FloatingNavbarProps) => {
  const [activeItem, setActiveItem] = useState<string>(items[0]?.href || "");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Get current scroll position
      const currentScrollPos = window.scrollY;
      
      // Find the section that is currently in view
      const sections = items.map(item => document.getElementById(item.href.replace('#', '')));
      const validSections = sections.filter(section => section !== null) as HTMLElement[];
      
      if (validSections.length) {
        const currentSection = validSections.find((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        });
        
        if (currentSection) {
          setActiveItem(`#${currentSection.id}`);
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  return (
    <AnimatePresence>
      {isScrolled && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className={cn(
            "fixed top-0 left-0 right-0 mx-auto w-fit z-[100] flex justify-center py-2",
            className
          )}
        >
          <div className="mx-auto border border-border/40 bg-background/70 backdrop-blur-md rounded-full p-2 flex items-center justify-center shadow-lg">
            <nav className="flex space-x-1">
              {items.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveItem(item.href);
                    
                    const targetId = item.href.replace('#', '');
                    const element = document.getElementById(targetId);
                    
                    if (element) {
                      element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                  }}
                  className={cn(
                    "relative px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1",
                    activeItem === item.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.icon && <span className="hidden sm:inline-block">{item.icon}</span>}
                  <span>{item.label}</span>
                  {activeItem === item.href && (
                    <motion.span
                      layoutId="navbar-active-indicator"
                      className="absolute inset-0 rounded-full bg-muted z-[-1]"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                </a>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
