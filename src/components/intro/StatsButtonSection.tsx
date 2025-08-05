
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BarChart3, Sparkles, Zap, Globe } from "lucide-react";

interface StatsButtonSectionProps {
  navigateToStats: () => void;
  buttonClickEffect: (e: any) => void;
}

const StatsButtonSection = ({ navigateToStats, buttonClickEffect }: StatsButtonSectionProps) => {
  return (
    <section className="py-24 w-full relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80">
      {/* Enhanced background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-conic from-white/20 via-transparent to-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.2, 0.05],
            rotate: [360, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 10 }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-conic from-white/10 via-transparent to-white/20 rounded-full blur-3xl"
        />
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -40, 40, -40],
              x: [null, 20, -20, 20],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
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
            <span className="text-white font-medium">Live Insights</span>
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-8 text-white leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Feel the Pulse of What the World Wants
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Discover real-time insights into what audiences crave before stories are told. Your voice helps uncover hidden demand for fresh, unique ideas.
          </motion.p>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.7, type: "spring", stiffness: 100 }}
            className="relative mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button
                onClick={(e) => {
                  buttonClickEffect(e);
                  navigateToStats();
                }}
                className="stats-button bg-white text-primary hover:bg-gray-100 font-bold px-12 py-6 text-xl rounded-full relative overflow-hidden border-0 hover:border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group"
                size="lg"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="mr-3"
                >
                  <BarChart3 className="w-7 h-7 relative z-10 text-primary" />
                </motion.div>
                <span className="relative z-10 text-primary font-bold drop-shadow-sm">View Live Statistics</span>
                
                {/* Enhanced shimmer effect for better visibility */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
                
                {/* Additional background for better contrast */}
                <div className="absolute inset-0 bg-white/95 rounded-full -z-10" />
              </Button>
            </motion.div>
            
            {/* Enhanced animated decorative elements */}
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut"
              }}
              className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-80 shadow-lg"
            />
            <motion.div
              animate={{ 
                rotate: [360, 0],
                scale: [1, 1.3, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-6 -left-6 w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-80 shadow-lg"
            />
            <motion.div
              animate={{ 
                rotate: [0, -360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute top-0 -left-8 w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-70 shadow-lg"
            />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { 
                icon: Globe, 
                title: "Live Audience Voice", 
                desc: "Real opinions collected before stories are made",
                gradient: "from-blue-400 to-cyan-400"
              },
              { 
                icon: Zap, 
                title: "Hidden Demand", 
                desc: "Uncover what audiences truly want to see",
                gradient: "from-yellow-400 to-orange-400"
              },
              { 
                icon: Sparkles, 
                title: "Creator Freedom", 
                desc: "Give courage to bold, unique storytelling",
                gradient: "from-purple-400 to-pink-400"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.15 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="group"
              >
                <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-6 hover:bg-white/30 transition-all duration-500 shadow-xl hover:shadow-2xl">
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-500`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="font-bold text-white mb-2 text-lg group-hover:text-gray-100 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/80 group-hover:text-white/90 transition-colors leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsButtonSection;
