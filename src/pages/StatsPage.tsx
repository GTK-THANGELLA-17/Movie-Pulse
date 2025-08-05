import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatsContainer from "@/components/StatsContainer";
import LocalStatsDisplay from "@/components/LocalStatsDisplay";
import BackendDiagnostic from "@/components/BackendDiagnostic";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RefreshCw, Database, Cloud, Filter, FilterX, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StatsPage = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<string>("local");
  const [dataSource, setDataSource] = useState<"local" | "server">("local");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDataSourceChange = async (newSource: "local" | "server") => {
    setIsRefreshing(true);
    setDataSource(newSource);
    
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
    
    if (activeSection === "local" || dataSource === "local") {
      window.dispatchEvent(new CustomEvent('refreshLocalStats'));
    } else {
      window.dispatchEvent(new CustomEvent('refreshAllStats'));
    }
    
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Data Refreshed",
        description: "All statistics have been updated with the latest data.",
      });
    }, 2000);
  };

  const sectionButtons = [
    { id: "local", label: "Local Statistics", emoji: "📊" },
    { id: "films", label: "Films", emoji: "🎬" },
    { id: "youtube-films", label: "YouTube Films", emoji: "🎥" },
    { id: "youtube-content", label: "YouTube Content", emoji: "📺" },
    { id: "instagram-content", label: "Instagram Content", emoji: "📸" },
    { id: "ott", label: "OTT Platforms", emoji: "📱" },
    { id: "television", label: "Television", emoji: "📻" },
    { id: "music", label: "Music", emoji: "🎵" },
    
  ];

  // Determine if we should use local display for music sections when data source is local
  const shouldUseLocalDisplay = (section: string) => {
    return section === "local" || (dataSource === "local" && section === "music");
  };

  // Handle diagnostic section
  const isDiagnosticSection = activeSection === "diagnostic";
  
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16 flex-grow">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Live Audience Pulse</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
              Real-time insights into what audiences want before stories are made. See the pulse that gives courage to creators and shapes tomorrow's entertainment.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Data Source Controls and Filter Toggle */}
            <div className="flex flex-wrap gap-2 md:gap-4 justify-center mb-8">
              <div className="flex flex-wrap items-center gap-2">
                {/* Filter Toggle */}
                <Button 
                  className="flex items-center gap-2 text-sm bg-white border border-gray-300 text-gray-800 dark:bg-gray-800 dark:text-white dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  {showFilters ? <FilterX className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
                  <span className="hidden sm:inline">{showFilters ? 'Hide' : 'Show'} Filters</span>
                  <span className="sm:hidden">{showFilters ? 'Hide' : 'Show'}</span>
                </Button>


                {/* Data Source Controls - Only show when not on local section and not music with local data and not diagnostic */}
                {activeSection !== "local" && !shouldUseLocalDisplay(activeSection) && !isDiagnosticSection && (
                  <>
                    <Button 
                      className={`flex items-center gap-2 text-sm ${
                        dataSource === 'local' 
                          ? 'bg-[#5b2333] text-white dark:bg-white dark:text-black' 
                          : 'bg-white border border-gray-300 text-gray-800 dark:bg-gray-800 dark:text-white dark:border-gray-700'
                      }`}
                      onClick={() => handleDataSourceChange('local')}
                      disabled={isRefreshing}
                    >
                      <Database className="w-4 h-4" />
                      <span className="hidden sm:inline">Local Data</span>
                    </Button>

                    <Button 
                      className={`flex items-center gap-2 text-sm ${
                        dataSource === 'server' 
                          ? 'bg-[#5b2333] text-white dark:bg-white dark:text-black' 
                          : 'bg-white border border-gray-300 text-gray-800 dark:bg-gray-800 dark:text-white dark:border-gray-700'
                      }`}
                      onClick={() => handleDataSourceChange('server')}
                      disabled={isRefreshing}
                    >
                      <Cloud className="w-4 h-4" />
                      <span className="hidden sm:inline">Server Data</span>
                    </Button>
                  </>
                )}

                {/* Refresh Button */}
                <Button 
                  className="flex items-center gap-2 text-sm bg-white border border-gray-300 text-gray-800 dark:bg-gray-800 dark:text-white dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={handleGlobalRefresh}
                  disabled={isRefreshing}
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </Button>
              </div>
            </div>

            {/* Section Navigation Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-2 mb-8">
              {sectionButtons.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "outline"}
                  className={`flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs transition-all duration-200 ${
                    activeSection === section.id 
                      ? 'bg-[#5b2333] text-white dark:bg-white dark:text-black border-[#5b2333] shadow-lg scale-105' 
                      : 'hover:bg-[#5b2333]/10 hover:border-[#5b2333]/30'
                  }`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <span className="text-lg mb-1">{section.emoji}</span>
                  <span className="text-center leading-tight font-medium">{section.label}</span>
                </Button>
              ))}
            </div>


            {/* Stats Content */}
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
              {isDiagnosticSection ? (
                <div className="p-6">
                  <BackendDiagnostic />
                </div>
              ) : shouldUseLocalDisplay(activeSection) ? (
                <LocalStatsDisplay showFilters={showFilters} sectionType={activeSection} />
              ) : (
                <StatsContainer 
                  activeSection={activeSection} 
                  dataSource={dataSource}
                  showFilters={showFilters}
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default StatsPage;
