
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatsContainer from "@/components/StatsContainer";
import LocalStatsDisplay from "@/components/LocalStatsDisplay";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RefreshCw, Database, Cloud } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StatsPage = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<string>("local");
  const [dataSource, setDataSource] = useState<string>("local");
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  const handleDataSourceChange = async (newSource: string) => {
    setIsRefreshing(true);
    setDataSource(newSource);
    
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Data Source Updated",
        description: `Switched to ${newSource === 'local' ? 'local' : 'remote'} data source successfully.`,
      });
    }, 1000);
  };

  const handleGlobalRefresh = async () => {
    setIsRefreshing(true);
    
    // Simulate global data refresh
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Data Refreshed",
        description: "All statistics have been updated with the latest data.",
      });
    }, 2000);
  };
  
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      
      {/* Content container */}
      <div className="container mx-auto px-4 pt-24 pb-16 flex-grow">
        <div className="max-w-7xl mx-auto">
          {/* Page Header with animations */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h1 className="text-4xl font-bold mb-4">Live Statistics</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real-time data visualization of audience preferences across different entertainment platforms.
            </p>
          </motion.div>
          
          {/* Stats content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Data Source Controls */}
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <div className="flex items-center gap-2">
                <Button 
                  className={`flex items-center gap-2 ${
                    dataSource === 'local' 
                      ? 'bg-[#5b2333] text-white dark:bg-white dark:text-black' 
                      : 'bg-white border border-gray-300 text-gray-800 dark:bg-gray-800 dark:text-white dark:border-gray-700'
                  }`}
                  onClick={() => handleDataSourceChange('local')}
                  disabled={isRefreshing}
                >
                  <Database className="w-4 h-4" />
                  Local Data
                </Button>
                <Button 
                  className={`flex items-center gap-2 ${
                    dataSource === 'server' 
                      ? 'bg-[#5b2333] text-white dark:bg-white dark:text-black' 
                      : 'bg-white border border-gray-300 text-gray-800 dark:bg-gray-800 dark:text-white dark:border-gray-700'
                  }`}
                  onClick={() => handleDataSourceChange('server')}
                  disabled={isRefreshing}
                >
                  <Cloud className="w-4 h-4" />
                  Remote Data
                </Button>
                <Button
                  variant="outline"
                  onClick={handleGlobalRefresh}
                  disabled={isRefreshing}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh All
                </Button>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              <button
                onClick={() => setActiveSection("local")}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeSection === "local" 
                    ? "bg-[#5b2333] text-white dark:bg-white dark:text-black" 
                    : "bg-white/70 text-black hover:bg-white dark:bg-gray-800/70 dark:text-white dark:hover:bg-gray-800"
                }`}
                disabled={isRefreshing}
              >
                Local Statistics
              </button>
              <button
                onClick={() => setActiveSection("films")}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeSection === "films" 
                    ? "bg-[#5b2333] text-white dark:bg-white dark:text-black" 
                    : "bg-white/70 text-black hover:bg-white dark:bg-gray-800/70 dark:text-white dark:hover:bg-gray-800"
                }`}
                disabled={isRefreshing}
              >
                🎬 Films
              </button>
              <button
                onClick={() => setActiveSection("youtube-films")}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeSection === "youtube-films" 
                    ? "bg-[#5b2333] text-white dark:bg-white dark:text-black" 
                    : "bg-white/70 text-black hover:bg-white dark:bg-gray-800/70 dark:text-white dark:hover:bg-gray-800"
                }`}
                disabled={isRefreshing}
              >
                🎥 YouTube Films
              </button>
              <button
                onClick={() => setActiveSection("youtube-content")}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeSection === "youtube-content" 
                    ? "bg-[#5b2333] text-white dark:bg-white dark:text-black" 
                    : "bg-white/70 text-black hover:bg-white dark:bg-gray-800/70 dark:text-white dark:hover:bg-gray-800"
                }`}
                disabled={isRefreshing}
              >
                📺 YouTube Content
              </button>
              <button
                onClick={() => setActiveSection("ott")}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeSection === "ott" 
                    ? "bg-[#5b2333] text-white dark:bg-white dark:text-black" 
                    : "bg-white/70 text-black hover:bg-white dark:bg-gray-800/70 dark:text-white dark:hover:bg-gray-800"
                }`}
                disabled={isRefreshing}
              >
                📱 OTT Platforms
              </button>
              <button
                onClick={() => setActiveSection("television")}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeSection === "television" 
                    ? "bg-[#5b2333] text-white dark:bg-white dark:text-black" 
                    : "bg-white/70 text-black hover:bg-white dark:bg-gray-800/70 dark:text-white dark:hover:bg-gray-800"
                }`}
                disabled={isRefreshing}
              >
                📻 Television
              </button>
            </motion.div>
            
            {activeSection === "local" ? (
              <LocalStatsDisplay />
            ) : (
              <StatsContainer activeSection={activeSection} />
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StatsPage;
