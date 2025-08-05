
import { motion } from "framer-motion";
import { Check, Sparkles, Heart, Star } from "lucide-react";

interface VoteSuccessAnimationProps {
  onComplete?: () => void;
  projectType?: string;
}

const VoteSuccessAnimation = ({ onComplete, projectType }: VoteSuccessAnimationProps) => {
  const inspiringQuotes = [
    "Your voice shapes the future of entertainment",
    "Every opinion matters in creating better content",
    "You're helping creators understand what audiences truly want",
    "Your preference is a building block for the next big hit",
    "Together, we're revolutionizing how content is created",
    "Your insight could inspire the next masterpiece"
  ];

  const randomQuote = inspiringQuotes[Math.floor(Math.random() * inspiringQuotes.length)];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onComplete}
    >
      <motion.div
        initial={{ scale: 0, rotateX: 90, y: 100, rotateY: 180 }}
        animate={{ 
          scale: 1, 
          rotateX: 0, 
          y: 0,
          rotateY: 0
        }}
        exit={{ 
          scale: 0, 
          rotateX: -90, 
          y: -100,
          opacity: 0
        }}
        transition={{ 
          duration: 0.8,
          ease: "easeOut"
        }}
        className="relative bg-white dark:bg-gray-900 rounded-3xl p-10 max-w-sm mx-4 text-center shadow-2xl border-2 border-green-200 dark:border-green-800 overflow-hidden transform-gpu backdrop-blur-lg bg-gradient-to-br from-white/90 to-green-50/90 dark:from-gray-900/90 dark:to-green-900/20"
      >
        {/* Enhanced Background Sparkles with more particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ 
                opacity: [0, 1, 0], 
                scale: [0, 1.5, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                delay: 0.3 + i * 0.08, 
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut"
              }}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              {i % 3 === 0 ? (
                <Sparkles className="w-3 h-3 text-yellow-400" />
              ) : i % 3 === 1 ? (
                <Star className="w-2 h-2 text-blue-400" />
              ) : (
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Animated gradient background */}
        <motion.div
          animate={{
            background: [
              "linear-gradient(45deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1))",
              "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
              "linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(34, 197, 94, 0.1))"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 rounded-3xl"
        />

        {/* Success Icon with enhanced animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            delay: 0.2, 
            duration: 0.6,
            ease: "easeOut"
          }}
          className="relative mx-auto w-24 h-24 bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full flex items-center justify-center mb-8 shadow-2xl"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
          >
            <Check className="w-12 h-12 text-white" strokeWidth={3} />
          </motion.div>
          
          {/* Multiple Enhanced Pulse Rings */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ 
                delay: 0.7 + i * 0.4, 
                duration: 2, 
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="absolute inset-0 bg-green-400 rounded-full"
              style={{
                boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)"
              }}
            />
          ))}
        </motion.div>

        {/* Enhanced Success Message */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
        >
          <motion.span
            animate={{ 
              textShadow: [
                "0 0 10px rgba(34, 197, 94, 0.5)",
                "0 0 20px rgba(34, 197, 94, 0.8)",
                "0 0 10px rgba(34, 197, 94, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨ Opinion Submitted! ✨
          </motion.span>
        </motion.h2>

        {/* Inspiring Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-200 dark:border-purple-700"
        >
          <motion.p
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, duration: 0.4, ease: "easeOut" }}
            className="text-lg font-semibold text-purple-700 dark:text-purple-300 leading-relaxed"
          >
            "{randomQuote}"
          </motion.p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="text-gray-600 dark:text-gray-300 mb-6 text-base leading-relaxed"
        >
          Thank you for sharing your preference for{" "}
          <span className="font-bold text-green-600 dark:text-green-400">
            {projectType || 'this content'}
          </span>
          ! Your contribution matters.
        </motion.p>

        {/* Enhanced Floating Hearts */}
        <div className="flex justify-center mb-8">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, y: 0 }}
              animate={{ 
                opacity: [0, 1, 0], 
                scale: [0, 1.2, 0],
                y: [0, -60, -120]
              }}
              transition={{ 
                delay: 1.6 + i * 0.3, 
                duration: 3,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut"
              }}
              className="mx-1"
            >
              <Heart className="w-5 h-5 text-red-500 fill-current" />
            </motion.div>
          ))}
        </div>

        {/* Enhanced Continue Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.3 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(91, 35, 51, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="px-8 py-4 bg-gradient-to-r from-[#5b2333] via-[#7a3444] to-[#8b3a52] text-white rounded-2xl hover:from-[#6b2833] hover:to-[#9b4a62] transition-all shadow-lg font-bold text-lg relative overflow-hidden"
        >
          <motion.div
            animate={{
              x: ["-100%", "100%"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
          <span className="relative z-10">Continue Exploring</span>
        </motion.button>

        {/* Enhanced Auto close progress bar */}
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ delay: 3, duration: 5, ease: "linear" }}
          className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-b-3xl"
        onAnimationComplete={() => {
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500);
        }}
        />

        {/* Corner decorations */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-80"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-4 left-4 w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-80"
        />
      </motion.div>
    </motion.div>
  );
};

export default VoteSuccessAnimation;
