import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  Github,
  Linkedin,
  Globe,
  Code,
  Coffee,
  Heart,
  Instagram,
  Facebook,
  Twitter,
  MessageCircle,
  ExternalLink,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface MobileDeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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

const MobileDeveloperModal = ({
  isOpen,
  onClose,
}: MobileDeveloperModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="border-2 border-primary/20 shadow-2xl h-full flex flex-col">
              <CardContent className="p-0 h-full flex flex-col">
                {/* Header */}
                <div className="relative flex-shrink-0 text-center p-6 border-b">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="mx-auto mb-4"
                  >
                    <img
                      src="/Images/Profile Pic.JPG"
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.25, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary to-primary/70 rounded-full flex items-center justify-center"
                  >
                    <Code className="w-8 h-8 text-primary-foreground" />
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-bold text-foreground"
                  >
                    Developer Info
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-muted-foreground text-sm mt-2"
                  >
                    Connect with the creator of MoviePulse
                  </motion.p>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4"
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

                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <h3 className="font-semibold text-lg mb-2">MoviePulse</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        An innovative platform designed to gather audience preferences and help content
                        creators make data-driven decisions for better entertainment experiences.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
                      <Coffee className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">Built with passion and caffeine</span>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-lg">
                      <Heart className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <span className="text-sm">Made with ❤️ for the entertainment industry</span>
                    </div>
                  </motion.div>

                  {/* Contact Button */}
                  <Button
                    className="w-full flex items-center gap-3 h-12 text-left justify-start bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    onClick={() =>
                      window.open("mailto:contact@moviepulse.app", "_blank")
                    }
                  >
                    <Mail className="w-5 h-5" />
                    <span>Get in Touch</span>
                  </Button>

                  {/* Social Links */}
                  <div className="grid grid-cols-3 gap-3">
                    {socialLinks.map(({ icon, label, url }, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 h-10 justify-start"
                        onClick={() => window.open(url, "_blank")}
                      >
                        {icon}
                        <span className="text-xs">{label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex-shrink-0 p-4 border-t text-center"
                >
                  <p className="text-xs text-muted-foreground">
                    © 2024 MoviePulse. Shaping the future of entertainment.
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileDeveloperModal;
