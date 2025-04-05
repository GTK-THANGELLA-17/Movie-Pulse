
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import EnhancedDeveloperModal from "@/components/EnhancedDeveloperModal";
import PlatformVideo from "@/components/PlatformVideo";
import ImageSlideshow from "@/components/ImageSlideshow";
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
  ArrowUp
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
        
        {/* Key Benefits Section - Redesigned with new style */}
        <section className="py-16 w-full bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4 text-shimmer">Why MoviePulse?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform offers unique insights that help content creators make more informed decisions.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: <Star className="w-12 h-12 text-amber-500" />,
                  title: "Quality Insights",
                  description: "Understand what audiences value most in content through detailed feedback and preference analysis."
                },
                {
                  icon: <Clock className="w-12 h-12 text-blue-500" />,
                  title: "Real-time Data",
                  description: "Access up-to-the-minute audience preferences with our lightning-fast backend infrastructure."
                },
                {
                  icon: <TrendingUp className="w-12 h-12 text-green-500" />,
                  title: "Trend Analysis",
                  description: "Spot emerging content trends before competitors with our advanced analytics engine."
                },
                {
                  icon: <Award className="w-12 h-12 text-purple-500" />,
                  title: "Success Metrics",
                  description: "Measure what resonates most with your audience using comprehensive success indicators."
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
              Ready to Share Your Opinion?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-2xl mx-auto mb-8 text-white/90"
            >
              Join thousands of viewers who are shaping the future of entertainment. Your voice matters!
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
      
      {/* Scroll to top button - Only appears when scrolled down */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 bg-primary text-white dark:bg-white dark:text-black w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 dark:hover:bg-white/90 transition-colors"
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
