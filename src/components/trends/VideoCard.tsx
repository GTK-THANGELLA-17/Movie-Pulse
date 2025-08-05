
import { Play, Star } from "lucide-react";
import { motion } from "framer-motion";

interface Video {
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  views: string;
  rating: number;
}

interface VideoCardProps {
  video: Video;
  index: number;
}

const VideoCard = ({ video, index }: VideoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:border-[#5b2333]/30 transition-all duration-500 transform hover:-translate-y-2"
    >
      <div className="relative aspect-video overflow-hidden">
        <iframe
          src={video.videoUrl}
          title={video.title}
          className="w-full h-full transition-transform duration-700 group-hover:scale-105"
          allowFullScreen
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
              <Play className="w-3 h-3 text-white" />
              <span className="text-white text-xs font-medium">{video.duration}</span>
            </div>
          </div>
          
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
              <Star className="w-3 h-3 text-yellow-400" />
              <span className="text-white text-xs font-medium">{video.rating}</span>
            </div>
          </div>
          
          <div className="absolute top-3 right-3">
            <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              {video.views} views
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-xl text-[#5b2333] dark:text-white mb-3 group-hover:text-[#983b55] transition-colors">
          {video.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {video.description}
        </p>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{video.rating}/5</span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">{video.views} views</span>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoCard;
