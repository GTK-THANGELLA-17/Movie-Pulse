
import { motion } from "framer-motion";

const WelcomeVisual = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, x: 50 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.4 }}
      className="lg:w-1/2 relative"
    >
      <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl">
        <motion.img 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          src="/Images/current-trends.jpg" 
          alt="Entertainment insights dashboard"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent" />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-0 left-0 right-0 p-8"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full mb-4"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                backgroundColor: [
                  "rgb(239, 68, 68)", 
                  "rgb(248, 113, 113)", 
                  "rgb(239, 68, 68)"
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-3 h-3 rounded-full bg-red-500"
            />
            <span className="text-white/90 text-sm font-medium">Real-Time Pulse</span>
          </motion.div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
            Your Voice Shows Creators What's Worth Fighting For
          </h3>
          <p className="text-white/90 text-lg leading-relaxed">
            Experience the power of collective audience insight in real-time.
          </p>
        </motion.div>
      </div>

      {/* Floating decorative elements */}
      <motion.div
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "linear"
        }}
        className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full opacity-80 shadow-2xl shadow-primary/30 backdrop-blur-sm"
      />
      <motion.div
        animate={{ 
          rotate: [360, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute -bottom-8 -left-8 w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-70 shadow-xl"
      />
    </motion.div>
  );
};

export default WelcomeVisual;
