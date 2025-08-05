import { useState } from "react";
import { TrendingUp, Play, Star, Eye, Zap, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Components ---

const CategorySelector = ({ categories, activeCategory, onCategorySelect }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-16">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => onCategorySelect(category.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300
            ${
              activeCategory === category.id
                ? "bg-gradient-to-r from-[#5b2333] to-[#983b55] text-white shadow-lg shadow-[#5b2333]/30"
                : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
            }`}
        >
          <span className="text-xl">{category.icon}</span>
          <span>{category.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

const VideoCard = ({ video, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative group"
    >
      <div className="relative w-full h-64 overflow-hidden">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.a
            href={video.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="p-4 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-colors"
          >
            <Play className="w-8 h-8" fill="white" />
          </motion.a>
        </div>
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
          {video.duration}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#5b2333] dark:text-white mb-2">{video.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{video.description}</p>
        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-sm">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{video.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-[#983b55]" fill="#983b55" />
            <span>{video.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AdvertisingSection = () => (
  <div className="text-center lg:text-left">
    <Zap className="w-12 h-12 text-white mb-4 mx-auto lg:mx-0" />
    <h3 className="text-3xl font-bold mb-3">Promote Your Content</h3>
    <p className="text-gray-100 mb-6 max-w-xl lg:max-w-none">
      Boost your video's reach with our premium advertising solutions. Reach millions of viewers and get your content discovered today.
    </p>
    <button className="bg-white text-[#5b2333] font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
      Learn More
    </button>
  </div>
);

const ContactSection = () => (
  <div className="text-center lg:text-left">
    <Mail className="w-12 h-12 text-white mb-4 mx-auto lg:mx-0" />
    <h3 className="text-3xl font-bold mb-3">Get in Touch</h3>
    <p className="text-gray-100 mb-6 max-w-xl lg:max-w-none">
      Have questions or want to partner with us? Our team is ready to assist you.
    </p>
    <a
      href="mailto:contact@example.com"
      className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transition-colors duration-300"
    >
      Contact Us
    </a>
  </div>
);

// --- Main Component ---

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
      title: "Avatar: Fire and Ash | Official Trailer",
      description: "Experience the breathtaking new chapter of Avatar.",
      videoUrl: "https://www.youtube.com/watch?v=nb_fFj_0rq8&t=26s",
      thumbnailUrl: "https://i.ytimg.com/vi/nb_fFj_0rq8/hqdefault.jpg",
      duration: "3:30",
      views: "5M",
      rating: 4.9
    },
    {
      title: "Predator: Badlands | Official Trailer | Experience It In IMAX®",
      description: "The ultimate hunt returns with Predator: Badlands.",
      videoUrl: "https://www.youtube.com/watch?v=s-E7BImQavU",
      thumbnailUrl: "https://i.ytimg.com/vi/s-E7BImQavU/hqdefault.jpg",
      duration: "2:50",
      views: "4M",
      rating: 4.7
    }
  ],
 Bollywood: [
  {
    title: "WAR 2 | Official Trailer",
    description: "Hrithik Roshan, NTR, Kiara Advani star in the YRF Spy Universe sequel.",
    videoUrl: "https://www.youtube.com/watch?v=mjBym9uKth4",
    thumbnailUrl: "https://i.ytimg.com/vi/mjBym9uKth4/hqdefault.jpg",
    duration: "3:00",
    views: "5M",
    rating: 4.8
  },
  {
    title: "Coolie - Official Hindi Trailer | Superstar Rajinikanth",
    description: "Mass action drama directed by Lokesh Kanagaraj with music by Anirudh.",
    videoUrl: "https://www.youtube.com/watch?v=PuzNA314WCI",
    thumbnailUrl: "https://i.ytimg.com/vi/PuzNA314WCI/hqdefault.jpg",
    duration: "2:50",
    views: "3.8M",
    rating: 4.7
  }
],
  Tollywood: [
    {
      title: "Coolie - Official Telugu Trailer | Superstar Rajinikanth",
      description: "Mass action drama directed by Lokesh Kanagaraj, starring Rajinikanth.",
      videoUrl: "https://www.youtube.com/watch?v=l8qlUDRSaTU",
      thumbnailUrl: "https://i.ytimg.com/vi/l8qlUDRSaTU/hqdefault.jpg",
      duration: "2:45",
      views: "3.5M",
      rating: 4.8
    },
    {
      title: "WAR 2 Official Trailer | Telugu",
      description: "Hrithik Roshan, NTR, Kiara Advani star in the YRF Spy Universe sequel.",
      videoUrl: "https://www.youtube.com/watch?v=d1wsPSV_lQs",
      thumbnailUrl: "https://i.ytimg.com/vi/d1wsPSV_lQs/hqdefault.jpg",
      duration: "3:05",
      views: "4M",
      rating: 4.7
    }
  ],
  Television: [
    {
      title: "House of the Dragon Season 2 Official Trailer",
      description: "All must choose. The battle for the Iron Throne has begun.",
      videoUrl: "https://www.youtube.com/watch?v=pSj7S0J0Rgg",
      thumbnailUrl: "https://i.ytimg.com/vi/pSj7S0J0Rgg/hqdefault.jpg",
      duration: "2:10",
      views: "5.2M",
      rating: 4.6
    },
    {
      title: "Squid Game Season 2 Teaser Trailer",
      description: "456 will return. Who will be next to play the game?",
      videoUrl: "https://www.youtube.com/watch?v=aM5_R14Fz_I",
      thumbnailUrl: "https://i.ytimg.com/vi/aM5_R14Fz_I/hqdefault.jpg",
      duration: "0:56",
      views: "7.8M",
      rating: 4.7
    }
  ],
  YouTube: [
    {
      title: "Marques Brownlee - iPhone 16 Pro Leaks!",
      description: "All the latest rumors and leaks about the next iPhone.",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnailUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      duration: "8:20",
      views: "3.4M",
      rating: 4.8
    },
    {
      title: "MrBeast - I Opened a Free Store",
      description: "MrBeast's latest epic challenge.",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnailUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      duration: "12:15",
      views: "2.1M",
      rating: 4.9
    }
  ],
  OTT: [
    {
      title: "Loki Season 3 Official Trailer",
      description: "Loki must find a way to save the multiverse.",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnailUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      duration: "3:40",
      views: "9.6M",
      rating: 4.8
    },
    {
      title: "The Bear Season 3 Official Trailer",
      description: "Back in the kitchen. New challenges await.",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnailUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      duration: "6:25",
      views: "4.3M",
      rating: 4.9
    }
  ],
  Latest2025: [
    {
      title: "10 BEST MOVIE TRAILERS 2025 (JULY) 4K ULTRA HD",
      description: "Includes trailers for Avatar Fire And Ash, Predator Badlands, Afterburn, Tron Ares, and more.",
      videoUrl: "https://www.youtube.com/watch?v=UlhRoIz6iJ0",
      thumbnailUrl: "https://i.ytimg.com/vi/UlhRoIz6iJ0/hqdefault.jpg",
      duration: "10:00",
      views: "1M",
      rating: 4.5
    },
    {
      title: "NEW MOVIE TRAILERS 2025",
      description: "Trailers for The Conjuring 4, Predator Badlands, Tron Ares, Avatar 3 Fire And Ash, and others.",
      videoUrl: "https://www.youtube.com/watch?v=q2NvNOU4Zko",
      thumbnailUrl: "https://i.ytimg.com/vi/q2NvNOU4Zko/hqdefault.jpg",
      duration: "12:00",
      views: "900K",
      rating: 4.4
    },
    {
      title: "NEW MOVIE TRAILERS 2025 (Sci-Fi) 4K ULTRA HD",
      description: "Sci-Fi trailers including Avatar 3, Primitive War, Five Nights at Freddy's 2, and more.",
      videoUrl: "https://www.youtube.com/watch?v=LG-kmXsgTUs",
      thumbnailUrl: "https://i.ytimg.com/vi/LG-kmXsgTUs/hqdefault.jpg",
      duration: "15:00",
      views: "1.2M",
      rating: 4.6
    },
    {
      title: "'Coolie' Trailer (Tamil)",
      description: "Rajinikanth stars in this mass action drama directed by Lokesh Kanagaraj. Releases August 14.",
      videoUrl: "https://timesofindia.indiatimes.com/entertainment/tamil/movies/news/coolie-trailer-out-rajinikanth-roars-back-in-a-mass-action-drama-lokesh-kanagarajs-directorial-promises-a-vintage-treat/articleshow/123063019.cms",
      thumbnailUrl: "https://timesofindia.indiatimes.com/photo/123063019.cms",
      duration: "2:30",
      views: "500K",
      rating: 4.3
    },
    {
      title: "'Murderer Report' Trailer (Korean)",
      description: "Psychological thriller starring Jung Sung Il and Cho Yeo Jeong. Releases September 5, 2025.",
      videoUrl: "https://timesofindia.indiatimes.com/web-series/news/korean/murderer-report-trailer-cho-yeo-jeong-and-jung-sun-il-set-to-redefine-the-serial-killer-genre-with-new-heart-pounding-thriller/articleshow/123111709.cms",
      thumbnailUrl: "https://timesofindia.indiatimes.com/photo/123111709.cms",
      duration: "2:15",
      views: "400K",
      rating: 4.4
    },
    {
      title: "'Jay Kelly' Trailer",
      description: "Noah Baumbach's film starring George Clooney and Adam Sandler. Released by Netflix.",
      videoUrl: "https://economictimes.indiatimes.com/news/international/global-trends/jay-kelly-trailer-netflix-unveils-first-look-at-noah-baumbachs-film-starring-george-clooney-and-adam-sandler/articleshow/123122060.cms",
      thumbnailUrl: "https://economictimes.indiatimes.com/photo/123122060.cms",
      duration: "2:40",
      views: "700K",
      rating: 4.5
    },
    {
      title: "'Rental Family' Trailer",
      description: "Dramatic comedy starring Brendan Fraser. Premieres TIFF Sept, theaters Nov 21, 2025.",
      videoUrl: "https://economictimes.indiatimes.com/news/international/global-trends/searchlight-unveils-first-trailer-for-brendan-frasers-rental-family-plot-release-date-and-other-details/articleshow/123122778.cms",
      thumbnailUrl: "https://economictimes.indiatimes.com/photo/123122778.cms",
      duration: "3:00",
      views: "650K",
      rating: 4.6
    }
  ]
};


  const handleCategorySelect = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-800 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-gradient-to-br from-[#5b2333]/20 to-[#983b55]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.15, 0.05], rotate: [360, 180, 0] }}
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

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          >
            {videoContent[activeCategory].map((video, index) => (
              <VideoCard key={index} video={video} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative bg-gradient-to-r from-[#5b2333] via-[#7a3444] to-[#983b55] rounded-3xl p-10 text-white overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl" />
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
