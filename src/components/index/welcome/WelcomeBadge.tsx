
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const WelcomeBadge = () => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 backdrop-blur-xl px-6 py-3 rounded-full"
    >
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles className="w-5 h-5 text-primary" />
      </motion.div>
      <span className="text-sm font-medium bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        We Don't Kill Creativity — We Free It
      </span>
    </motion.div>
  );
};

export default WelcomeBadge;
