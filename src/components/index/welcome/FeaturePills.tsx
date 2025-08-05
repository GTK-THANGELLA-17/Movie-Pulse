
import { motion } from "framer-motion";
import { Target, Heart, Zap } from "lucide-react";

const FeaturePills = () => {
  const features = [
    { icon: Target, text: "Before Stories Are Made", color: "text-blue-600", bg: "from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20" },
    { icon: Heart, text: "Real Audience Voice", color: "text-red-500", bg: "from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-800/20" },
    { icon: Zap, text: "Creator Freedom", color: "text-yellow-500", bg: "from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-800/20" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.1 }}
      className="flex flex-wrap items-center gap-6 pt-8"
    >
      {features.map((item, index) => (
        <motion.div
          key={item.text}
          className="flex items-center gap-3 group cursor-pointer"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 + index * 0.2 }}
        >
          <div className={`p-3 rounded-2xl bg-gradient-to-br ${item.bg} shadow-lg group-hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20`}>
            <item.icon className={`w-6 h-6 ${item.color}`} />
          </div>
          <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
            {item.text}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FeaturePills;
