
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const CTAHeader = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center max-w-6xl mx-auto"
    >
      {/* Header Badge */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-xl border border-white/30 px-6 py-3 rounded-full mb-8"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-5 h-5 text-white" />
        </motion.div>
        <span className="text-white font-medium">Join the Movement</span>
      </motion.div>

      <motion.h2 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-4xl md:text-6xl font-bold mb-12 text-white leading-tight"
      >
        🙌 Join the Pulse
      </motion.h2>
    </motion.div>
  );
};

export default CTAHeader;
