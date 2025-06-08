
import { useEffect } from "react";
import { ProjectType } from "./types";

// Add TypeScript interface for the global window object
declare global {
  interface Window {
    VotingForm?: {
      needsPatch?: boolean;
      handleTelevisionSubmit?: (...args: any[]) => Promise<any>;
      handleOttSubmit?: (...args: any[]) => Promise<any>;
      handleYoutubeContentSubmit?: (...args: any[]) => Promise<any>;
      getTelevisionFormData?: () => Record<string, any>;
      getOttFormData?: () => Record<string, any>;
      getYoutubeContentFormData?: () => Record<string, any>;
      state?: Record<string, any>;
    };
  }
}

// Export the generateShareableContent function
export function generateShareableContent(projectType: string): { title: string; description: string } {
  switch (projectType) {
    case 'HighBudgetFilm':
      return {
        title: "I just voted on high-budget films on MoviePulse!",
        description: "Help shape the future of entertainment by sharing your preferences for high-budget films."
      };
    case 'LowBudgetFilm':
      return {
        title: "I just supported low-budget films on MoviePulse!",
        description: "Independent cinema needs your voice! Share your preferences for low-budget films."
      };
    case 'ShortFilm':
      return {
        title: "I just voted for short films on MoviePulse!",
        description: "Short films deserve attention too! Share your preferences and help filmmakers."
      };
    case 'YouTubeFilm':
      return {
        title: "I just voted for YouTube films on MoviePulse!",
        description: "YouTube filmmakers need your feedback! Share your preferences for YouTube films."
      };
    case 'YouTubeContent':
      return {
        title: "I just voted for YouTube content on MoviePulse!",
        description: "Your opinion matters! Help shape the future of YouTube content creation."
      };
    case 'OTTPlatform':
      return {
        title: "I just voted for OTT content on MoviePulse!",
        description: "Streaming services need your feedback! Share your preferences for OTT content."
      };
    case 'Television':
      return {
        title: "I just voted for television content on MoviePulse!",
        description: "Help shape the future of television by sharing your content preferences!"
      };
    default:
      return {
        title: "I just shared my opinion on MoviePulse!",
        description: "Help shape the future of entertainment by sharing your preferences."
      };
  }
}

export function useVotingFormPatches() {
  useEffect(() => {
    // This patch extends the original VotingForm component to handle
    // the additional fields required for Television, OTT, and YouTube Content
    const patchVotingForm = () => {
      try {
        // Check if window.VotingForm exists and needs patching
        if (typeof window === 'undefined' || !window.VotingForm || window.VotingForm.needsPatch !== true) {
          return;
        }

        // Patch the form submission to include all the new fields
        const originalHandleTelevisionSubmit = window.VotingForm.handleTelevisionSubmit;
        
        if (originalHandleTelevisionSubmit) {
          window.VotingForm.handleTelevisionSubmit = async function(...args) {
            // Get form data from the context
            const formData = this.getTelevisionFormData ? this.getTelevisionFormData() : {};
            
            // Add Television channel and content type
            formData.televisionChannel = this.state?.televisionChannel || "";
            formData.televisionContentType = this.state?.televisionContentType || "";
            
            // Call original handler with enhanced data
            return originalHandleTelevisionSubmit.apply(this, args);
          };
        }
        
        // Patch OTT submission
        const originalHandleOttSubmit = window.VotingForm.handleOttSubmit;
        
        if (originalHandleOttSubmit) {
          window.VotingForm.handleOttSubmit = async function(...args) {
            // Get form data
            const formData = this.getOttFormData ? this.getOttFormData() : {};
            
            // Ensure OTT platform is included
            formData.ottPlatform = this.state?.ottPlatform || "";
            
            // Call original handler with enhanced data
            return originalHandleOttSubmit.apply(this, args);
          };
        }
        
        // Patch YouTube content submission
        const originalHandleYoutubeContentSubmit = window.VotingForm.handleYoutubeContentSubmit;
        
        if (originalHandleYoutubeContentSubmit) {
          window.VotingForm.handleYoutubeContentSubmit = async function(...args) {
            // Get form data
            const formData = this.getYoutubeContentFormData ? this.getYoutubeContentFormData() : {};
            
            // Ensure YouTube content category is included
            formData.youtubeContentCategory = this.state?.youtubeContentCategory || "";
            
            // Call original handler with enhanced data
            return originalHandleYoutubeContentSubmit.apply(this, args);
          };
        }
        
        console.log("🔄 VotingForm patched with enhanced form fields");
        window.VotingForm.needsPatch = false;
      } catch (error) {
        console.error("Failed to patch VotingForm:", error);
      }
    };

    // Run the patch when component mounts
    patchVotingForm();
    
    // Set up an interval to keep trying if not successful at first
    const patchInterval = setInterval(() => {
      if (typeof window !== 'undefined' && window.VotingForm?.needsPatch === true) {
        patchVotingForm();
      } else {
        clearInterval(patchInterval);
      }
    }, 500);
    
    return () => {
      clearInterval(patchInterval);
    };
  }, []);
}
