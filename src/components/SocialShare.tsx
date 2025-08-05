
import React, { useState } from "react";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Share2, 
  Copy, 
  Check, 
  Globe
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";

interface SocialShareProps {
  title?: string;
  description?: string;
  url?: string;
  className?: string;
  variant?: "icon-only" | "full" | "compact";
}

const SocialShare = ({
  title = "Share your opinion on Audience-Pulse",
  description = "Help shape the future of entertainment by sharing your content preferences",
  url = typeof window !== 'undefined' ? window.location.href : '',
  className = "",
  variant = "full"
}: SocialShareProps) => {
  const [copied, setCopied] = useState(false);
  
  // Fix window not defined during server rendering
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const encodedUrl = encodeURIComponent(url || currentUrl);
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
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "bg-[#1da1f2] hover:bg-[#0c85d0] text-white"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "bg-[#0a66c2] hover:bg-[#084d93] text-white"
    }
  ];
  
  const copyToClipboard = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(url || currentUrl).then(() => {
        setCopied(true);
        toast({
          title: "Link copied!",
          description: "The link has been copied to your clipboard",
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
  
  if (variant === "icon-only") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <TooltipProvider>
          {shareLinks.map((link) => (
            <Tooltip key={link.name}>
              <TooltipTrigger asChild>
                <motion.a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full transition-all ${link.color}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Share on ${link.name}`}
                >
                  {link.icon}
                </motion.a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share on {link.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
          
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                onClick={copyToClipboard}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Copy link"
              >
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </motion.button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy link</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }
  
  if (variant === "compact") {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                onClick={() => {
                  if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare) {
                    const shareData = {
                      title: title,
                      text: description,
                      url: url || currentUrl,
                    };
                    
                    if (navigator.canShare(shareData)) {
                      navigator.share(shareData)
                        .catch((error) => {
                          console.log('Error sharing:', error);
                          copyToClipboard(); // Fallback to copying link
                        });
                    } else {
                      copyToClipboard();
                    }
                  } else {
                    // If Web Share API is not available
                    copyToClipboard();
                  }
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </motion.button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share this content</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }
  
  // Default "full" variant
  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="font-medium flex items-center gap-2">
        <Globe className="w-5 h-5 text-primary" /> 
        Share with your network
      </h3>
      
      <div className="flex flex-wrap items-center gap-2">
        {shareLinks.map((link) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${link.color}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {link.icon}
            <span>{link.name}</span>
          </motion.a>
        ))}
        
        <motion.button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
          <span>{copied ? "Copied!" : "Copy link"}</span>
        </motion.button>
      </div>
    </div>
  );
};

export default SocialShare;
