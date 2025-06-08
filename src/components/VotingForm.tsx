
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { FilmIndustry, Genre, ProjectType, FilmProjectType, Country, OTTPlatform, YouTubeContentCategory, YouTubeChannelType, TelevisionContentType, Vote } from "@/lib/types";
import { 
  FILM_INDUSTRIES, 
  GENRES, 
  FILM_PROJECT_TYPES,
  COUNTRIES, 
  OTT_PLATFORMS, 
  YOUTUBE_CHANNEL_TYPES,
  YOUTUBE_CONTENT_CATEGORIES,
  TELEVISION_CONTENT_TYPES,
  saveVote,
  saveVoteToBackend
} from "@/lib/data";
import { useVotingPeriod } from "@/contexts/VotingPeriodContext";
import { useVoted } from "@/contexts/VotedContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCheck } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import FilmIndustryFormFields from "@/components/FilmIndustryFormFields";
import YouTubeFormFields from "@/components/YouTubeFormFields";
import OTTFormFields from "@/components/OTTFormFields";
import TelevisionFormFields from "@/components/TelevisionFormFields";
import VoteSuccessAnimation from "@/components/VoteSuccessAnimation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface VotingFormProps {
  projectType: ProjectType;
  trackVote: (projectType: ProjectType) => void;
  onSubmit?: (data: any) => Promise<void>;
  isSubmitted?: boolean;
}

const VotingForm = ({ projectType, trackVote, onSubmit, isSubmitted = false }: VotingFormProps) => {
  const { toast } = useToast();
  const { votingPeriod } = useVotingPeriod();
  const { 
    hasVotedInFilm, 
    hasVotedInYoutubeFilm, 
    hasVotedInYoutubeContent, 
    hasVotedInOtt, 
    hasVotedInTelevision,
    markAsVoted 
  } = useVoted();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  
  // Form state
  const [filmProjectType, setFilmProjectType] = useState<FilmProjectType>(FILM_PROJECT_TYPES[0]);
  const [filmIndustry, setFilmIndustry] = useState<FilmIndustry>(FILM_INDUSTRIES[0]);
  const [genre, setGenre] = useState<Genre>(GENRES[0]);
  const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const [televisionCountry, setTelevisionCountry] = useState<Country | "">(""); 
  const [ottPlatform, setOttPlatform] = useState<OTTPlatform>(OTT_PLATFORMS[0]);
  const [youtubeChannelType, setYoutubeChannelType] = useState<YouTubeChannelType>(YOUTUBE_CHANNEL_TYPES[0]);
  const [youtubeContentCategory, setYoutubeContentCategory] = useState<YouTubeContentCategory>(YOUTUBE_CONTENT_CATEGORIES[0]);
  const [televisionChannel, setTelevisionChannel] = useState<string>("");
  const [televisionContentType, setTelevisionContentType] = useState<TelevisionContentType | "">(""); 
  const [notes, setNotes] = useState("");
  const [demographics, setDemographics] = useState({
    gender: "",
    age: "",
    region: ""
  });

  const hasVoted = 
    projectType === "Films" && hasVotedInFilm ||
    projectType === "YouTubeFilm" && hasVotedInYoutubeFilm ||
    projectType === "YouTubeContent" && hasVotedInYoutubeContent ||
    projectType === "OTTPlatform" && hasVotedInOtt ||
    projectType === "Television" && hasVotedInTelevision;

  const resetForm = () => {
    setFilmProjectType(FILM_PROJECT_TYPES[0]);
    setFilmIndustry(FILM_INDUSTRIES[0]);
    setGenre(GENRES[0]);
    setCountry(COUNTRIES[0]);
    setTelevisionCountry("");
    setOttPlatform(OTT_PLATFORMS[0]);
    setYoutubeChannelType(YOUTUBE_CHANNEL_TYPES[0]);
    setYoutubeContentCategory(YOUTUBE_CONTENT_CATEGORIES[0]);
    setTelevisionChannel("");
    setTelevisionContentType("");
    setNotes("");
    setDemographics({ gender: "", age: "", region: "" });
  };

  // Show "Already Submitted" message if user has voted
  if (hasVoted || isSubmitted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCheck className="h-5 w-5 text-green-600" />
            Opinion Already Submitted
          </CardTitle>
          <CardDescription>
            You have already submitted your opinion for {projectType === "Films" ? "Films" : 
            projectType === "YouTubeFilm" ? "YouTube Film" :
            projectType === "YouTubeContent" ? "YouTube Content" :
            projectType === "OTTPlatform" ? "OTT Platform" : "Television"}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="flex items-center justify-center mb-4">
              <CheckCheck className="h-12 w-12 text-green-600" />
            </div>
            <p className="text-lg font-medium text-green-700">Thank you for your valuable input!</p>
            <p className="text-sm text-muted-foreground mt-2">
              Your opinion has been recorded and will be reflected in the statistics.
              You can submit another opinion in the next period.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submission started for project type:', projectType);
    
    if (!votingPeriod.isActive) {
      console.log('Voting period not active');
      toast({
        title: "Opinion Submission Closed",
        description: "The opinion submission period has ended.",
        variant: "destructive",
      });
      return;
    }

    if (hasVoted) {
      console.log('User has already submitted opinion for this category');
      return;
    }

    // Validate required fields based on project type
    if (projectType === "Films") {
      if (!filmProjectType || !filmIndustry || !genre) {
        toast({
          title: "Missing Information",
          description: "Please select film type, film industry and genre.",
          variant: "destructive",
        });
        return;
      }
    }

    if (projectType === "YouTubeFilm") {
      if (!filmIndustry || !genre) {
        toast({
          title: "Missing Information", 
          description: "Please select both film industry and genre for YouTube Film.",
          variant: "destructive",
        });
        return;
      }
    }

    if (projectType === "YouTubeContent") {
      if (!youtubeChannelType || !youtubeContentCategory) {
        toast({
          title: "Missing Information",
          description: "Please select both channel type and content category.",
          variant: "destructive",
        });
        return;
      }
    }

    if (projectType === "OTTPlatform") {
      if (!ottPlatform || !genre) {
        toast({
          title: "Missing Information",
          description: "Please select both OTT platform and genre.",
          variant: "destructive",
        });
        return;
      }
    }

    if (projectType === "Television") {
      if (!televisionCountry || !televisionChannel || !televisionContentType) {
        toast({
          title: "Missing Information",
          description: "Please select country, television channel and content type.",
          variant: "destructive",
        });
        return;
      }
    }

    // Check demographics
    if (!demographics.gender || !demographics.age || !demographics.region) {
      toast({
        title: "Missing Demographics",
        description: "Please fill in all demographic information.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const userId = localStorage.getItem('moviepulse-browser-fingerprint') || 'anonymous';
      const ageNumber = parseInt(demographics.age.split('-')[0]) || 0;
      
      const voteData: Vote = {
        id: `${userId}-${projectType}-${Date.now()}`,
        projectType,
        country: projectType === "Television" ? televisionCountry as Country : country,
        demographics: {
          gender: demographics.gender,
          age: ageNumber,
          region: demographics.region
        },
        notes,
        timestamp: new Date().toISOString(),
        userId,
        // Optional fields based on project type
        ...(projectType === "Films" && { filmProjectType }),
        ...(filmIndustry && { filmIndustry }),
        ...(genre && { genre }),
        ...(ottPlatform && { ottPlatform }),
        ...(youtubeChannelType && { youtubeChannelType }),
        ...(youtubeContentCategory && { youtubeContentCategory }),
        ...(televisionChannel && { televisionChannel }),
        ...(televisionContentType && { televisionContentType })
      };

      console.log('Saving opinion data:', voteData);
      
      // If external onSubmit is provided, use it instead of the default logic
      if (onSubmit) {
        await onSubmit(voteData);
      } else {
        // Default submission logic
        saveVote(voteData);
        console.log('Opinion saved to local storage successfully');
        
        await markAsVoted(projectType);
        console.log('Opinion marked in session tracking');
        
        try {
          await saveVoteToBackend(voteData);
          console.log('Opinion saved to backend successfully');
        } catch (backendError) {
          console.log('Backend not available, but saved locally:', backendError);
        }
        
        setShowAnimation(true);
        
        toast({
          title: "✅ Your opinion has been submitted!",
          description: "Thank you for your valuable input.",
        });

        setTimeout(() => {
          setShowAnimation(false);
          setShowSuccess(false);
          resetForm();
        }, 4000);
      }

    } catch (error) {
      console.error('Error submitting opinion:', error);
      toast({
        title: "Error",
        description: "Failed to submit your opinion. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {showSuccess && (
          <div className="flex items-center rounded-md border border-green-500 bg-green-100 p-4 text-sm text-green-700">
            <CheckCheck className="mr-2 h-4 w-4" />
            Your opinion has been submitted successfully!
          </div>
        )}

        {/* Project-specific form fields */}
        {projectType === "Films" ? (
          <FilmIndustryFormFields
            filmProjectType={filmProjectType}
            onFilmProjectTypeChange={setFilmProjectType}
            filmIndustry={filmIndustry}
            onFilmIndustryChange={setFilmIndustry}
            genre={genre}
            onGenreChange={setGenre}
            notes={notes}
            onNotesChange={(e) => setNotes(e.target.value)}
            disabled={hasVoted || !votingPeriod.isActive}
            showProjectTypeSelector={true}
          />
        ) : projectType === "YouTubeFilm" ? (
          <FilmIndustryFormFields
            filmIndustry={filmIndustry}
            onFilmIndustryChange={setFilmIndustry}
            genre={genre}
            onGenreChange={setGenre}
            notes={notes}
            onNotesChange={(e) => setNotes(e.target.value)}
            disabled={hasVoted || !votingPeriod.isActive}
            showProjectTypeSelector={false}
          />
        ) : projectType === "YouTubeContent" ? (
          <YouTubeFormFields
            youtubeChannelType={youtubeChannelType}
            onYoutubeChannelTypeChange={setYoutubeChannelType}
            youtubeContentCategory={youtubeContentCategory}
            onYoutubeContentCategoryChange={setYoutubeContentCategory}
            notes={notes}
            onNotesChange={(e) => setNotes(e.target.value)}
            disabled={hasVoted || !votingPeriod.isActive}
          />
        ) : projectType === "OTTPlatform" ? (
          <OTTFormFields
            genre={genre}
            onGenreChange={setGenre}
            ottPlatform={ottPlatform}
            onOttPlatformChange={setOttPlatform}
            notes={notes}
            onNotesChange={(e) => setNotes(e.target.value)}
            disabled={hasVoted || !votingPeriod.isActive}
          />
        ) : projectType === "Television" ? (
          <TelevisionFormFields
            country={televisionCountry}
            onCountryChange={(value: string) => setTelevisionCountry(value as Country)}
            televisionChannel={televisionChannel}
            onTelevisionChannelChange={setTelevisionChannel}
            televisionContentType={televisionContentType}
            onTelevisionContentTypeChange={(value: string) => setTelevisionContentType(value as TelevisionContentType | "")}
            notes={notes}
            onNotesChange={(e) => setNotes(e.target.value)}
            disabled={hasVoted || !votingPeriod.isActive}
          />
        ) : null}

        {/* Country Selection - only for non-Television project types */}
        {projectType !== "Television" && (
          <div>
            <Label htmlFor="country">Country</Label>
            <Select
              value={country}
              onValueChange={(value: Country) => setCountry(value)}
              disabled={hasVoted || !votingPeriod.isActive}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Demographics Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select
              value={demographics.gender}
              onValueChange={(value) => setDemographics({ ...demographics, gender: value })}
              disabled={hasVoted || !votingPeriod.isActive}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="non-binary">Non-binary</SelectItem>
                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="age">Age</Label>
            <Select
              value={demographics.age}
              onValueChange={(value) => setDemographics({ ...demographics, age: value })}
              disabled={hasVoted || !votingPeriod.isActive}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select age" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="13-17">13-17</SelectItem>
                <SelectItem value="18-24">18-24</SelectItem>
                <SelectItem value="25-34">25-34</SelectItem>
                <SelectItem value="35-44">35-44</SelectItem>
                <SelectItem value="45-54">45-54</SelectItem>
                <SelectItem value="55-64">55-64</SelectItem>
                <SelectItem value="65+">65+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="region">Region</Label>
            <Input
              id="region"
              type="text"
              value={demographics.region}
              onChange={(e) => setDemographics({ ...demographics, region: e.target.value })}
              placeholder="Enter your city/town/village"
              disabled={hasVoted || !votingPeriod.isActive}
            />
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting || hasVoted || !votingPeriod.isActive}>
          {isSubmitting ? "Submitting..." : hasVoted ? "Already Submitted" : "Submit Opinion"}
        </Button>
      </form>

      {/* Success Animation */}
      <AnimatePresence>
        {showAnimation && (
          <VoteSuccessAnimation
            projectType={projectType}
            onComplete={() => setShowAnimation(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default VotingForm;
