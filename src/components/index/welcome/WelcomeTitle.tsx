
import { motion } from "framer-motion";

const WelcomeTitle = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
        <motion.span 
          className="block bg-gradient-to-r from-primary via-primary/80 to-primary/60 dark:from-white dark:via-white/90 dark:to-white/70 bg-clip-text text-transparent"
          initial={{ backgroundPosition: "0% 50%" }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: "200% 200%" }}
        >
          Audience Pulse
        </motion.span>
        <motion.span 
          className="text-3xl md:text-4xl lg:text-5xl mt-4 block font-semibold text-gray-800 dark:text-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Your Voice Shapes{" "}
          <span className="relative">
            Tomorrow's Stories
            <motion.div
              className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary/60 to-transparent rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
            />
          </span>
        </motion.span>
      </h1>
    </motion.div>
  );
};

export default WelcomeTitle;
