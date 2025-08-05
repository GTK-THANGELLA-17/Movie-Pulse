
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Github, Linkedin, Globe, Code, Coffee, Heart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MobileDeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileDeveloperModal = ({ isOpen, onClose }: MobileDeveloperModalProps) => {
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
            <Card className="border-2 border-primary/20 shadow-2xl h-full flex flex-col overflow-hidden">
              <CardContent className="p-0 h-full flex flex-col">
                {/* Header with close button */}
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
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
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

                  {/* Scroll indicator */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                    <ChevronDown className="h-4 w-4 text-muted-foreground animate-bounce" />
                  </div>
                </div>

                {/* Scrollable content area */}
                <ScrollArea className="flex-1 min-h-0">
                  <div className="p-6 space-y-4">
                    {/* Developer details */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="space-y-4"
                    >
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">MoviePulse</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          An innovative platform designed to gather audience preferences and help content creators make data-driven decisions for better entertainment experiences.
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

                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h4 className="font-medium text-sm mb-2">About the Developer</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          G. Thangella is a passionate entrepreneur and tech explorer who specializes in creating digital solutions that make a real difference. With expertise in modern web technologies, he focuses on building user-centric applications.
                        </p>
                      </div>

                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h4 className="font-medium text-sm mb-2">Technology Stack</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          React, TypeScript, TailwindCSS, shadcn/ui, Framer Motion, Node.js, MongoDB, and other cutting-edge technologies to deliver exceptional user experiences.
                        </p>
                      </div>

                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h4 className="font-medium text-sm mb-2">Vision</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          To bridge the gap between content creators and their audiences through data-driven insights, helping shape the future of entertainment across all platforms.
                        </p>
                      </div>

                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h4 className="font-medium text-sm mb-2">Development Philosophy</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Every line of code is written with user experience in mind. I believe in creating applications that are not just functional, but delightful to use and accessible to everyone.
                        </p>
                      </div>

                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h4 className="font-medium text-sm mb-2">Contact & Social</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                          Connect with me on various platforms to stay updated with my latest projects and thoughts on technology and innovation.
                        </p>
                        
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2 h-10"
                            onClick={() => window.open('https://github.com/GTK-THANGELLA-17', '_blank')}
                          >
                            <Github className="w-4 h-4" />
                            <span className="text-xs">GitHub</span>
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2 h-10"
                            onClick={() => window.open('https://www.linkedin.com/in/gthangella/', '_blank')}
                          >
                            <Linkedin className="w-4 h-4" />
                            <span className="text-xs">LinkedIn</span>
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2 h-10"
                            onClick={() => window.open('https://thangella-creaftech-solutions.vercel.app/', '_blank')}
                          >
                            <Globe className="w-4 h-4" />
                            <span className="text-xs">Portfolio</span>
                          </Button>
                        </div>

                        <Button
                          className="w-full flex items-center gap-3 h-12 text-left justify-center bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                          onClick={() => window.open('mailto:imgtk17@gmail.com', '_blank')}
                        >
                          <Mail className="w-5 h-5" />
                          <span>Get in Touch</span>
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </ScrollArea>

                {/* Footer - Fixed at bottom */}
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
