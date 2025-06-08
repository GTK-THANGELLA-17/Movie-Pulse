import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { motion, AnimatePresence } from "framer-motion";
import { useVotingPeriod } from "@/contexts/VotingPeriodContext";
import { Info, Clock, ChevronDown, Globe } from "lucide-react";
import { ThreeDButton } from "@/components/ui/aceternity/3d-button";
import { TextShimmer } from "@/components/ui/aceternity/text-shimmer";
import { ParallaxSection } from "@/components/ui/aceternity/parallax-section";
import { ThreeDCard } from "@/components/ui/aceternity/3d-card";
import { GradientBackground } from "@/components/ui/aceternity/gradient-background";
import SocialShare from "@/components/SocialShare";
import AppSocialShare from "@/components/AppSocialShare";
import SmartLoader from "@/components/SmartLoader";
import VotingForm from "@/components/VotingForm";
import VotingFormTabs from "@/components/VotingFormTabs";
import { useVotingFormPatches } from "@/lib/updateVotingForm";
import VoteSuccessAnimation from "@/components/VoteSuccessAnimation";

const VotePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isVotingActive, remainingDays } = useVotingPeriod();
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [selectedProjectType, setSelectedProjectType] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); // Added missing state
  
  // Apply voting form patches
  useVotingFormPatches();
  
  useEffect(() => {
    // Faster loading experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);
    
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
  
  // Update the submitVote function to show the animation
  const submitVote = async (data) => {
    try {
      // Basic form validation
      if (!data || Object.keys(data).length === 0) {
        console.error("No data received in submitVote function.");
        return;
      }
      
      // Store the project type for the success message
      setSelectedProjectType(data.contentType);
      
      // Submit the data to the API
      // await submitVoteData(data);
      
      // Show the success animation instead of just setting isSubmitted
      setShowSuccessAnimation(true);
      
      // Log the data to the console for debugging
      console.log("Voting data submitted:", data);
      
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };
  
  const handleAnimationComplete = () => {
    setShowSuccessAnimation(false);
    setIsSubmitted(true);
  };
  
  return (
    <PageLayout>
      <GradientBackground colors={["#5b2333", "#983b55", "#ff719A"]} blur={150} className="py-16">
        <div className="container mx-auto px-4 pb-20">
          <div className="text-center mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              className="heading-xl"
            >
              <TextShimmer>Cast Your Opinion</TextShimmer>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="body-lg text-black dark:text-white max-w-2xl mx-auto mt-4"
            >
              Help shape the future of entertainment by sharing your content preferences across films, TV shows, YouTube videos, and streaming platforms.
              Your opinion helps creators understand audience interests better.
            </motion.p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
              >
                <ThreeDButton
                  onClick={scrollToVotingForm}
                  className="flex items-center gap-2"
                >
                  <span className="animate-pulse">Cast Your Opinion Now</span>
                  <ChevronDown className="w-5 h-5" />
                </ThreeDButton>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <AppSocialShare variant="button" />
              </motion.div>
            </div>
          </div>
          
          <ParallaxSection offsetMultiplier={0.1} className="max-w-3xl mx-auto">
            <ThreeDCard className="max-w-3xl mx-auto mb-10 p-5 rounded-xl bg-white/60 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Info className="w-6 h-6 text-[#5b2333] dark:text-white mt-1 flex-shrink-0" />
                </motion.div>
                <div>
                  <motion.h3 
                    className="font-medium text-lg mb-1 text-[#5b2333] dark:text-white"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    How to Use
                  </motion.h3>
                  <motion.p 
                    className="text-black dark:text-white/80 text-sm mb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    Use the tabs below to switch between different content categories (Films, YouTube Films, YouTube Content, OTT, TV) 
                    and share your preferences. Each category allows you to vote once per voting period.
                  </motion.p>
                  
                  <motion.div 
                    className="mt-4 flex items-center gap-2 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.5 }}
                  >
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
                  </motion.div>
                  
                  <motion.div 
                    className="mt-6 flex items-center justify-between"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                  >
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="w-4 h-4 text-[#5b2333] dark:text-white" />
                      <span className="text-black dark:text-white font-medium">Share globally:</span>
                    </div>
                    <AppSocialShare variant="icon" />
                  </motion.div>
                </div>
              </div>
            </ThreeDCard>
          </ParallaxSection>
          
          <div id="voting-form" className="pt-4">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center py-16"
                >
                  <SmartLoader message="Preparing voting form..." size="large" />
                </motion.div>
              ) : (
                <motion.div
                  key="votingForm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <VotingFormTabs onSubmit={submitVote} isSubmitted={isSubmitted} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Vote Success Animation */}
          <AnimatePresence>
            {showSuccessAnimation && (
              <VoteSuccessAnimation 
                onComplete={handleAnimationComplete} 
                projectType={selectedProjectType}
              />
            )}
          </AnimatePresence>
        </div>
      </GradientBackground>
    </PageLayout>
  );
};

export default VotePage;
