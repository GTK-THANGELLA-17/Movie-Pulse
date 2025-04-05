import { useState, useEffect } from "react";
import { 
  ArrowDownCircle, 
  ArrowRight, 
  TrendingUp, 
  Users, 
  Zap, 
  Instagram, 
  Facebook, 
  Youtube, 
  Twitter 
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToVotingSection = () => {
    const votingSection = document.getElementById("features");
    if (votingSection) {
      votingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigateToVote = () => {
    navigate("/vote");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Dynamic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5 dark:from-primary/20 dark:via-background dark:to-primary/10" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{
              opacity: 0.05 + Math.random() * 0.1,
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0.1 + Math.random() * 0.3,
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
              rotate: [0, 180, 360],
            }}
            transition={{
              repeat: Infinity,
              duration: 15 + Math.random() * 20,
              ease: "linear",
            }}
            className="absolute rounded-full bg-primary/10 dark:bg-primary/20"
            style={{
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-screen items-center">
          {/* Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="lg:col-span-6 pt-32 lg:pt-0 order-2 lg:order-1"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 backdrop-blur-md px-4 py-2 rounded-full dark:text-white dark:bg-primary/30"
            >
              <motion.div
                variants={pulseVariants}
                animate="pulse"
                className="w-2 h-2 bg-primary dark:bg-white rounded-full"
              />
              <span>Your Voice in Entertainment</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black dark:text-white"
            >
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 dark:from-white dark:to-white/70">
                Shaping The Future
              </span>
              <span>of Entertainment</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-4 text-base md:text-lg text-black/80 dark:text-white/80 max-w-xl"
            >
              MoviePulse helps creators understand audience preferences by collecting
              and analyzing content preferences worldwide across films, TV shows,
              YouTube videos, and streaming platforms.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Button
                onClick={(e) => {
                  // Create ripple effect for "Cast Your Opinion" button
                  const btn = e.currentTarget;
                  const circle = document.createElement("span");
                  const diameter = Math.max(btn.clientWidth, btn.clientHeight);

                  circle.style.width = circle.style.height = `${diameter}px`;
                  circle.style.left = `${e.clientX - btn.offsetLeft - diameter / 2}px`;
                  circle.style.top = `${e.clientY - btn.offsetTop - diameter / 2}px`;
                  circle.classList.add("ripple");

                  const ripple = btn.querySelector(".ripple");
                  if (ripple) {
                    ripple.remove();
                  }

                  btn.appendChild(circle);

                  // Remove the span after the animation completes
                  setTimeout(() => {
                    circle.remove();
                  }, 600);

                  navigateToVote();
                }}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-full relative overflow-hidden group transition-all duration-300 hover:shadow-xl hover:shadow-primary/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Cast Your Opinion
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>

              <Button
                onClick={(e) => {
                  // Create ripple effect for "Explore Features" button
                  const btn = e.currentTarget;
                  const circle = document.createElement("span");
                  const diameter = Math.max(btn.clientWidth, btn.clientHeight);

                  circle.style.width = circle.style.height = `${diameter}px`;
                  circle.style.left = `${e.clientX - btn.offsetLeft - diameter / 2}px`;
                  circle.style.top = `${e.clientY - btn.offsetTop - diameter / 2}px`;
                  circle.classList.add("ripple");

                  const ripple = btn.querySelector(".ripple");
                  if (ripple) {
                    ripple.remove();
                  }

                  btn.appendChild(circle);

                  // Remove the span after the animation completes
                  setTimeout(() => {
                    circle.remove();
                  }, 600);

                  scrollToVotingSection();
                }}
                variant="outline"
                size="lg"
                className="border-primary/20 text-primary dark:text-white dark:border-white/20 hover:bg-primary/5 dark:hover:bg-white/5 rounded-full group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Features
                </span>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
                  className="ml-2"
                >
                  <ArrowDownCircle className="w-5 h-5" />
                </motion.div>
              </Button>
            </motion.div>

            {/* Social Icons Section */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex items-center gap-4"
            >
              <span className="text-sm font-medium text-black dark:text-white">
                Stay Connected
              </span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-colors duration-300 hover:text-primary/80"
              >
                <Instagram className="w-6 h-6 text-primary" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="transition-colors duration-300 hover:text-primary/80"
              >
                <Facebook className="w-6 h-6 text-primary" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="transition-colors duration-300 hover:text-primary/80"
              >
                <Youtube className="w-6 h-6 text-primary" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="transition-colors duration-300 hover:text-primary/80"
              >
                <Twitter className="w-6 h-6 text-primary" />
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-12 flex flex-wrap items-center gap-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>Real-time Analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span>Global Audience Insights</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span>Trending Content Predictions</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero visual content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 order-1 lg:order-2"
          >
            <div className="relative w-full h-[500px] perspective-[1200px]">
              {/* Main visual */}
              <motion.div
                initial={{ rotateY: 10, rotateX: 10 }}
                animate={{ rotateY: [-5, 5, -5], rotateX: [5, -5, 5] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-[90%] h-[400px] rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2156&q=80"
                  alt="Content creation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                  <span className="text-xs text-white/70 uppercase tracking-wider">
                    Featured
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    Audience-Driven Content
                  </h3>
                  <p className="text-white/80 mt-2 max-w-md">
                    Creating entertainment that resonates with what people actually want to see.
                  </p>
                </div>
              </motion.div>

              {/* Floating elements */}
              <motion.div
                initial={{ y: 60, x: -30, opacity: 0 }}
                animate={{ y: [60, 40, 60], opacity: 1 }}
                transition={{ delay: 1, duration: 5, repeat: Infinity, repeatType: "reverse" }}
                className="absolute bottom-0 left-0 w-[200px] h-[150px] rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                  alt="Film production"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-start p-4">
                  <span className="text-white text-sm font-medium">Film</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 30, x: 40, opacity: 0 }}
                animate={{ y: [30, 50, 30], opacity: 1 }}
                transition={{ delay: 1.5, duration: 6, repeat: Infinity, repeatType: "reverse" }}
                className="absolute top-[50px] left-[40px] w-[180px] h-[130px] rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src="https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                  alt="Television"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-start p-4">
                  <span className="text-white text-sm font-medium">Television</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{
                  scale: [0.9, 1, 0.9],
                  opacity: 1,
                }}
                transition={{ delay: 0.7, duration: 4, repeat: Infinity }}
                className="absolute top-[180px] right-[30px] flex items-center gap-2 bg-white/80 dark:bg-black/80 backdrop-blur-md p-3 rounded-full shadow-lg"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    backgroundColor: [
                      "rgb(239, 68, 68)",
                      "rgb(248, 113, 113)",
                      "rgb(239, 68, 68)",
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-3 h-3 rounded-full bg-red-500"
                ></motion.div>
                <span className="text-sm font-medium">Live Opinions</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: [0, 1, 0], y: [0, 10, 0] }}
        transition={{ delay: 3, duration: 3, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center"
      >
        <ArrowDownCircle className="w-8 h-8 text-primary dark:text-white mx-auto" />
        <span className="block text-sm mt-2 text-muted-foreground">Scroll to explore</span>
      </motion.div>
    </div>
  );
};

export default Hero;
