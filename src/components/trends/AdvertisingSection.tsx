
import { motion } from "framer-motion";

const AdvertisingSection = () => {
  return (
    <div>
      <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
        Advertise With Us
      </h3>
      <p className="mb-8 text-white/90 text-lg leading-relaxed">
        Reach millions of entertainment enthusiasts through our platform. 
        Partner with Audience-Pulse to showcase your content to engaged audiences.
      </p>
      <div className="space-y-4">
        {[
          "Targeted audience reach",
          "Multi-platform advertising",
          "Real-time analytics"
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
            className="flex items-center gap-4"
          >
            <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg"></div>
            <span className="text-lg">{feature}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdvertisingSection;
