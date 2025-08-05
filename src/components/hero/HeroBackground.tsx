
import { motion } from "framer-motion";
import { ArrowDownCircle } from "lucide-react";

const HeroBackground = () => {
  return (
    <>
      {/* Dynamic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5 dark:from-primary/20 dark:via-background dark:to-primary/10" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ 
              opacity: 0.05 + Math.random() * 0.1, 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              scale: 0.1 + Math.random() * 0.3
            }}
            animate={{ 
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight
              ],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 15 + Math.random() * 20,
              ease: "linear"
            }}
            className="absolute rounded-full bg-primary/10 dark:bg-primary/20"
            style={{ 
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`
            }}
          />
        ))}
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: [0, 1, 0], y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center"
      >
        <ArrowDownCircle className="w-8 h-8 text-primary dark:text-white mx-auto" />
        <span className="block text-sm mt-2 text-muted-foreground">Scroll to explore</span>
      </motion.div>
    </>
  );
};

export default HeroBackground;
