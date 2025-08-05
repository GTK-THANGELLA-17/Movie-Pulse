
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

const CTAFooter = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 1 }}
      className="text-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="flex items-center justify-center gap-2 mb-4"
      >
        <Globe className="w-6 h-6 text-white" />
        <p className="text-xl font-bold text-white">#YourVoiceMatters #CreatorsUnchained #AudiencePulse</p>
      </motion.div>
      <p className="text-lg text-white/90 font-medium">Let's make better stories, together.</p>
    </motion.div>
  );
};

export default CTAFooter;
