
import { useToast } from "@/hooks/use-toast";
import { ProjectType } from "@/lib/types";

export const useVotingFormValidation = () => {
  const { toast } = useToast();

  const validateFormData = (
    projectType: ProjectType,
    formData: {
      filmProjectType?: string;
      filmIndustry?: string;
      genre?: string;
      youtubeChannelType?: string;
      youtubeContentCategory?: string;
      instagramContentType?: string;
      ottPlatform?: string;
      televisionCountry?: string;
      televisionChannel?: string;
      televisionContentType?: string;
      demographics: { gender: string; age: string; region: string };
    }
  ) => {
    // Validate required fields based on project type
    if (projectType === "Films") {
      if (!formData.filmProjectType || !formData.filmIndustry || !formData.genre) {
        toast({
          title: "Missing Information",
          description: "Please select film type, film industry and genre.",
          variant: "destructive",
        });
        return false;
      }
    }

    if (projectType === "YouTubeFilm") {
      if (!formData.filmIndustry || !formData.genre) {
        toast({
          title: "Missing Information", 
          description: "Please select both film industry and genre for YouTube Film.",
          variant: "destructive",
        });
        return false;
      }
    }

    if (projectType === "YouTubeContent") {
      if (!formData.youtubeChannelType || !formData.youtubeContentCategory) {
        toast({
          title: "Missing Information",
          description: "Please select both channel type and content category.",
          variant: "destructive",
        });
        return false;
      }
    }

    if (projectType === "InstagramContent") {
      if (!formData.instagramContentType) {
        toast({
          title: "Missing Information",
          description: "Please select Instagram content type.",
          variant: "destructive",
        });
        return false;
      }
    }

    if (projectType === "OTTPlatform") {
      if (!formData.ottPlatform || !formData.genre) {
        toast({
          title: "Missing Information",
          description: "Please select both OTT platform and genre.",
          variant: "destructive",
        });
        return false;
      }
    }

    if (projectType === "Television") {
      if (!formData.televisionCountry || !formData.televisionChannel || !formData.televisionContentType) {
        toast({
          title: "Missing Information",
          description: "Please select country, television channel and content type.",
          variant: "destructive",
        });
        return false;
      }
    }

    // Check demographics
    if (!formData.demographics.gender || !formData.demographics.age || !formData.demographics.region) {
      toast({
        title: "Missing Demographics",
        description: "Please fill in all demographic information.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  return { validateFormData };
};
