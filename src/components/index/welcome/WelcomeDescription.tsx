
import { motion } from "framer-motion";

const WelcomeDescription = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <p className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
          <strong className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Not just another voting app.</strong>
          <br />
          <strong className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Not just another reviews page.</strong>
        </p>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed">
          Break the cycle of repeated, "safe" stories. Give power back to audiences — and courage back to creators.
        </p>
      </div>
    </motion.div>
  );
};

export default WelcomeDescription;
