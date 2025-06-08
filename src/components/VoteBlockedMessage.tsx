
import { motion } from "framer-motion";
import { Lock, RotateCcw } from "lucide-react";

interface VoteBlockedMessageProps {
  category: string;
}

const VoteBlockedMessage = ({ category }: VoteBlockedMessageProps) => {
  const getCategoryName = () => {
    switch (category) {
      case 'films':
        return 'Films';
      case 'ytFilms':
        return 'YouTube Films';
      case 'youtubeContent':
        return 'YouTube Content';
      case 'ott':
        return 'OTT Platforms';
      case 'tv':
        return 'Television';
      default:
        return 'this category';
    }
  };

  return (
    <motion.div
      className="p-6 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start gap-4">
        <motion.div
          className="bg-amber-100 dark:bg-amber-800/30 p-3 rounded-full"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Lock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
        </motion.div>
        
        <div className="flex-1">
          <motion.h3
            className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Already Voted in {getCategoryName()}
          </motion.h3>
          
          <motion.p
            className="text-amber-700 dark:text-amber-300 mb-4"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            You've already cast your opinion in this category. You can't vote again until the next session.
          </motion.p>
          
          <motion.div
            className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <RotateCcw className="w-4 h-4" />
            <span>New voting session starts when you clear your browser data or use a different device</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default VoteBlockedMessage;
