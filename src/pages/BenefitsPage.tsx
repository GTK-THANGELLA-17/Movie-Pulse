
import { motion } from "framer-motion";
import { Vote, MessageSquare, BarChart3, Shield, Lightbulb, Play, Users, Film, Globe, Star, Clock, TrendingUp, Award, Eye, Sparkles, Zap, Target, Heart, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ExclusiveContentSection from "@/components/ExclusiveContentSection";
import LiveInsightsSection from "@/components/LiveInsightsSection";
import { Button } from "@/components/ui/button";

const BenefitsPage = () => {
  const buttonClickEffect = (e: any) => {
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

  const immediateRewards = [
    {
      icon: <Star className="w-12 h-12 text-amber-500" />,
      title: "🎬 Instant Exclusive Access",
      description: "Vote once, unlock trailers, teasers & behind-the-scenes content immediately. No waiting, no subscriptions.",
      benefit: "Get exclusive content the moment you vote!",
      gradient: "from-amber-500/20 to-orange-500/20",
      iconBg: "from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30"
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-green-500" />,
      title: "📊 Live Trend Discovery",
      description: "See real-time voting patterns, trending genres, and what's hot in your region as it happens.",
      benefit: "Be the first to spot emerging trends!",
      gradient: "from-green-500/20 to-emerald-500/20",
      iconBg: "from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30"
    },
    {
      icon: <Sparkles className="w-12 h-12 text-purple-500" />,
      title: "🎯 Personal Insights",
      description: "Get personalized content recommendations and insights based on your unique voting patterns.",
      benefit: "Discover content tailored just for you!",
      gradient: "from-purple-500/20 to-pink-500/20",
      iconBg: "from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30"
    },
    {
      icon: <Eye className="w-12 h-12 text-blue-500" />,
      title: "👁️ Early Previews",
      description: "First look at upcoming projects that match your preferences before they're announced elsewhere.",
      benefit: "See the future of entertainment first!",
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconBg: "from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30"
    }
  ];

  const keyFeatures = [
    {
      icon: <Vote className="w-12 h-12 text-primary" />,
      title: "Instant, Anonymous Opinions",
      description: "No sign-up, no personal data — just your age, location, and honest thoughts. Anyone can cast their voice in seconds.",
      gradient: "from-primary/20 to-primary/10",
      iconBg: "from-primary/20 to-primary/10"
    },
    {
      icon: <Film className="w-12 h-12 text-indigo-500" />,
      title: "Category-Specific Voting",
      description: "Vote once per category (Films, TV, OTT, YouTube Content, Channels). Limited-time voting windows ensure fresh, clean data each cycle.",
      gradient: "from-indigo-500/20 to-purple-500/20",
      iconBg: "from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30"
    },
    {
      icon: <MessageSquare className="w-12 h-12 text-cyan-500" />,
      title: "Meaningful Comments",
      description: "Share quick comments with your vote. Creators gain not just numbers but real context behind audience preferences.",
      gradient: "from-cyan-500/20 to-blue-500/20",
      iconBg: "from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30"
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-emerald-500" />,
      title: "Live Audience Pulse Dashboard",
      description: "Clear stats showing what viewers really want, not just what's trending. Insights update with every session.",
      gradient: "from-emerald-500/20 to-green-500/20",
      iconBg: "from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30"
    },
    {
      icon: <Lightbulb className="w-12 h-12 text-yellow-500" />,
      title: "Creative Rescue Zone",
      description: "A lifeline for bold ideas and scripts rejected by 'safe' industry norms. Uncover hidden audience demand for unseen stories.",
      gradient: "from-yellow-500/20 to-orange-500/20",
      iconBg: "from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30"
    },
    {
      icon: <Play className="w-12 h-12 text-rose-500" />,
      title: "Future Trailer Premieres & Ads",
      description: "Exclusive first looks — trailers & promos debut on Audience Pulse before other platforms. Direct engagement with vocal audiences.",
      gradient: "from-rose-500/20 to-pink-500/20",
      iconBg: "from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30"
    }
  ];

  const audienceBenefits = [
    {
      icon: <Users className="w-10 h-10 text-blue-500" />,
      title: "For Audiences",
      points: [
        "Be more than a passive viewer — influence what gets made",
        "No accounts, no fuss — just pure opinion, safely anonymous", 
        "Feel your voice matter every month — no endless forms or spam"
      ],
      gradient: "from-blue-500/10 to-cyan-500/10"
    },
    {
      icon: <Film className="w-10 h-10 text-green-500" />,
      title: "For Creators & Studios", 
      points: [
        "Get real, actionable audience insight before investing money",
        "Find courage to revive unique stories that gatekeepers rejected",
        "Save time, budget, and guesswork — your audience becomes your compass"
      ],
      gradient: "from-green-500/10 to-emerald-500/10"
    },
    {
      icon: <Globe className="w-10 h-10 text-purple-500" />,
      title: "For the Content Industry",
      points: [
        "Less repetitive 'hit formulas'",
        "More diverse, authentic stories from fresh voices", 
        "Build audience loyalty by showing you actually listen"
      ],
      gradient: "from-purple-500/10 to-pink-500/10"
    }
  ];

  const whyItWorks = [
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "No Clutter",
      description: "Just clear, honest audience data",
      gradient: "from-primary/20 to-primary/10"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "No Barriers",
      description: "Opinions without sign-up friction",
      gradient: "from-yellow-500/20 to-orange-500/10"
    },
    {
      icon: <Heart className="w-8 h-8 text-rose-500" />,
      title: "No Limits",
      description: "More creative risk-taking, backed by real taste",
      gradient: "from-rose-500/20 to-pink-500/10"
    }
  ];

  return (
    <PageLayout>
      <div className="w-full relative overflow-hidden">
        {/* Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.03, 0.08, 0.03],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 -right-1/4 w-96 h-96 bg-gradient-conic from-primary/30 via-transparent to-primary/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.02, 0.06, 0.02],
              rotate: [360, 180, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
            className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-gradient-conic from-blue-500/20 via-transparent to-purple-500/20 rounded-full blur-3xl"
          />
        </div>

        {/* Hero Section */}
        <section className="py-20 relative z-10 bg-gradient-to-br from-primary via-primary/95 to-[#983b55] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xl border border-white/30 px-6 py-3 rounded-full mb-8"
            >
              <Sparkles className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Revolutionary Platform</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              🎬✨ Audience Pulse
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed"
            >
              Where Real Taste Shapes Real Content — Not just an app, it's a movement to restore the audience's power in content creation.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transition-all"
                onClick={(e) => {
                  buttonClickEffect(e);
                  window.location.href = '/vote';
                }}
              >
                🚀 Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Immediate Rewards Section */}
        <section className="py-24 relative z-10 bg-gradient-to-b from-amber-50/50 via-white to-orange-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4">
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
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 backdrop-blur-xl px-6 py-3 rounded-full mb-6"
              >
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-medium text-amber-600 dark:text-amber-400">Instant Rewards</span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                🎁 Instant Rewards For You!
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                No waiting, no promises. Vote once and get immediate access to exclusive content and insights.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {immediateRewards.map((reward, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative"
                >
                  <div className={`relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 bg-gradient-to-br ${reward.gradient} overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent group-hover:from-white/30 transition-all duration-500 rounded-3xl" />
                    
                    <div className="relative z-10">
                      <motion.div 
                        whileHover={{ 
                          rotate: [0, -10, 10, 0],
                          scale: 1.1
                        }}
                        transition={{ duration: 0.6 }}
                        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${reward.iconBg} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 mb-6`}
                      >
                        {reward.icon}
                      </motion.div>
                      
                      <h4 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{reward.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-lg">{reward.description}</p>
                      
                      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-4 rounded-xl border border-amber-500/20">
                        <p className="font-semibold text-amber-700 dark:text-amber-300 text-lg">{reward.benefit}</p>
                      </div>
                    </div>

                    <motion.div
                      className="absolute top-6 right-6 w-3 h-3 bg-gradient-to-r from-amber-500/40 to-orange-500/40 rounded-full"
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 md:px-10 py-4 text-base md:text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all"
                onClick={(e) => {
                  buttonClickEffect(e);
                  window.location.href = '/vote';
                }}
              >
                <span className="hidden sm:inline">🚀 Start Voting & Get Instant Access</span>
                <span className="sm:hidden">🚀 Start Voting</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Live Demo Sections */}
        <section className="py-24 relative z-10 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 backdrop-blur-xl px-6 py-3 rounded-full mb-6"
              >
                <Play className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary dark:text-white">Live Experience</span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                🔥 Live Experience
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                See what you get immediately after voting - exclusive content and real-time insights!
              </p>
            </motion.div>

            <div className="space-y-16">
              <ExclusiveContentSection />
              <LiveInsightsSection />
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-24 relative z-10 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4">
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
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary dark:text-white">Powerful Features</span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
                🚀 Key Features
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Discover the powerful features that make Audience Pulse the future of content creation.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {keyFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
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
                  <div className={`relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br ${feature.gradient} overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent group-hover:from-white/20 transition-all duration-500 rounded-3xl" />
                    
                    <div className="relative z-10">
                      <motion.div 
                        whileHover={{ 
                          rotate: [0, -5, 5, 0],
                          scale: 1.1
                        }}
                        transition={{ duration: 0.6 }}
                        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.iconBg} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 mb-6`}
                      >
                        {feature.icon}
                      </motion.div>
                      
                      <h4 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">✅ {feature.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What Makes It Valuable Section */}
        <section className="py-24 relative z-10 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
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
                <Heart className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary dark:text-white">Value Proposition</span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
                🌟 What Makes It Valuable
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Understand the unique value Audience Pulse brings to different stakeholders.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {audienceBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
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
                  className="group"
                >
                  <div className={`relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br ${benefit.gradient} overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent group-hover:from-white/20 transition-all duration-500 rounded-3xl" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          transition={{ duration: 0.3 }}
                          className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center shadow-lg"
                        >
                          {benefit.icon}
                        </motion.div>
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{benefit.title}</h4>
                      </div>
                      <ul className="space-y-4">
                        {benefit.points.map((point, pointIndex) => (
                          <motion.li 
                            key={pointIndex} 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 + index * 0.1 + pointIndex * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <span className="text-primary font-bold mt-1 text-lg">🎥</span>
                            <span className="text-gray-600 dark:text-gray-300 leading-relaxed">{point}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why It Works Section */}
        <section className="py-24 relative z-10 bg-gradient-to-b from-white via-primary/5 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4">
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
                <Target className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary dark:text-white">Core Principles</span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
                🔑 Why It Works
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                The core principles that make Audience Pulse effective and revolutionary.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 backdrop-blur-xl border border-primary/20 p-12 rounded-3xl shadow-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {whyItWorks.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                    className="group"
                  >
                    <div className={`bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 bg-gradient-to-br ${item.gradient}`}>
                      <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        className="w-16 h-16 bg-gradient-to-br from-white/30 to-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-500"
                      >
                        {item.icon}
                      </motion.div>
                      <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">{item.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-24 relative z-10 bg-gradient-to-br from-primary via-primary/95 to-[#983b55] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xl border border-white/30 px-6 py-3 rounded-full mb-8"
              >
                <Sparkles className="w-5 h-5 text-white" />
                <span className="text-white font-medium">Ready to Begin?</span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">🎯 Ready to Shape Content?</h2>
              <p className="text-2xl md:text-3xl font-semibold mb-4">Vote. Get Rewards. Influence. Repeat.</p>
              <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">Join thousands shaping the future of entertainment!</p>
              
              <div className="space-y-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    className="bg-white text-primary hover:bg-gray-100 px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all"
                    onClick={(e) => {
                      buttonClickEffect(e);
                      window.location.href = '/vote';
                    }}
                  >
                    <span className="hidden sm:inline">🚀 Start Voting & Get Instant Access</span>
                    <span className="sm:hidden">🚀 Start Voting</span>
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-2 md:ml-3" />
                  </Button>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl max-w-3xl mx-auto"
                >
                  <p className="text-lg md:text-xl leading-relaxed">
                    👉 No signup required • Anonymous voting • Instant rewards • Real impact
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default BenefitsPage;
