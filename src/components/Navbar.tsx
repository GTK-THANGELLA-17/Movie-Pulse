
import { useState, useEffect } from "react";
import { X, Menu, Activity, Sun, Moon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

interface MobileNavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, children, onClick }) => (
  <motion.a
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="block py-3 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    href={href}
    onClick={onClick}
  >
    {children}
  </motion.a>
);

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
    // Only work on home page
    if (location.pathname !== "/home") {
      navigate("/home", { state: { scrollToSection: sectionId } });
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
    closeMobileNav();
  };
  
  const navigateToHome = () => {
    navigate("/home");
    closeMobileNav();
  };
  
  const navigateToIntro = () => {
    navigate("/");
    closeMobileNav();
  };
  
  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-200 ${isScrolled ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
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
            className="bg-gray-100 dark:bg-gray-800"
          >
            {isMobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <AnimatePresence>
            {isMobileNavOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="absolute left-0 right-0 top-full bg-white dark:bg-gray-900 shadow-lg"
              >
                <div className="container mx-auto py-4 px-6 flex flex-col gap-2">
                  <Button 
                    variant="ghost" 
                    className="justify-start font-medium hover:bg-primary/10 hover:text-primary"
                    onClick={navigateToIntro}
                  >
                    Intro
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="justify-start font-medium hover:bg-primary/10 hover:text-primary"
                    onClick={navigateToHome}
                  >
                    Home
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="justify-start font-medium hover:bg-primary/10 hover:text-primary"
                    onClick={() => scrollToSection('features')}
                  >
                    Features
                  </Button>
                  <Link to="/stats" className="w-full" onClick={closeMobileNav}>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start font-medium hover:bg-primary/10 hover:text-primary"
                    >
                      Stats
                    </Button>
                  </Link>
                  <Link to="/vote" className="w-full" onClick={closeMobileNav}>
                    <Button
                      variant="outline"
                      className="w-full justify-start font-medium hover:bg-primary hover:text-white transition-colors"
                    >
                      Cast Opinion
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
