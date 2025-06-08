
import { useState, useEffect } from "react";
import { X, Menu, Activity, Sun, Moon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  
  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };
  
  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };
  
  const scrollToSection = (sectionId: string) => {
    closeMobileNav();
    
    // If we're not on home page, navigate to home first
    if (location.pathname !== "/home") {
      navigate("/home");
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      // We're already on home page, just scroll
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };
  
  const navigateToHome = () => {
    navigate("/home");
    closeMobileNav();
    // Scroll to top when navigating to home
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };
  
  const navigateToIntro = () => {
    navigate("/");
    closeMobileNav();
  };
  
  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-200 ${isScrolled ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-md' : 'bg-white/90 dark:bg-black/90 backdrop-blur-sm'}`}>
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo with Pulse Icon */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="flex items-center">
            <span className="text-2xl">🎬</span>
            <motion.span 
              animate={{ 
                color: ['hsl(var(--primary))', 'hsl(var(--primary-foreground))', 'hsl(var(--primary))'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="ml-2 font-bold"
            >
              MoviePulse
            </motion.span>
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-2"
            >
              <Activity className="h-5 w-5 text-primary" />
            </motion.div>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Button 
            variant="ghost" 
            className="font-medium hover:bg-primary/10 hover:text-primary"
            onClick={navigateToIntro}
          >
            Intro
          </Button>
          <Button 
            variant="ghost" 
            className="font-medium hover:bg-primary/10 hover:text-primary"
            onClick={navigateToHome}
          >
            Home
          </Button>
          <Button 
            variant="ghost" 
            className="font-medium hover:bg-primary/10 hover:text-primary"
            onClick={() => scrollToSection('features')}
          >
            Features
          </Button>
          <Link to="/stats">
            <Button 
              variant="ghost" 
              className="font-medium hover:bg-primary/10 hover:text-primary"
            >
              Stats
            </Button>
          </Link>
          <Link to="/vote">
            <Button 
              variant="outline" 
              className="font-medium hover:bg-primary hover:text-white transition-colors"
            >
              Cast Opinion
            </Button>
          </Link>
          
          {/* Theme Toggle with better visibility */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            aria-label="Toggle theme"
            className="bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary-foreground"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </motion.div>
            </AnimatePresence>
          </Button>
        </div>

        {/* Mobile navigation trigger */}
        <div className="md:hidden flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            aria-label="Toggle theme"
            className="bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary-foreground"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMobileNav} 
            aria-label="Menu"
            className="text-primary dark:text-primary-foreground relative z-50"
          >
            <motion.div
              animate={{ rotate: isMobileNavOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.div>
          </Button>
        </div>

        {/* Mobile Navigation Menu - Fixed Structure */}
        <AnimatePresence>
          {isMobileNavOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: "0%" }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl z-40 border-l-2 border-gray-200 dark:border-gray-700"
            >
              {/* Mobile Menu Header */}
              <div className="bg-gradient-to-r from-[#5b2333] to-[#8b3a52] p-6 text-white">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎬</span>
                  <span className="font-bold text-xl">MoviePulse</span>
                </div>
                <p className="text-sm opacity-90 mt-2">Shape the Future of Entertainment</p>
              </div>

              {/* Mobile Menu Navigation Links */}
              <div className="flex-1 py-6">
                <div className="space-y-2 px-4">
                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={navigateToIntro}
                    className="w-full text-left py-4 px-6 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border-b border-gray-200 dark:border-gray-600"
                  >
                    <span className="text-lg font-medium text-gray-800 dark:text-gray-200 flex items-center gap-3">
                      🏠 Introduction
                    </span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={navigateToHome}
                    className="w-full text-left py-4 px-6 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border-b border-gray-200 dark:border-gray-600"
                  >
                    <span className="text-lg font-medium text-gray-800 dark:text-gray-200 flex items-center gap-3">
                      🏡 Home
                    </span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollToSection('features')}
                    className="w-full text-left py-4 px-6 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border-b border-gray-200 dark:border-gray-600"
                  >
                    <span className="text-lg font-medium text-gray-800 dark:text-gray-200 flex items-center gap-3">
                      ✨ Features
                    </span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { navigate("/stats"); closeMobileNav(); }}
                    className="w-full text-left py-4 px-6 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border-b border-gray-200 dark:border-gray-600"
                  >
                    <span className="text-lg font-medium text-gray-800 dark:text-gray-200 flex items-center gap-3">
                      📊 Statistics
                    </span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { navigate("/vote"); closeMobileNav(); }}
                    className="w-full text-left py-4 px-6 rounded-xl bg-primary/10 hover:bg-primary/20 transition-all"
                  >
                    <span className="text-lg font-medium text-primary dark:text-primary flex items-center gap-3">
                      🗳️ Cast Your Opinion
                    </span>
                  </motion.button>
                </div>

                {/* Mobile Menu Footer */}
                <div className="px-6 py-4 mt-8 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    © 2024 MoviePulse. All rights reserved.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isMobileNavOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
              onClick={closeMobileNav}
            />
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
