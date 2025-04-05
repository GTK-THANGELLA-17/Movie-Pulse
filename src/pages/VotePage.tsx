
import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import VotingForm from "@/components/VotingForm";
import { motion } from "framer-motion";
import { useVotingPeriod } from "@/contexts/VotingPeriodContext";
import { Calendar, AlertCircle, Info, Clock, ChevronDown } from "lucide-react";
import { ThreeDButton } from "@/components/ui/aceternity/3d-button";
import { TextShimmer } from "@/components/ui/aceternity/text-shimmer";
import { ParallaxSection } from "@/components/ui/aceternity/parallax-section";
import { ThreeDCard } from "@/components/ui/aceternity/3d-card";
import { GradientBackground } from "@/components/ui/aceternity/gradient-background";

const VotePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isVotingActive, remainingDays } = useVotingPeriod();
  
  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    return () => clearTimeout(timer);
  }, []);
  
  const scrollToVotingForm = () => {
    const votingForm = document.getElementById('voting-form');
    if (votingForm) {
      votingForm.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <PageLayout>
      <GradientBackground colors={["#5b2333", "#983b55", "#ff719A"]} blur={150} className="py-16">
        <div className="container mx-auto px-4 pb-20">
          <div className="text-center mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="heading-xl"
            >
              <TextShimmer>Cast Your Opinion</TextShimmer>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="body-lg text-black dark:text-white max-w-2xl mx-auto mt-4"
            >
              Help shape the future of entertainment by sharing your content preferences across films, TV shows, YouTube videos, and streaming platforms.
              Your opinion helps creators understand audience interests better.
            </motion.p>
            
            <div className="flex justify-center mt-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <ThreeDButton
                  onClick={scrollToVotingForm}
                  className="flex items-center gap-2 animate-pulse"
                >
                  Cast Your Opinion Now
                  <ChevronDown className="w-5 h-5" />
                </ThreeDButton>
              </motion.div>
            </div>
          </div>
          
          <ParallaxSection offsetMultiplier={0.1} className="max-w-3xl mx-auto">
            <ThreeDCard className="max-w-3xl mx-auto mb-10 p-5 rounded-xl bg-white/60 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-[#5b2333] dark:text-white mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-lg mb-1 text-[#5b2333] dark:text-white">Voting Rules</h3>
                  <p className="text-black dark:text-white/80 text-sm mb-3">
                    To ensure accurate data collection, each user can only vote once per category 
                    (Films, YouTube Films, YouTube Content, OTT, Television) during a voting period. This helps us maintain data 
                    quality and ensures that content creators receive balanced feedback.
                  </p>
                  
                  <div className="p-3 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 mt-2">
                    <ul className="text-sm space-y-2 text-black dark:text-white/80">
                      <li className="flex items-start gap-2">
                        <span className="inline-flex items-center justify-center min-w-6 h-6 rounded-full bg-[#5b2333] text-white dark:bg-white dark:text-black text-xs font-medium">1</span>
                        <span>You can share your opinion once in <span className="font-medium text-black dark:text-white">Films</span>, once in <span className="font-medium text-black dark:text-white">YouTube Films</span>, once in <span className="font-medium text-black dark:text-white">YouTube Content</span>, once in <span className="font-medium text-black dark:text-white">OTT</span>, and once in <span className="font-medium text-black dark:text-white">Television</span> categories per voting period.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="inline-flex items-center justify-center min-w-6 h-6 rounded-full bg-[#5b2333] text-white dark:bg-white dark:text-black text-xs font-medium">2</span>
                        <span>After sharing your opinion in a category, you'll need to wait until the next voting period to vote in that category again.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="inline-flex items-center justify-center min-w-6 h-6 rounded-full bg-[#5b2333] text-white dark:bg-white dark:text-black text-xs font-medium">3</span>
                        <span>Your opinion matters and helps creators make better content decisions based on authentic audience preferences.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-[#5b2333] dark:text-white" />
                    <span>
                      {isVotingActive ? (
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          Current voting period is active with {remainingDays} days remaining.
                        </span>
                      ) : (
                        <span className="text-red-600 dark:text-red-400 font-medium">
                          Voting is currently closed. Check back soon for the next voting period.
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </ThreeDCard>
          </ParallaxSection>
          
          <div id="voting-form" className="pt-4">
            <VotingForm />
          </div>
        </div>
      </GradientBackground>
    </PageLayout>
  );
};

export default VotePage;
