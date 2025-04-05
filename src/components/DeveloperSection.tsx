import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Github, Mail, ExternalLink, Heart, Linkedin, Instagram, 
  Facebook, Twitter, MessageCircle, Smartphone, Video,
  Activity
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const DeveloperSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Developer photos
  const photos = [
    "https://source.unsplash.com/random/600x400/?portrait",
    "https://source.unsplash.com/random/600x400/?developer",
    "https://source.unsplash.com/random/600x400/?programmer",
    "https://source.unsplash.com/random/600x400/?coder",
  ];
  
  // Social links
  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, label: "GitHub", url: "https://github.com" },
    { icon: <Instagram className="w-5 h-5" />, label: "Instagram", url: "https://instagram.com" },
    { icon: <Facebook className="w-5 h-5" />, label: "Facebook", url: "https://facebook.com" },
    { icon: <Twitter className="w-5 h-5" />, label: "Twitter", url: "https://twitter.com" },
    { icon: <MessageCircle className="w-5 h-5" />, label: "Telegram", url: "https://telegram.org" },
    { icon: <ExternalLink className="w-5 h-5" />, label: "Reddit", url: "https://reddit.com" },
    { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", url: "https://linkedin.com" },
    { icon: <Smartphone className="w-5 h-5" />, label: "WhatsApp", url: "https://whatsapp.com" },
    { icon: <ExternalLink className="w-5 h-5" />, label: "Portfolio", url: "#" },
  ];
  
  // Auto advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % photos.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [photos.length]);
  
  return (
    <section id="developer" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-2"
          >
            <Activity className="w-6 h-6 text-primary animate-pulse" />
            <h2 className="text-3xl font-bold text-primary">Developed By</h2>
            <Activity className="w-6 h-6 text-primary animate-pulse" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-1 w-20 bg-primary rounded-full mb-6"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Developer Photo Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <Carousel className="w-full max-w-lg mx-auto">
              <CarouselContent>
                {photos.map((photo, index) => (
                  <CarouselItem key={index}>
                    <Card className="border-none">
                      <CardContent className="p-0">
                        <img 
                          src={photo} 
                          alt={`Developer profile ${index + 1}`} 
                          className="w-full aspect-square object-cover rounded-xl"
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-2 mt-4">
                {photos.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeIndex === index ? "bg-primary w-6" : "bg-primary/30"
                    }`}
                    onClick={() => setActiveIndex(index)}
                  />
                ))}
              </div>
              <div className="flex justify-center mt-4 gap-2">
                <CarouselPrevious className="relative static" />
                <CarouselNext className="relative static" />
              </div>
            </Carousel>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-6 flex justify-center"
            >
              <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-all">
                <Video className="w-5 h-5" />
                Watch Intro Video
              </button>
            </motion.div>
          </motion.div>
          
          {/* Developer Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold mb-2">GTK - Gadidamalla Thangella</h3>
              <p className="text-muted-foreground">Full Stack Developer & UI/UX Designer</p>
            </div>
            
            <div className="space-y-4">
              <p className="leading-relaxed">
                A passionate developer with expertise in creating engaging digital experiences. 
                Specializing in building intuitive web applications that combine beautiful design 
                with powerful functionality.
              </p>
              <p className="leading-relaxed">
                With a background in both frontend and backend technologies, I bring ideas to life 
                through clean code and creative problem-solving. My goal is to create software that 
                makes a positive impact on people's lives.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Connect with me:</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center gap-2 bg-card hover:bg-muted px-3 py-2 rounded-lg transition-colors"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div className="border-t border-border pt-4 mt-6">
              <p className="flex items-center gap-2 text-muted-foreground text-sm">
                Built with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> and dedication
              </p>
              <a 
                href="mailto:imgtk17@gmail.com" 
                className="flex items-center gap-2 text-primary hover:underline mt-1"
              >
                <Mail className="w-4 h-4" />
                imgtk17@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperSection;
