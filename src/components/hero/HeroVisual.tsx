
import { motion } from "framer-motion";

const HeroVisual = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
      className="lg:col-span-6 order-1 lg:order-2"
    >
      <div className="relative w-full h-[600px] perspective-[1500px]">
        {/* Main visual with enhanced styling */}
        <motion.div
          initial={{ rotateY: 15, rotateX: 15, scale: 0.9 }}
          animate={{ 
            rotateY: [0, 8, 0], 
            rotateX: [0, -8, 0],
            scale: [0.98, 1.02, 0.98]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 12, 
            ease: "easeInOut"
          }}
          className="absolute top-0 right-0 w-[90%] h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl"
        >
          <div className="relative w-full h-full">
            <img 
              src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2156&q=80" 
              alt="Content creation"
              className="w-full h-full object-cover"
            />
            {/* Enhanced overlay with gradient and blur */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent backdrop-blur-[1px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <span className="text-xs text-white/70 uppercase tracking-wider font-medium bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                  Audience Driven
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mt-3 leading-tight">
                  Stories Worth Fighting For
                </h3>
                <p className="text-white/90 mt-3 max-w-md text-lg leading-relaxed">
                  Your voice helps new stories rise from darkness to light.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* Enhanced floating elements */}
        <motion.div
          initial={{ y: 80, x: -50, opacity: 0, scale: 0.8 }}
          animate={{ 
            y: [80, 60, 80], 
            opacity: 1,
            scale: [0.95, 1.05, 0.95],
            rotateZ: [0, 2, 0]
          }}
          transition={{ 
            delay: 1.5, 
            duration: 8, 
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="absolute bottom-0 left-0 w-[220px] h-[170px] rounded-2xl overflow-hidden shadow-xl border border-white/30 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl"
        >
          <div className="relative w-full h-full">
            <img 
              src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" 
              alt="Film production"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="text-white text-sm font-semibold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                Bold Stories
              </span>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ y: 50, x: 60, opacity: 0, scale: 0.8 }}
          animate={{ 
            y: [50, 70, 50], 
            opacity: 1,
            scale: [0.95, 1.05, 0.95],
            rotateZ: [0, -2, 0]
          }}
          transition={{ 
            delay: 2, 
            duration: 10, 
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="absolute top-[60px] left-[60px] w-[200px] h-[150px] rounded-2xl overflow-hidden shadow-xl border border-white/30 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl"
        >
          <div className="relative w-full h-full">
            <img 
              src="https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" 
              alt="Television"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="text-white text-sm font-semibold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                Fresh Ideas
              </span>
            </div>
          </div>
        </motion.div>
        
        {/* Enhanced live pulse indicator */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.9, 1.1, 0.9],
            opacity: 1
          }}
          transition={{ delay: 1, duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[200px] right-[40px] flex items-center gap-3 bg-white/90 dark:bg-black/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/30"
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
            className="w-4 h-4 rounded-full bg-red-500 shadow-lg shadow-red-500/50"
          />
          <span className="text-sm font-semibold text-gray-900 dark:text-white">Live Pulse</span>
        </motion.div>

        {/* Additional floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-gradient-to-r from-primary/40 to-blue-500/40 rounded-full blur-sm"
              initial={{
                x: Math.random() * 400,
                y: Math.random() * 500,
              }}
              animate={{
                y: [null, -30, 30],
                x: [null, 20, -20],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 6 + i * 2,
                repeat: Infinity,
                delay: i * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HeroVisual;
