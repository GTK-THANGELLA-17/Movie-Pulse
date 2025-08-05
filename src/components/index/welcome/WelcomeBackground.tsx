
import { motion } from "framer-motion";

const WelcomeBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.15, 0.05],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-conic from-primary/20 via-transparent to-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.03, 0.1, 0.03],
          rotate: [360, 180, 0]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 10 }}
        className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-conic from-blue-500/15 via-transparent to-purple-500/15 rounded-full blur-3xl"
      />
      
      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, -30, 30],
            x: [null, 20, -20],
            opacity: [0.2, 0.7, 0.2],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default WelcomeBackground;
