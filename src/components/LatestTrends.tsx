
import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CategorySelector from "./trends/CategorySelector";
import VideoCard from "./trends/VideoCard";
import AdvertisingSection from "./trends/AdvertisingSection";
import ContactSection from "./trends/ContactSection";

const LatestTrends = () => {
  const [activeCategory, setActiveCategory] = useState("Hollywood");

  const categories = [
    { id: "Hollywood", label: "Hollywood", icon: "🎬" },
    { id: "Bollywood", label: "Bollywood", icon: "🎭" },
    { id: "Tollywood", label: "Tollywood", icon: "🎪" },
    { id: "Television", label: "Television", icon: "📺" },
    { id: "YouTube", label: "YouTube", icon: "📹" },
    { id: "OTT", label: "OTT Platforms", icon: "🎮" }
  ];

  const videoContent = {
    Hollywood: [
      {
        title: "Latest Marvel Trailer",
        description: "Experience the newest superhero adventure",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "2:45",
        views: "12M",
        rating: 4.8
      },
      {
        title: "Christopher Nolan Behind Scenes",
        description: "Exclusive behind-the-scenes footage",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "4:20",
        views: "8.5M",
        rating: 4.9
      }
    ],
    Bollywood: [
      {
        title: "Shah Rukh Khan's New Film",
        description: "Action-packed thriller preview",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "3:15",
        views: "15M",
        rating: 4.7
      },
      {
        title: "South Indian Blockbuster",
        description: "Pan-Indian cinema at its best",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "2:30",
        views: "22M",
        rating: 4.9
      }
    ],
    Tollywood: [
      {
        title: "Epic Action Sequence",
        description: "High-octane Telugu cinema",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "3:00",
        views: "18M",
        rating: 4.8
      },
      {
        title: "Mythological Drama",
        description: "Grand visual spectacle",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "4:45",
        views: "25M",
        rating: 4.9
      }
    ],
    Television: [
      {
        title: "Reality Show Highlights",
        description: "Best moments compilation",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "5:30",
        views: "5.2M",
        rating: 4.6
      },
      {
        title: "Crime Series Teaser",
        description: "Suspenseful investigation drama",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "1:45",
        views: "7.8M",
        rating: 4.7
      }
    ],
    YouTube: [
      {
        title: "Educational Content Special",
        description: "Learning made engaging",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "8:20",
        views: "3.4M",
        rating: 4.8
      },
      {
        title: "Gaming Livestream",
        description: "Epic gaming moments",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "12:15",
        views: "2.1M",
        rating: 4.9
      }
    ],
    OTT: [
      {
        title: "International Series Preview",
        description: "Global content showcase",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "3:40",
        views: "9.6M",
        rating: 4.8
      },
      {
        title: "Documentary Feature",
        description: "Real stories, real impact",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "6:25",
        views: "4.3M",
        rating: 4.9
      }
    ]
  };

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-800 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-gradient-to-br from-[#5b2333]/20 to-[#983b55]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.15, 0.05],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -left-1/4 w-80 h-80 bg-gradient-to-br from-[#983b55]/20 to-[#5b2333]/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#5b2333]/10 to-[#983b55]/10 backdrop-blur-sm border border-[#5b2333]/20 px-6 py-3 rounded-full mb-6"
          >
            <TrendingUp className="w-5 h-5 text-[#5b2333]" />
            <span className="text-[#5b2333] font-medium">Trending Now</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[#5b2333] dark:text-white mb-6 leading-tight">
            Latest Entertainment Videos
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover exclusive content, trailers, and behind-the-scenes footage from across the entertainment industry
          </p>
        </motion.div>

        <CategorySelector
          categories={categories}
          activeCategory={activeCategory}
          onCategorySelect={handleCategorySelect}
        />

        {/* Enhanced Video Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          >
            {videoContent[activeCategory as keyof typeof videoContent].map((video, index) => (
              <VideoCard key={index} video={video} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Enhanced Advertising & Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative bg-gradient-to-r from-[#5b2333] via-[#7a3444] to-[#983b55] rounded-3xl p-10 text-white overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl"></div>
          </div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <AdvertisingSection />
            <ContactSection />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestTrends;
