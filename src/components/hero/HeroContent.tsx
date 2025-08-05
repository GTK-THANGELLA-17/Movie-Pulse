
import { useState, useEffect } from "react";
import { ArrowRight, Target, Heart, Zap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroContent = () => {
  const navigate = useNavigate();
  
  const navigateToVote = () => {
    navigate("/vote");
  };
  
  const scrollToVotingSection = () => {
    const votingSection = document.getElementById("features");
    if (votingSection) {
      votingSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 15
      } 
    }
  };
  
  const pulseVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Enhanced button click ripple effect
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
  
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="lg:col-span-6 pt-32 lg:pt-0 order-2 lg:order-1"
    >
      <motion.div 
        variants={itemVariants}
        className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 backdrop-blur-xl px-6 py-3 rounded-full dark:from-white/10 dark:via-white/5 dark:to-transparent dark:border-white/20 hover:border-primary/40 dark:hover:border-white/40 transition-all duration-500"
      >
        <motion.div
          variants={pulseVariants}
          animate="pulse"
          className="w-3 h-3 bg-gradient-to-r from-primary to-primary/70 dark:from-white dark:to-white/70 rounded-full shadow-lg shadow-primary/50 dark:shadow-white/50"
        />
        <span className="text-sm font-medium bg-gradient-to-r from-primary to-primary/70 dark:from-white dark:to-white/70 bg-clip-text text-transparent">
          We Don't Kill Creativity — We Free It
        </span>
        <Sparkles className="w-4 h-4 text-primary dark:text-white opacity-60 group-hover:opacity-100 transition-opacity" />
      </motion.div>
      
      <motion.div variants={itemVariants} className="mt-8">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
          <motion.span 
            className="block bg-gradient-to-r from-primary via-primary/80 to-primary/60 dark:from-white dark:via-white/90 dark:to-white/70 bg-clip-text text-transparent"
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% 200%" }}
          >
            Audience Pulse
          </motion.span>
          <motion.span 
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl mt-4 block font-semibold text-gray-800 dark:text-gray-200"
          >
            Your Voice Shapes{" "}
            <span className="relative">
              Tomorrow's Stories
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary/60 to-transparent rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
              />
            </span>
          </motion.span>
        </h1>
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        className="mt-10 space-y-6"
      >
        <div className="space-y-4">
          <p className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
            <strong className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Not just another voting app.</strong>
            <br />
            <strong className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Not just another reviews page.</strong>
          </p>
          <motion.p 
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Break the cycle of repeated, "safe" stories. Give power back to audiences — and courage back to creators.
          </motion.p>
        </div>
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        className="mt-12 flex flex-wrap gap-6"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={(e) => {
              buttonClickEffect(e);
              navigateToVote();
            }}
            size="lg"
            className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:via-primary/80 hover:to-primary/70 text-white rounded-2xl relative overflow-hidden group transition-all duration-500 shadow-2xl shadow-primary/25 hover:shadow-primary/40 border-0 px-8 py-4 text-lg font-semibold"
          >
            <span className="relative z-10 flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
              Join the Pulse
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </Button>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={(e) => {
              buttonClickEffect(e);
              scrollToVotingSection();
            }}
            variant="outline"
            size="lg"
            className="border-2 border-primary/30 dark:border-white/30 text-primary dark:text-white hover:bg-primary/5 dark:hover:bg-white/5 rounded-2xl group relative overflow-hidden backdrop-blur-sm bg-white/50 dark:bg-black/50 px-8 py-4 text-lg font-semibold transition-all duration-500 hover:border-primary/60 dark:hover:border-white/60"
          >
            <span className="relative z-10 flex items-center gap-2">
              Discover How
              <motion.div
                className="w-2 h-2 bg-primary dark:bg-white rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </span>
          </Button>
        </motion.div>
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        className="mt-16 flex flex-wrap items-center gap-8 text-sm"
      >
        {[
          { icon: Target, text: "Before Stories Are Made", color: "text-blue-600" },
          { icon: Heart, text: "Real Audience Voice", color: "text-red-500" },
          { icon: Zap, text: "Creator Freedom", color: "text-yellow-500" }
        ].map((item, index) => (
          <motion.div
            key={item.text}
            className="flex items-center gap-3 group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 + index * 0.2 }}
          >
            <div className={`p-2 rounded-full bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-700/60 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
              {item.text}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
