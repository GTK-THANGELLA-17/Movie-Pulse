
import { useState } from 'react';
import { ProjectType } from '@/lib/types';
import { useOpinionStorage } from '@/hooks/useOpinionStorage';
import { useToast } from '@/hooks/use-toast';
import { useVoteTracking } from '@/hooks/useVoteTracking';

export const useFormSubmission = (
  projectType: ProjectType,
  formData: any,
  onSuccess: () => void,
  onComplete: () => void
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { saveOpinion } = useOpinionStorage();
  const { toast } = useToast();
  const { markAsVoted } = useVoteTracking();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Create base opinion object
      const opinion: any = {
        projectType,
        country: formData.country,
        demographics: formData.demographics,
        notes: formData.notes,
        timestamp: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };

      // Add project-specific fields based on type
      switch (projectType) {
        case 'Films':
          opinion.filmProjectType = formData.filmProjectType;
          opinion.filmIndustry = formData.filmIndustry;
          opinion.genre = formData.genre;
          break;
          
        case 'YouTubeFilm':
          opinion.filmIndustry = formData.filmIndustry;
          opinion.genre = formData.genre;
          break;
          
        case 'YouTubeContent':
          opinion.youtubeChannelType = formData.youtubeChannelType;
          opinion.youtubeContentCategory = formData.youtubeContentCategory;
          break;
          
        case 'InstagramContent':
          opinion.instagramContentType = formData.instagramContentType;
          break;
          
        case 'OTTPlatform':
          opinion.ottPlatform = formData.ottPlatform;
          opinion.genre = formData.genre;
          break;
          
        case 'Television':
          opinion.country = formData.televisionCountry || formData.country;
          opinion.televisionChannel = formData.televisionChannel;
          opinion.televisionContentType = formData.televisionContentType;
          break;
          
        case 'MusicContent':
          // For music content, use music-specific fields
          opinion.musicGenre = formData.musicGenre;
          opinion.musicMood = formData.musicMood;
          opinion.musicLanguage = formData.musicLanguage;
          break;
      }

      console.log('FormSubmission: Submitting opinion for', projectType, ':', opinion);

      // Save the opinion
      const savedOpinion = saveOpinion(opinion);
      
      // Track the vote
      await markAsVoted(projectType);
      
      // Show success animation
      onSuccess();
      
      toast({
        title: "Opinion Submitted Successfully!",
        description: `Your ${projectType === 'MusicContent' ? 'music' : projectType.toLowerCase()} opinion has been recorded.`,
      });

      // Complete after a delay
      setTimeout(() => {
        onComplete();
      }, 3000);

    } catch (error) {
      console.error('FormSubmission: Error submitting opinion:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your opinion. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting
  };
};
