
import { motion } from "framer-motion";
import { Check, Sparkles, Heart } from "lucide-react";

interface VoteSuccessAnimationProps {
  onComplete?: () => void;
  projectType?: string;
}

const VoteSuccessAnimation = ({ onComplete, projectType }: VoteSuccessAnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onComplete}
    >
      <motion.div
        initial={{ scale: 0, rotateX: 90, y: 100 }}
        animate={{ scale: 1, rotateX: 0, y: 0 }}
        exit={{ scale: 0, rotateX: -90, y: -100 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 20,
          duration: 0.6
        }}
        className="relative bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-sm mx-4 text-center shadow-2xl border-2 border-green-200 dark:border-green-800"
      >
        {/* Background Sparkles with staggered animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ 
                opacity: [0, 1, 0], 
                scale: [0, 1, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                delay: 0.3 + i * 0.1, 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <Sparkles className="w-3 h-3 text-yellow-400" />
            </motion.div>
          ))}
        </div>

        {/* Success Icon with enhanced animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            delay: 0.2, 
            type: "spring", 
            stiffness: 300,
            damping: 15
          }}
          className="relative mx-auto w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 400 }}
          >
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </motion.div>
          
          {/* Multiple Pulse Rings */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ 
                delay: 0.7 + i * 0.3, 
                duration: 1.5, 
                repeat: Infinity,
                repeatDelay: 2
              }}
              className="absolute inset-0 bg-green-400 rounded-full"
            />
          ))}
        </motion.div>

        {/* Success Message with typewriter effect */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
        >
          ✅ Opinion Submitted!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-gray-600 dark:text-gray-300 mb-4 text-sm"
        >
          Thank you for sharing your preference for {projectType || 'this content'}!
        </motion.p>

        {/* Floating Hearts */}
        <div className="flex justify-center mb-6">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, y: 0 }}
              animate={{ 
                opacity: [0, 1, 0], 
                scale: [0, 1, 0],
                y: [0, -20, -40]
              }}
              transition={{ 
                delay: 1.2 + i * 0.2, 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="mx-1"
            >
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </motion.div>
          ))}
        </div>

        {/* Continue Button with hover effects */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="px-6 py-3 bg-gradient-to-r from-[#5b2333] to-[#8b3a52] text-white rounded-full hover:from-[#6b2833] hover:to-[#9b4a62] transition-all shadow-lg font-medium"
        >
          Continue
        </motion.button>

        {/* Auto close progress bar */}
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ delay: 2, duration: 4, ease: "linear" }}
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-b-2xl"
          onAnimationComplete={onComplete}
        />
      </motion.div>
    </motion.div>
  );
};

export default VoteSuccessAnimation;
