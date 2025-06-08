
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import AboutPlatform from "@/components/AboutPlatform";
import EnhancedDeveloperModal from "@/components/EnhancedDeveloperModal";
import PlatformVideo from "@/components/PlatformVideo";
import ImageSlideshow from "@/components/ImageSlideshow";
import LatestTrends from "@/components/LatestTrends";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import LoadingIndicator from "@/components/LoadingIndicator";
import { 
  Play, 
  Star, 
  Clock, 
  TrendingUp, 
  Award, 
  ChevronRight,
  ArrowUp,
  BarChart3
} from "lucide-react";

const IntroPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const navigateToVote = () => {
    navigate("/vote");
  };

  const navigateToStats = () => {
    navigate("/stats");
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  // Button click animation effect
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
  
  if (isLoading) {
    return <LoadingIndicator fullScreen message="Preparing MoviePulse..." />;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-[#f7f4f3] dark:bg-black overflow-x-hidden w-full">
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
        
        .floating-card {
          animation: floating 6s ease-in-out infinite;
        }
        
        @keyframes floating {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        
        .tech-badge {
          transition: all 0.3s ease;
        }
        
        .tech-badge:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .text-shimmer {
          background: linear-gradient(
            to right,
            var(--primary) 0%,
            rgba(255, 255, 255, 0.8) 20%,
            var(--primary) 40%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textShimmer 3s linear infinite;
        }
        
        @keyframes textShimmer {
          to {
            background-position: 200% center;
          }
        }
        
        .gradient-bg-light {
          background: linear-gradient(120deg, #f7f4f3 0%, #eae7e6 100%);
        }
        
        .gradient-bg-dark {
          background: linear-gradient(120deg, #1a1a1a 0%, #2a2a2a 100%);
        }

        .stats-button {
          background: linear-gradient(45deg, #5b2333, #983b55, #c45973);
          background-size: 300% 300%;
          animation: statsButtonGradient 3s ease infinite, statsButtonPulse 2s ease-in-out infinite;
          box-shadow: 0 4px 15px rgba(91, 35, 51, 0.4);
          position: relative;
          overflow: hidden;
        }

        .stats-button::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
          transform: rotate(45deg);
          animation: statsButtonShine 3s ease-in-out infinite;
        }

        @keyframes statsButtonGradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes statsButtonPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes statsButtonShine {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          50% { transform: translateX(100%) translateY(100%) rotate(45deg); }
          100% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
        }

        .stats-button:hover {
          animation-play-state: paused;
          transform: scale(1.1);
          box-shadow: 0 8px 25px rgba(91, 35, 51, 0.6);
        }
        `}
      </style>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow"
      >
        <Hero />
        
        {/* Enhanced View Live Statistics Button Section */}
        <section className="py-16 w-full bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                See What the World is Watching
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Discover real-time insights into global entertainment preferences. Explore trending content, demographic patterns, and audience opinions across all platforms.
              </p>
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <Button
                  onClick={(e) => {
                    buttonClickEffect(e);
                    navigateToStats();
                  }}
                  className="stats-button text-white font-bold px-8 py-6 text-lg rounded-full relative overflow-hidden border-0 hover:border-0"
                  size="lg"
                >
                  <BarChart3 className="w-6 h-6 mr-2 relative z-10" />
                  <span className="relative z-10">View Live Statistics</span>
                </Button>
                
                {/* Animated decorative elements */}
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut"
                  }}
                  className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-70"
                />
                <motion.div
                  animate={{ 
                    rotate: [360, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full opacity-70"
                />
              </motion.div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {[
                  { icon: "📊", title: "Real-time Data", desc: "Live statistics updated continuously" },
                  { icon: "🌍", title: "Global Insights", desc: "Worldwide entertainment trends" },
                  { icon: "🎯", title: "Smart Filtering", desc: "Customizable data views" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm"
                  >
                    <div className="text-3xl mb-2">{feature.icon}</div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Comprehensive About Platform Section */}
        <AboutPlatform />
        
        {/* Key Benefits Section */}
        <section className="py-16 w-full bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4 text-shimmer">Why Choose MoviePulse?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform offers unique insights that revolutionize how content creators understand and respond to audience preferences.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: <Star className="w-12 h-12 text-amber-500" />,
                  title: "Quality Insights",
                  description: "Understand what audiences value most in content through detailed feedback and comprehensive preference analysis across all entertainment platforms."
                },
                {
                  icon: <Clock className="w-12 h-12 text-blue-500" />,
                  title: "Real-time Data",
                  description: "Access up-to-the-minute audience preferences with our lightning-fast backend infrastructure and instant data processing capabilities."
                },
                {
                  icon: <TrendingUp className="w-12 h-12 text-green-500" />,
                  title: "Trend Analysis",
                  description: "Spot emerging content trends before competitors with our advanced analytics engine and predictive modeling algorithms."
                },
                {
                  icon: <Award className="w-12 h-12 text-purple-500" />,
                  title: "Success Metrics",
                  description: "Measure what resonates most with your audience using comprehensive success indicators and detailed performance analytics."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-6 p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <motion.div 
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center"
                  >
                    {item.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                    <motion.button
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                      onClick={(e) => buttonClickEffect(e)}
                      className="mt-3 text-primary flex items-center gap-1 relative overflow-hidden"
                    >
                      Learn more <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Add the new Latest Trends section here */}
        <LatestTrends />
        
        <ImageSlideshow />
        <FeaturesSection />
        <PlatformVideo />
        
        {/* Call to Action Section */}
        <section className="py-20 dark:bg-gradient-to-r dark:from-primary dark:to-primary/80 bg-gradient-to-r from-[#5b2333] to-[#983b55] text-white w-full">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Ready to Shape the Future of Entertainment?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-2xl mx-auto mb-8 text-white/90"
            >
              Join thousands of viewers worldwide who are actively shaping the future of entertainment across all platforms. Your voice matters in creating the content landscape of tomorrow!
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                onClick={(e) => {
                  buttonClickEffect(e);
                  navigateToVote();
                }}
                className="bg-white text-primary hover:bg-white/90 relative overflow-hidden px-8 py-6 rounded-full"
                size="lg"
              >
                Cast Your Opinion Now
              </Button>
            </motion.div>
          </div>
        </section>
        
        <EnhancedDeveloperModal isOpen={isModalOpen} onClose={closeModal} />
      </motion.div>
      <Footer onDeveloperClick={openModal} />
      
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 bg-[#5b2333] text-white dark:bg-white dark:text-black w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-[#5b2333]/90 dark:hover:bg-white/90 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntroPage;
