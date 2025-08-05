
import { motion } from "framer-motion";
import { Star, Clock, TrendingUp, Award, ChevronRight, Sparkles } from "lucide-react";

const KeyBenefitsSection = () => {
  const buttonClickEffect = (e) => {
    const btn = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - btn.offsetLeft - diameter / 2}px`;
    circle.style.top = `${e.clientY - btn.offsetTop - diameter / 2}px`;
    circle.classList.add('ripple');
    
    const ripple = btn.querySelector('.ripple');
    if (ripple) {
      ripple.remove();
    }
    
    btn.appendChild(circle);
    
    setTimeout(() => {
      circle.remove();
    }, 600);
  };

  const benefits = [
    {
      icon: <Star className="w-12 h-12 text-amber-500" />,
      title: "Quality Insights",
      description: "Understand what audiences value most in content through detailed feedback and comprehensive preference analysis across all entertainment platforms.",
      gradient: "from-amber-500/20 to-orange-500/20",
      iconBg: "from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30"
    },
    {
      icon: <Clock className="w-12 h-12 text-blue-500" />,
      title: "Real-time Data",
      description: "Access up-to-the-minute audience preferences with our lightning-fast backend infrastructure and instant data processing capabilities.",
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconBg: "from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30"
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-green-500" />,
      title: "Trend Analysis",
      description: "Spot emerging content trends before competitors with our advanced analytics engine and predictive modeling algorithms.",
      gradient: "from-green-500/20 to-emerald-500/20",
      iconBg: "from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30"
    },
    {
      icon: <Award className="w-12 h-12 text-purple-500" />,
      title: "Success Metrics",
      description: "Measure what resonates most with your audience using comprehensive success indicators and detailed performance analytics.",
      gradient: "from-purple-500/20 to-pink-500/20",
      iconBg: "from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30"
    }
  ];

  return (
    <section className="py-24 w-full relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-800">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -right-1/4 w-96 h-96 bg-gradient-conic from-primary/30 via-transparent to-primary/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.03, 0.08, 0.03],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
          className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-gradient-conic from-blue-500/20 via-transparent to-purple-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 backdrop-blur-xl px-6 py-3 rounded-full mb-6"
          >
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary dark:text-white">Premium Features</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
            Why Choose Audience Pulse?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our platform offers unique insights that revolutionize how content creators understand and respond to audience preferences.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {benefits.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              {/* Glass morphism card */}
              <div className={`relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 bg-gradient-to-br ${item.gradient} overflow-hidden`}>
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent group-hover:from-white/20 transition-all duration-500 rounded-3xl" />
                
                <div className="relative z-10 flex gap-6">
                  <motion.div 
                    whileHover={{ 
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.1
                    }}
                    transition={{ duration: 0.6 }}
                    className={`flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br ${item.iconBg} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500`}
                  >
                    {item.icon}
                  </motion.div>
                  
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-white transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-lg">
                      {item.description}
                    </p>
                    
                    <motion.button
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.2 }}
                      onClick={(e) => buttonClickEffect(e)}
                      className="group/btn inline-flex items-center gap-2 text-primary dark:text-white font-semibold text-lg relative overflow-hidden py-2"
                    >
                      <span className="relative z-10">Learn more</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" />
                      </motion.div>
                      
                      {/* Animated underline */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 dark:from-white dark:to-white/60"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  </div>
                </div>

                {/* Floating decoration */}
                <motion.div
                  className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-primary/40 to-blue-500/40 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyBenefitsSection;
