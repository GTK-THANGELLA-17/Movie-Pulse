
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";
import LoadingIndicator from "@/components/LoadingIndicator";
import { ArrowUp, ArrowRight, Film, Info, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const votingSectionRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simulating page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    // Check if we should scroll to voting section based on navigation state
    if (location.state) {
      if (location.state.scrollToVotingSection && votingSectionRef.current) {
        setTimeout(() => {
          votingSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
      } else if (location.state.scrollToSection === 'features' && featuresRef.current) {
        setTimeout(() => {
          featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
      }
    }
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.state]);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const navigateToVote = () => {
    navigate("/vote");
  };

  const navigateToStats = () => {
    navigate("/stats");
  };
  
  const navigateToIntro = () => {
    navigate("/");
  };
  
  // Button click ripple effect
  const buttonClickEffect = (e) => {
    const btn = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - btn.offsetLeft - diameter / 2}px`;
    circle.style.top = `${e.clientY - btn.offsetTop - diameter / 2}px`;
    circle.classList.add('ripple');
    
    const ripple = btn.querySelector('.ripple');
    if (ripple) {
      ripple.remove();
    }
    
    btn.appendChild(circle);
    
    // Remove the span after the animation completes
    setTimeout(() => {
      circle.remove();
    }, 600);
  };
  
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f4f3] dark:bg-black w-full">
      <style>
        {`
        .ripple {
          position: absolute;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.4);
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        }
        
        @keyframes ripple {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        .button-hover-effect {
          position: relative;
          overflow: hidden;
        }
        `}
      </style>
      <AnimatePresence>
        {isLoading && <LoadingIndicator fullScreen message="Preparing your experience" />}
      </AnimatePresence>
      
      <Navbar />
      
      {/* Hero section for home page - different from intro page */}
      <section id="hero" className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white"
              >
                Welcome to <span className="text-primary">MoviePulse</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-lg mb-8 text-black dark:text-white"
              >
                The home for entertainment enthusiasts to share their opinions and preferences. Help shape the future of content creation!
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex flex-wrap gap-4"
              >
                <Button
                  onClick={(e) => {
                    buttonClickEffect(e);
                    navigateToVote(); 
                  }}
                  className="bg-primary text-white hover:bg-primary/90 px-6 py-3 rounded-lg relative overflow-hidden"
                >
                  Cast Your Opinion
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                <Button
                  onClick={(e) => {
                    buttonClickEffect(e);
                    navigateToStats();
                  }}
                  variant="outline"
                  className="relative overflow-hidden"
                >
                  View Statistics
                </Button>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="md:w-1/2 relative mt-10 md:mt-0"
            >
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src="/Images/current-trends.jpg"  // Correct path with forward slash
                  alt="Movie theater"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <div className="font-medium mb-1">Current Trending</div>
                    <div className="text-xl font-bold">What audiences want to see next</div>
                  </div>
                </div>
              </div>
              
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg"
              >
                <div className="flex items-center gap-2 text-sm">
                  <Activity className="w-4 h-4 text-green-500" />
                  <span className="text-black dark:text-white">Live opinions being collected</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <div id="features" ref={featuresRef}></div>
      <About />
      
      {/* Call to action section */}
      <section 
        id="voting-section" 
        ref={votingSectionRef}
        className="py-20 bg-gradient-to-r from-[#5b2333]/10 to-[#5b2333]/5 dark:from-gray-900 dark:to-black"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black dark:text-white">Ready to Make an Impact?</h2>
            <p className="text-lg text-black dark:text-white/80 mb-8">
              Your voice matters in shaping the future of entertainment across all platforms. Whether you want to share your preferences or explore current trends, MoviePulse makes it easy.
            </p>
            
            <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  buttonClickEffect(e);
                  navigateToVote();
                }}
                className="button-hover-effect px-6 py-3 bg-[#5b2333] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#5b2333]/90 transition-all dark:bg-white dark:text-black dark:hover:bg-white/90 relative overflow-hidden"
              >
                Cast Your Opinion
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  buttonClickEffect(e);
                  navigateToStats();
                }}
                className="button-hover-effect px-6 py-3 bg-white text-black rounded-lg font-medium flex items-center gap-2 hover:bg-white/80 transition-all border border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-800/80 relative overflow-hidden"
              >
                View Statistics
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  buttonClickEffect(e);
                  navigateToIntro();
                }}
                className="button-hover-effect px-6 py-3 bg-white text-black rounded-lg font-medium flex items-center gap-2 hover:bg-white/80 transition-all border border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-800/80 relative overflow-hidden"
              >
                View Intro
                <Info className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
      
      {/* Scroll to top button - only shows when scrolled down */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
              buttonClickEffect(e);
              scrollToTop();
            }}
            className="fixed bottom-8 right-8 z-40 bg-[#5b2333] text-white dark:bg-white dark:text-black w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-[#5b2333]/90 dark:hover:bg-white/90 transition-colors relative overflow-hidden"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
