
import { useState } from "react";
import { ChevronDown, Play, Mail, Phone, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const LatestTrends = () => {
  const [activeCategory, setActiveCategory] = useState("Hollywood");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMobile = useIsMobile();

  const categories = [
    { id: "Hollywood", label: "Hollywood" },
    { id: "Bollywood", label: "Bollywood" },
    { id: "Tollywood", label: "Tollywood" },
    { id: "Television", label: "Television" },
    { id: "YouTube", label: "YouTube" },
    { id: "OTT", label: "OTT Platforms" }
  ];

  const videoContent = {
    Hollywood: [
      {
        title: "Latest Marvel Trailer",
        description: "Experience the newest superhero adventure",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "2:45"
      },
      {
        title: "Christopher Nolan Behind Scenes",
        description: "Exclusive behind-the-scenes footage",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "4:20"
      }
    ],
    Bollywood: [
      {
        title: "Shah Rukh Khan's New Film",
        description: "Action-packed thriller preview",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "3:15"
      },
      {
        title: "South Indian Blockbuster",
        description: "Pan-Indian cinema at its best",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "2:30"
      }
    ],
    Tollywood: [
      {
        title: "Epic Action Sequence",
        description: "High-octane Telugu cinema",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "3:00"
      },
      {
        title: "Mythological Drama",
        description: "Grand visual spectacle",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "4:45"
      }
    ],
    Television: [
      {
        title: "Reality Show Highlights",
        description: "Best moments compilation",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "5:30"
      },
      {
        title: "Crime Series Teaser",
        description: "Suspenseful investigation drama",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "1:45"
      }
    ],
    YouTube: [
      {
        title: "Educational Content Special",
        description: "Learning made engaging",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "8:20"
      },
      {
        title: "Gaming Livestream",
        description: "Epic gaming moments",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "12:15"
      }
    ],
    OTT: [
      {
        title: "International Series Preview",
        description: "Global content showcase",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "3:40"
      },
      {
        title: "Documentary Feature",
        description: "Real stories, real impact",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "6:25"
      }
    ]
  };

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
    if (isMobile) {
      setIsDropdownOpen(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-[#f7f4f3] to-white dark:from-black dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg text-[#5b2333] dark:text-white mb-4">
            Latest Entertainment Videos
          </h2>
          <p className="body-base text-black/70 dark:text-white/70 max-w-2xl mx-auto">
            Watch exclusive content and trailers from across the entertainment industry
          </p>
        </motion.div>

        {/* Category Selection */}
        <div className="mb-8">
          {isMobile ? (
            // Mobile Dropdown
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg font-medium text-black dark:text-white"
              >
                <span>{categories.find(c => c.id === activeCategory)?.label}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50"
                  >
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
                      >
                        {category.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            // Desktop Tabs
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeCategory === category.id
                      ? "bg-[#5b2333] text-white dark:bg-white dark:text-black"
                      : "bg-white/70 text-black hover:bg-white dark:bg-gray-800/70 dark:text-white dark:hover:bg-gray-800"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Video Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          >
            {videoContent[activeCategory as keyof typeof videoContent].map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="relative aspect-video">
                  <iframe
                    src={video.videoUrl}
                    title={video.title}
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-black dark:text-white mb-2">
                    {video.title}
                  </h3>
                  <p className="text-black/70 dark:text-white/70">
                    {video.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Advertising & Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-r from-[#5b2333] to-[#983b55] rounded-xl p-8 text-white"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Advertising Section */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Advertise With Us</h3>
              <p className="mb-6 text-white/90">
                Reach millions of entertainment enthusiasts through our platform. 
                Partner with MoviePulse to showcase your content to engaged audiences.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Targeted audience reach</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Multi-platform advertising</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Real-time analytics</span>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Get In Touch</h3>
              <p className="mb-6 text-white/90">
                Ready to collaborate? Contact our team to discuss advertising opportunities 
                and partnership possibilities.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <span>advertise@moviepulse.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  <span>Entertainment District, Los Angeles, CA</span>
                </div>
              </div>
              <button className="mt-6 bg-white text-[#5b2333] px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors">
                Contact Sales Team
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestTrends;
