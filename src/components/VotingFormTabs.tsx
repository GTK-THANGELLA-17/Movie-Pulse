
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VotingFormTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const VotingFormTabs = ({ activeTab, onTabChange }: VotingFormTabsProps) => {
  const isMobile = useIsMobile();

  const tabs = [
    { id: "films", label: "Films" },
    { id: "ytFilms", label: "YT Films" },
    { id: "youtubeContent", label: "YT Content" },
    { id: "ott", label: "OTT" },
    { id: "tv", label: "TV" }
  ];

  return (
    <div className="mb-6">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        {isMobile ? (
          <div className="relative mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Select Category
            </label>
            <Select value={activeTab} onValueChange={onTabChange}>
              <SelectTrigger className="w-full bg-white dark:bg-gray-800 text-foreground border-2 border-input shadow-lg">
                <SelectValue placeholder="Select a voting category" />
              </SelectTrigger>
              <SelectContent 
                className="z-[100] bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 shadow-lg"
              >
                {tabs.map((tab) => (
                  <SelectItem 
                    key={tab.id} 
                    value={tab.id} 
                    className="py-4 my-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                  >
                    <div className="flex items-center gap-2">
                      {tab.id === "films" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-film">
                          <rect width="18" height="18" x="3" y="3" rx="2" />
                          <path d="M7 3v18" />
                          <path d="M3 7h18" />
                          <path d="M3 12h18" />
                          <path d="M3 17h18" />
                          <path d="M17 3v18" />
                        </svg>
                      )}
                      {tab.id === "ytFilms" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m22 8-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                          <path d="M18 8h-6V2" />
                          <circle cx="10" cy="14" r="2" />
                          <path d="m14 17.5 1.2-1.6c.8-1.1 2.1-1.1 2.8 0l1.2 1.6" />
                        </svg>
                      )}
                      {tab.id === "youtubeContent" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                        </svg>
                      )}
                      {tab.id === "ott" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
                          <polyline points="17 2 12 7 7 2" />
                        </svg>
                      )}
                      {tab.id === "tv" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tv">
                          <rect width="20" height="15" x="2" y="7" rx="2" ry="2" />
                          <polyline points="17 2 12 7 7 2" />
                        </svg>
                      )}
                      <span className="font-medium text-base">{tab.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <TabsList className="w-full">
            {tabs.map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="relative py-2 px-4 h-12"
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    layoutId="tabIndicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        )}
      </Tabs>
    </div>
  );
};

export default VotingFormTabs;
