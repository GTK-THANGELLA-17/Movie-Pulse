
import { motion } from "framer-motion";
import WelcomeBackground from "./welcome/WelcomeBackground";
import WelcomeBadge from "./welcome/WelcomeBadge";
import WelcomeTitle from "./welcome/WelcomeTitle";
import WelcomeDescription from "./welcome/WelcomeDescription";
import PlatformIcons from "./welcome/PlatformIcons";
import WelcomeButtons from "./welcome/WelcomeButtons";
import FeaturePills from "./welcome/FeaturePills";
import WelcomeVisual from "./welcome/WelcomeVisual";

interface WelcomeSectionProps {
  navigateToVote: () => void;
  navigateToStats: () => void;
  buttonClickEffect: (e: any) => void;
}

const WelcomeSection = ({ navigateToVote, navigateToStats, buttonClickEffect }: WelcomeSectionProps) => {
  return (
    <section id="hero" className="pt-32 pb-32 relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-gray-800">
      <WelcomeBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Content Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 space-y-8"
          >
            <WelcomeBadge />
            <WelcomeTitle />
            <WelcomeDescription />
            <PlatformIcons />
            <WelcomeButtons 
              navigateToVote={navigateToVote}
              navigateToStats={navigateToStats}
              buttonClickEffect={buttonClickEffect}
            />
            <FeaturePills />
          </motion.div>
          
          {/* Visual Section */}
          <WelcomeVisual />
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
