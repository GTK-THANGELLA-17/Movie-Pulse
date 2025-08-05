
import { useEffect, useState, useRef, lazy, Suspense } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingIndicator from "@/components/LoadingIndicator";
import WelcomeSection from "@/components/index/WelcomeSection";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Lazy load non-critical components
const About = lazy(() => import("@/components/About"));
const AboutPlatform = lazy(() => import("@/components/AboutPlatform"));
const CallToActionSection = lazy(() => import("@/components/index/CallToActionSection"));

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const votingSectionRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Reduce initial loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Handle navigation state scrolling
    if (location.state) {
      if (location.state.scrollToVotingSection && votingSectionRef.current) {
        setTimeout(() => {
          votingSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 600);
      } else if (location.state.scrollToSection === 'features' && featuresRef.current) {
        setTimeout(() => {
          featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 600);
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
  
  // Optimized button click effect
  const buttonClickEffect = (e: React.MouseEvent<HTMLButtonElement>) => {
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
    
    setTimeout(() => {
      circle.remove();
    }, 600);
  };
  
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-gray-800 w-full">
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
        `}
      </style>
      
      <AnimatePresence>
        {isLoading && <LoadingIndicator fullScreen message="Preparing your experience" />}
      </AnimatePresence>
      
      <Navbar />
      
      <WelcomeSection 
        navigateToVote={navigateToVote}
        navigateToStats={navigateToStats}
        buttonClickEffect={buttonClickEffect}
      />
      
      <Suspense fallback={<div className="py-20 text-center"><LoadingIndicator /></div>}>
        <AboutPlatform />
        
        <div id="features" ref={featuresRef}></div>
        <About />
        
        <section 
          id="voting-section" 
          ref={votingSectionRef}
        >
          <CallToActionSection 
            navigateToVote={navigateToVote}
            navigateToStats={navigateToStats}
            navigateToIntro={navigateToIntro}
            buttonClickEffect={buttonClickEffect}
          />
        </section>
      </Suspense>
      
      <Footer />
      
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              buttonClickEffect(e);
              scrollToTop();
            }}
            className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-primary to-primary/80 text-white dark:bg-gradient-to-r dark:from-white dark:to-white/80 dark:text-black w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden backdrop-blur-xl border border-white/20"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6 relative z-10" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
