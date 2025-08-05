
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Vote, BarChart3, ArrowRight } from "lucide-react";

interface CTAButtonsProps {
  navigateToVote: () => void;
  navigateToStats: () => void;
  navigateToIntro: () => void;
  buttonClickEffect: (e: any) => void;
}

const CTAButtons = ({ navigateToVote, navigateToStats, navigateToIntro, buttonClickEffect }: CTAButtonsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
    >
      {/* Vote Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={(e) => {
            buttonClickEffect(e);
            navigateToVote();
          }}
          className="bg-white text-primary hover:bg-gray-100 font-bold px-10 py-4 text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group border-2 border-white/20"
          size="lg"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="mr-3"
          >
            <Vote className="w-6 h-6 text-primary" />
          </motion.div>
          <span className="text-primary font-bold">Share Your Opinion</span>
          <ArrowRight className="w-5 h-5 ml-2 text-primary group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>

      {/* Stats Button with enhanced contrast */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={(e) => {
            buttonClickEffect(e);
            navigateToStats();
          }}
          className="bg-white text-primary hover:bg-gray-100 font-bold px-10 py-4 text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group border-2 border-white/30 relative overflow-hidden"
          size="lg"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="mr-3"
          >
            <BarChart3 className="w-6 h-6 text-primary font-bold" />
          </motion.div>
          <span className="text-primary font-black drop-shadow-sm relative z-10">View Live Statistics</span>
          <ArrowRight className="w-5 h-5 ml-2 text-primary group-hover:translate-x-1 transition-transform font-bold" />
          
          {/* Enhanced background for better contrast */}
          <div className="absolute inset-0 bg-white/95 rounded-full -z-10" />
          
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default CTAButtons;
