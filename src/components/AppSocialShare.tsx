import React, { useState } from "react";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Share2, 
  Copy, 
  Check, 
  MessageCircle,
  Instagram,
  Globe
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface AppSocialShareProps {
  title?: string;
  description?: string;
  url?: string;
  variant?: "button" | "icon" | "full";
  showStats?: boolean;
}

const AppSocialShare = ({
  title = "MoviePulse - Shape the Future of Entertainment",
  description = "Share your content preferences and help creators understand what audiences really want!",
  url = "https://moviepulse-nu.vercel.app",
  variant = "button",
  showStats = false
}: AppSocialShareProps) => {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  // Use the correct public URL
  const baseUrl = "https://moviepulse-nu.vercel.app";
  const statsUrl = `${baseUrl}/stats`;
  const shareUrl = showStats ? statsUrl : baseUrl;

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  
  const shareLinks = [
    {
      name: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "bg-[#1877f2] hover:bg-[#0d6efd] text-white"
    },
    {
      name: "Twitter",
      icon: <Twitter className="w-5 h-5" />,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}%20-%20${encodedDescription}`,
      color: "bg-[#1da1f2] hover:bg-[#0c85d0] text-white"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "bg-[#0a66c2] hover:bg-[#084d93] text-white"
    },
    {
      name: "WhatsApp",
      icon: <MessageCircle className="w-5 h-5" />,
      url: `https://wa.me/?text=${encodedTitle}%20-%20${encodedDescription}%20${encodedUrl}`,
      color: "bg-[#25d366] hover:bg-[#1da851] text-white"
    },
    {
      name: "Reddit",
      icon: <Globe className="w-5 h-5" />,
      url: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      color: "bg-[#ff4500] hover:bg-[#e63e00] text-white"
    }
  ];
  
  const copyToClipboard = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        toast({
          title: "Link copied!",
          description: "The MoviePulse link has been copied to your clipboard",
        });
        
        setTimeout(() => setCopied(false), 2000);
      }).catch(err => {
        console.error('Failed to copy link:', err);
        toast({
          title: "Copy failed",
          description: "Could not copy the link. Please try again.",
          variant: "destructive",
        });
      });
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: shareUrl,
        });
      } catch (error) {
        console.log('Native sharing failed:', error);
        copyToClipboard();
      }
    } else {
      setIsOpen(true);
    }
  };

  if (variant === "icon") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNativeShare}
              className="rounded-full"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share MoviePulse</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  if (variant === "button") {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share {showStats ? "Stats" : "App"}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Share MoviePulse {showStats ? "Stats" : ""}</DialogTitle>
            <DialogDescription>
              Spread the word about MoviePulse and help us gather more audience insights!
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {shareLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md transition-all ${link.color}`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {link.icon}
                  <span className="text-sm font-medium">{link.name}</span>
                </motion.a>
              ))}
            </div>
            
            <div className="pt-2 border-t">
              <motion.button
                onClick={copyToClipboard}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                <span>{copied ? "Copied!" : "Copy Link"}</span>
              </motion.button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Full variant
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg flex items-center gap-2">
        <Share2 className="w-5 h-5 text-primary" /> 
        Share MoviePulse {showStats ? "Stats" : ""}
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {shareLinks.map((link) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md transition-all ${link.color}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {link.icon}
            <span className="text-sm font-medium">{link.name}</span>
          </motion.a>
        ))}
      </div>
      
      <motion.button
        onClick={copyToClipboard}
        className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
        <span>{copied ? "Link Copied!" : "Copy Link"}</span>
      </motion.button>
    </div>
  );
};

export default AppSocialShare;
