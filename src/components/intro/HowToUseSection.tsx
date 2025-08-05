import { motion } from "framer-motion";
import { Play, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const HowToUseSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
    console.log("Playing tutorial video...");
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Video className="w-8 h-8 text-[#5b2333]" />
            <h2 className="text-3xl md:text-4xl font-bold">How to Use Audience-Pulse</h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Watch this quick tutorial to learn how to share your content preferences and help shape the future of entertainment
          </p>

          {/* Video Player Area */}
          <div className="relative max-w-3xl mx-auto mb-8">
            <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
              {!isVideoPlaying ? (
                <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-[#5b2333] to-[#983b55] text-white">
                  <div className="text-center">
                    <Play className="w-20 h-20 mx-auto mb-4 opacity-90" />
                    <h3 className="text-xl font-semibold mb-2">Tutorial Video</h3>
                    <p className="text-white/80 mb-6">Learn how to cast your opinion in 2 minutes</p>
                    <Button
                      onClick={handlePlayVideo}
                      size="lg"
                      className="bg-white text-[#5b2333] hover:bg-gray-100 font-semibold flex items-center gap-2"
                    >
                      <Play className="w-5 h-5" />
                      Play Tutorial
                    </Button>
                  </div>
                </div>
              ) : (
                <video
                  src="/About-Movie-Pulse.mp4"
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>

          {/* Quick Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <div className="w-12 h-12 bg-[#5b2333] text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Choose Content Type</h3>
              <p className="text-muted-foreground">Select from Films, YouTube, OTT, TV, or Instagram content</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <div className="w-12 h-12 bg-[#5b2333] text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Share Preferences</h3>
              <p className="text-muted-foreground">Tell us your genre, industry, and content preferences</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <div className="w-12 h-12 bg-[#5b2333] text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">See Impact</h3>
              <p className="text-muted-foreground">View real-time statistics and influence content creation</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToUseSection;
