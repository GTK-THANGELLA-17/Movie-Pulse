
import { motion } from "framer-motion";
import { Film, TrendingUp, BarChart3, Users } from "lucide-react";

const PlatformIcons = () => {
  const platforms = [
    { icon: Film, label: "Films", color: "text-red-500", bg: "from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-800/20" },
    { icon: TrendingUp, label: "OTT", color: "text-green-500", bg: "from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20" },
    { icon: BarChart3, label: "TV", color: "text-blue-500", bg: "from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20" },
    { icon: Users, label: "YouTube", color: "text-purple-500", bg: "from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
    >
      {platforms.map((platform, index) => (
        <motion.div
          key={platform.label}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
          className={`bg-gradient-to-br ${platform.bg} backdrop-blur-xl border border-white/20 p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300 group`}
        >
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.6 }}
          >
            <platform.icon className={`w-8 h-8 ${platform.color} mx-auto mb-2 group-hover:scale-110 transition-transform`} />
          </motion.div>
          <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{platform.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PlatformIcons;
