
import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const PlatformVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  
  const togglePlay = () => {
    const video = document.getElementById('platform-video') as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const toggleMute = () => {
    const video = document.getElementById('platform-video') as HTMLVideoElement;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">See MoviePulse in Action</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch how MoviePulse helps content creators make data-driven decisions to produce 
            more engaging and successful content across all platforms.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl"
        >
          <div className="aspect-w-16 aspect-h-9 bg-black">
            <video 
              id="platform-video"
              className="w-full h-full object-cover"
              poster="https://source.unsplash.com/random/1280x720/?cinema"
              muted
              loop
            >
               <source src="/Images/About-Movie-Pulse.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
            
            {/* Video Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className="w-20 h-20 rounded-full bg-primary/90 text-white flex items-center justify-center"
              >
                {isPlaying ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 ml-1" />}
              </motion.button>
            </div>
            
            {/* Video Controls */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button 
                onClick={toggleMute}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          <div className="bg-card p-6 dark:bg-card">
            <h3 className="text-xl font-bold mb-2">Platform Overview</h3>
            <p className="text-muted-foreground text-sm">
              This short video demonstrates how MoviePulse collects, analyzes, and visualizes audience 
              preferences to help content creators make better decisions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformVideo;
