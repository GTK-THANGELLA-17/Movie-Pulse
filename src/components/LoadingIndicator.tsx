
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

interface LoadingIndicatorProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  fullScreen?: boolean;
}

const LoadingIndicator = ({ 
  size = "md", 
  message = "Loading...", 
  fullScreen = false 
}: LoadingIndicatorProps) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-10 h-10"
  };
  
  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl"
  };
  
  if (fullScreen) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50"
      >
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="relative"
        >
          <Activity className={`${sizes.lg} text-primary animate-pulse`} />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold mt-4 text-primary dark:text-white"
        >
          MoviePulse
        </motion.h1>
        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-2 text-black dark:text-white"
          >
            {message}
          </motion.p>
        )}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "60%" }}
          transition={{ delay: 0.5, duration: 1 }}
          className="h-1 bg-primary/30 dark:bg-white/30 rounded-full mt-6 relative overflow-hidden max-w-[280px]"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary dark:via-white to-transparent"
          />
        </motion.div>
      </motion.div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="flex items-center gap-2">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Activity className={`${sizes[size]} text-primary`} />
        </motion.div>
        {message && <p className={`${textSizes[size]} text-black dark:text-white`}>{message}</p>}
      </div>
    </div>
  );
};

export default LoadingIndicator;
