import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const images = [
    {
      url: "/Images/1.jpg",  // Correct path to public folder
      title: "Global Content Trends",
      description: "Discover emerging preferences across different regions and demographics."
    },
    {
      url: "/Images/2.jpg", 
      title: "Streaming Analytics",
      description: "Analyze what audiences love about popular streaming content."
    },
    {
      url: "/Images/3.jpg",
      title: "Digital Creator Insights",
      description: "Understand what drives engagement in online video content."
    },
    {
      url: "/Images/4.jpg",
      title: "Data-Driven Decisions",
      description: "Make informed choices based on comprehensive audience analytics."
    },
    {
      url: "/Images/5.jpg",
      title: "Content Creation Tools",
      description: "Leverage advanced tools for efficient content creation."
    },
    {
      url: "/Images/6.jpg",
      title: "Audience Engagement",
      description: "Track engagement and optimize content strategies."
    },
    {
      url: "/Images/7.jpg",
      title: "Market Insights",
      description: "Gain valuable insights into market trends and consumer behavior."
    },
    {
      url: "/Images/8.jpg",
      title: "Creator Collaboration",
      description: "Collaborate with top creators to boost reach."
    },
    {
      url: "/Images/9.jpg",
      title: "Content Personalization",
      description: "Customize content experiences for diverse audiences."
    },
    {
      url: "/Images/10.jpg",
      title: "Global Distribution",
      description: "Expand your content reach across different platforms."
    }
  ];

  useEffect(() => {
    let interval: number | null = null;

    if (isAutoPlaying) {
      interval = window.setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 2000); // Set to 1000ms (1 second)
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, images.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <section className="relative bg-muted/20 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold mb-4">Platform Highlights</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore how MoviePulse revolutionizes content creation through data-driven insights.
          </p>
        </motion.div>

        <div className="relative w-full max-w-5xl mx-auto">
          {/* Card container with fixed height */}
          <div className="overflow-hidden rounded-xl shadow-lg bg-card h-[400px] sm:h-[500px] lg:h-[600px]">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: currentIndex === index ? 1 : 0,
                  zIndex: currentIndex === index ? 1 : 0 
                }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                <img 
                  src={image.url} 
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover" // Fill the card without distortion
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{image.title}</h3>
                    <p className="text-white/80 max-w-xl">{image.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentIndex === index 
                    ? "bg-primary w-6" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageSlideshow;
