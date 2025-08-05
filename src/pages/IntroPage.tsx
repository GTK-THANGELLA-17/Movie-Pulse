import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import KeyBenefitsSection from "@/components/intro/KeyBenefitsSection";
import StatsButtonSection from "@/components/intro/StatsButtonSection";
import HowToUseSection from "@/components/intro/HowToUseSection";
import LatestTrends from "@/components/LatestTrends";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AudiencePulseChatbot from "@/components/intro/AudiencePulseChatbot";

const IntroPage = () => {
  const navigate = useNavigate();
  const [showChatbot, setShowChatbot] = useState(true); // Start as visible

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY < 100; // Show when near top, hide when scrolling
      setShowChatbot(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToHome = () => {
    navigate("/home");
  };

  const navigateToBenefits = () => {
    navigate("/benefits");
  };

  const navigateToStats = () => {
    navigate("/stats");
  };

  const navigateToVote = () => {
    navigate("/vote");
  };

  const buttonClickEffect = (e: any) => {
    // Add visual feedback for button clicks
    const button = e.currentTarget;
    button.style.transform = 'scale(0.98)';
    setTimeout(() => {
      button.style.transform = 'scale(1)';
    }, 150);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-800">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* Key Benefits Overview */}
      <KeyBenefitsSection />

      {/* Latest Entertainment Content Section */}
      <LatestTrends />

      {/* How to Use Section */}
      <HowToUseSection />

      {/* Navigation Section */}
      <section className="py-16 bg-gradient-to-r from-[#5b2333] to-[#983b55] text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Shape the Future of Content?</h2>
            <p className="text-xl mb-8 text-white/90">
              Explore our platform and discover how your voice can influence what gets made next
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
              <Button
                onClick={navigateToHome}
                size="lg"
                className="bg-white text-[#5b2333] hover:bg-gray-100 font-semibold flex items-center gap-2 min-w-[200px] border-0"
              >
                <Play className="w-5 h-5" />
                Explore Platform
                <ArrowRight className="w-4 h-4" />
              </Button>
              
              <Button
                onClick={navigateToBenefits}
                size="lg"
                variant="outline"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#5b2333] font-semibold flex items-center gap-2 min-w-[200px]"
              >
                Learn More Benefits
                <ArrowRight className="w-4 h-4" />
              </Button>
              
              <Button
                onClick={navigateToStats}
                size="lg"
                variant="outline"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#5b2333] font-semibold flex items-center gap-2 min-w-[200px]"
              >
                <BarChart3 className="w-5 h-5" />
                View Statistics
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Preview Section */}
      <StatsButtonSection navigateToStats={navigateToStats} buttonClickEffect={buttonClickEffect} />

      {/* Call to Action */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">Your Opinion Matters</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of viewers who are already shaping the future of entertainment. 
              Cast your vote and be part of the change you want to see in content creation.
            </p>
            <Button
              onClick={navigateToVote}
              size="lg"
              className="bg-gradient-to-r from-[#5b2333] to-[#983b55] hover:from-[#5b2333]/90 hover:to-[#983b55]/90 text-white font-semibold px-8 py-3"
            >
              Cast Your Opinion Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
      
      {/* AUDIENCE PULSE Chatbot - Only on Intro Page */}
      <AudiencePulseChatbot isVisible={showChatbot} />
    </div>
  );
};

export default IntroPage;
