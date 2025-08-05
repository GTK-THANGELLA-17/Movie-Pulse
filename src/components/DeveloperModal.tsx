import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Instagram, Linkedin, Mail, Globe, Twitter, ChevronDown } from "lucide-react";

export interface DeveloperModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeveloperModal({ open, onOpenChange }: DeveloperModalProps) {
  const developerLinks = [
    { icon: <Instagram className="w-5 h-5" />, label: "Instagram", url: "https://www.instagram.com/g_thangella_k/#" },
    { icon: <Github className="h-4 w-4" />, label: "GitHub", url: "https://github.com" },
    { icon: <Linkedin className="h-4 w-4 text-blue-600" />, label: "LinkedIn", url: "https://www.linkedin.com/in/gthangella/" },
    { icon: <Twitter className="h-4 w-4 text-blue-400" />, label: "Twitter", url: "https://twitter.com/g_thangella" },
    { icon: <Mail className="h-4 w-4 text-red-500" />, label: "Email", url: "mailto:imgtk17@gmail.com" },
    { icon: <Globe className="h-4 w-4 text-green-500" />, label: "Portfolio", url: "https://thangella-creaftech-solutions.vercel.app/" }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90%] max-w-2xl max-h-[90vh] rounded-lg p-0 overflow-hidden">
        <div className="flex flex-col h-full max-h-[90vh]">
          <DialogHeader className="p-6 flex-shrink-0 border-b relative">
            <DialogTitle className="text-xl text-center">Meet the Developer</DialogTitle>
            <DialogDescription className="text-center text-sm">
              Behind the Audience-Pulse application
            </DialogDescription>
            {/* Scroll indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
              <ChevronDown className="h-4 w-4 text-muted-foreground animate-bounce" />
            </div>
          </DialogHeader>

          <ScrollArea className="flex-1 min-h-0">
            <div className="p-6 space-y-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Avatar & Info */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left flex-shrink-0">
                  <Avatar className="h-24 w-24 border border-primary mb-4">
                    <AvatarImage src="/Images/Profile Pic.JPG" alt="G. Thangella" />
                    <AvatarFallback>GT</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold">G. Thangella</h3>
                  <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line leading-relaxed">
                    💼 Entrepreneur{"\n"}
                    🧠 Tech Explorer{"\n"}
                    🎨 Creative Thinker{"\n"}
                    🔭 Visionary
                  </p>

                  <div className="flex gap-2 mt-4 flex-wrap justify-center sm:justify-start">
                    {developerLinks.map((link, i) => (
                      <Button key={i} variant="outline" size="icon" asChild className="h-8 w-8 rounded-full">
                        <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                          {link.icon}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-6 text-sm flex-1">
                  <p className="text-base">
                    I build impactful digital tools to simplify complex systems. Audience-Pulse reflects my passion for entertainment-tech innovation and accessible design.
                  </p>

                  <div>
                    <h4 className="font-semibold text-base mb-2">Tech Stack of This Application</h4>
                    <p className="text-muted-foreground">
                      React, TypeScript, TailwindCSS, shadcn/ui, Framer Motion, Node.js, MongoDB
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-base mb-2">Mission</h4>
                    <p className="text-muted-foreground">
                      I'm driven to create meaningful digital products that solve real-world problems. My focus is building tools that inspire, innovate, and leave a lasting impact through technology and design.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-base mb-2">About Audience-Pulse</h4>
                    <p className="text-muted-foreground">
                      Audience-Pulse is designed to bridge the gap between content creators and their audiences. By gathering authentic opinions and preferences, we help shape the future of entertainment across all platforms.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-base mb-2">Development Philosophy</h4>
                    <p className="text-muted-foreground">
                      Every line of code is written with user experience in mind. I believe in creating applications that are not just functional, but delightful to use and accessible to everyone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          <Separator className="flex-shrink-0" />

          <DialogFooter className="flex flex-col sm:flex-row gap-3 justify-end p-6 flex-shrink-0">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
            <Button variant="default" asChild>
              <a href="mailto:imgtk17@gmail.com" target="_blank" rel="noopener noreferrer">
                Get in Touch
              </a>
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
