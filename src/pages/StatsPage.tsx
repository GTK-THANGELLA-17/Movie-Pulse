
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatsContainer from "@/components/StatsContainer";
import { motion } from "framer-motion";

const StatsPage = () => {
  const [activeSection, setActiveSection] = useState<string>("films");
  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-[#f7f4f3] dark:bg-black">
      <Navbar />
      <div className="pt-16 pb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="heading-xl bg-clip-text text-transparent bg-gradient-to-r from-[#5b2333] to-[#5b2333]/70 dark:from-white dark:to-white/80">
              Statistics & Insights
            </h1>
            <p className="body-lg text-black dark:text-white max-w-2xl mx-auto mt-4">
              Explore real-time statistics on audience preferences across different mediums including films, YouTube content, OTT platforms, and television.
              These insights help content creators make data-driven decisions for better engagement.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <button
              onClick={() => setActiveSection("films")}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeSection === "films" 
                  ? "bg-[#5b2333] text-white dark:bg-white dark:text-black" 
                  : "bg-white/70 text-black hover:bg-white dark:bg-gray-800/70 dark:text-white dark:hover:bg-gray-800"
              }`}
            >
              Films
            </button>
            <button
              onClick={() => setActiveSection("youtube")}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeSection === "youtube" 
                  ? "bg-[#5b2333] text-white dark:bg-white dark:text-black" 
                  : "bg-white/70 text-black hover:bg-white dark:bg-gray-800/70 dark:text-white dark:hover:bg-gray-800"
              }`}
            >
              YouTube
            </button>
            <button
              onClick={() => setActiveSection("ott")}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeSection === "ott" 
                  ? "bg-[#5b2333] text-white dark:bg-white dark:text-black" 
                  : "bg-white/70 text-black hover:bg-white dark:bg-gray-800/70 dark:text-white dark:hover:bg-gray-800"
              }`}
            >
              OTT Platforms
            </button>
            <button
              onClick={() => setActiveSection("television")}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeSection === "television" 
                  ? "bg-[#5b2333] text-white dark:bg-white dark:text-black" 
                  : "bg-white/70 text-black hover:bg-white dark:bg-gray-800/70 dark:text-white dark:hover:bg-gray-800"
              }`}
            >
              Television
            </button>
          </motion.div>
          
          <StatsContainer activeSection={activeSection} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StatsPage;
