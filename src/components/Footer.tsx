import { useState } from "react";
import { Github, MapPin, Heart, Activity, UserRound } from "lucide-react";
import DeveloperModal from "./DeveloperModal";

interface FooterProps {
  onDeveloperClick?: () => void;
}

const Footer = ({ onDeveloperClick }: FooterProps) => {
  const [isDeveloperModalOpen, setIsDeveloperModalOpen] = useState(false);
  
  const handleDeveloperClick = () => {
    if (onDeveloperClick) {
      onDeveloperClick();
    } else {
      setIsDeveloperModalOpen(true);
    }
  };
  
  const closeDeveloperModal = () => {
    setIsDeveloperModalOpen(false);
  };
  
  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary animate-pulse" />
              <h3 className="font-bold text-lg">MoviePulse</h3>
            </div>
            <p className="text-muted-foreground">
              Helping content creators develop media that resonates with global audiences by providing insights on entertainment preferences across films, TV, streaming platforms, YouTube content, and more.
            </p>
            <div className="flex items-center gap-2 text-muted-foreground mt-4">
              <MapPin className="w-4 h-4" />
              <span>Hyderabad, Telangana, India</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-bold text-lg">About</h3>
            <p className="text-muted-foreground">
              MoviePulse is a comprehensive entertainment analytics platform providing valuable insights for filmmakers, TV producers, streaming platforms, YouTube creators, and content creators of all types.
            </p>
            <p className="text-muted-foreground">
              We help you understand audience preferences across multiple media formats to create content that engages and delights viewers worldwide.
            </p>
            <button
              onClick={handleDeveloperClick}
              className="flex items-center gap-2 mt-4 px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
            >
              <UserRound className="w-4 h-4" />
              Developed By
            </button>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} MoviePulse. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm flex items-center gap-1">
              Designed and developed with <Heart className="w-4 h-4 text-red-500" /> by G. Thangella
            </p>
          </div>
        </div>
      </div>
      
      {!onDeveloperClick && (
        <DeveloperModal 
          isOpen={isDeveloperModalOpen} 
          onClose={closeDeveloperModal} 
        />
      )}
    </footer>
  );
};

export default Footer;
