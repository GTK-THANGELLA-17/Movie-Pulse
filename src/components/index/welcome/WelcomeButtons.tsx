
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, BarChart3 } from "lucide-react";

interface WelcomeButtonsProps {
  navigateToVote: () => void;
  navigateToStats: () => void;
  buttonClickEffect: (e: any) => void;
}

const WelcomeButtons = ({ navigateToVote, navigateToStats, buttonClickEffect }: WelcomeButtonsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.9 }}
      className="flex flex-col sm:flex-row gap-6"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={(e) => {
            buttonClickEffect(e);
            navigateToVote(); 
          }}
          className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:via-primary/80 hover:to-primary/70 text-white rounded-2xl relative overflow-hidden group transition-all duration-500 shadow-2xl shadow-primary/25 hover:shadow-primary/40 border-0 px-10 py-6 text-lg font-semibold"
          size="lg"
        >
          <span className="relative z-10 flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
            Cast Your Opinion
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
            >
              <ArrowRight className="w-6 h-6" />
            </motion.div>
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
        </Button>
      </motion.div>
      
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={(e) => {
            buttonClickEffect(e);
            navigateToStats();
          }}
          variant="outline"
          className="border-2 border-primary/30 dark:border-white/30 text-primary dark:text-white hover:bg-primary/5 dark:hover:bg-white/5 rounded-2xl group relative overflow-hidden backdrop-blur-sm bg-white/50 dark:bg-black/50 px-10 py-6 text-lg font-semibold transition-all duration-500 hover:border-primary/60 dark:hover:border-white/60"
          size="lg"
        >
          <span className="relative z-10 flex items-center gap-3">
            <BarChart3 className="w-6 h-6" />
            View Live Statistics
          </span>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeButtons;
