import { useState, useEffect, useMemo } from "react";
import { Check, Film, AlertCircle, BookText, CalendarDays, Lock, Timer, ChevronDown, Tv } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { 
  COUNTRIES, 
  INDUSTRY_BY_COUNTRY, 
  GENRES, 
  saveVote, 
  PROJECT_TYPES,
  PROJECT_TYPE_LABELS,
  OTT_PLATFORMS,
  hasUserVoted,
  hasUserVotedInSection,
  YOUTUBE_GENRES,
  OTT_GENRES,
  YOUTUBE_CONTENT_CATEGORIES,
  YOUTUBE_CONTENT_CATEGORY_LABELS,
  ALL_YOUTUBE_CONTENT_CATEGORIES,
  TELEVISION_CHANNELS_BY_COUNTRY,
  TELEVISION_CONTENT_TYPES
} from "@/lib/data";
import { Country, FilmIndustry, Genre, ProjectType, OTTPlatform, YouTubeContentCategory, TelevisionChannel, TelevisionContentType } from "@/lib/types";
import { useVotingPeriod } from "@/contexts/VotingPeriodContext";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";

const VotingForm = () => {
  const { toast } = useToast();
  const { isVotingActive, remainingDays, votingPeriod } = useVotingPeriod();
  const [country, setCountry] = useState<Country | "">("");
  const [filmIndustry, setFilmIndustry] = useState<FilmIndustry | "">("");
  const [genre, setGenre] = useState<Genre | "">("");
  const [projectType, setProjectType] = useState<ProjectType | "">("");
  const [ottPlatform, setOttPlatform] = useState<OTTPlatform | "">("");
  const [youtubeCategory, setYoutubeCategory] = useState<YouTubeContentCategory | "">("");
  const [youtubeSection, setYoutubeSection] = useState<string>("Gaming");
  const [televisionChannel, setTelevisionChannel] = useState<TelevisionChannel | "">("");
  const [televisionContentType, setTelevisionContentType] = useState<TelevisionContentType | "">("");
  const [notes, setNotes] = useState("");
  const [availableIndustries, setAvailableIndustries] = useState<FilmIndustry[]>([]);
  const [availableChannels, setAvailableChannels] = useState<TelevisionChannel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("film");
  const [hasVotedInFilm, setHasVotedInFilm] = useState(false);
  const [hasVotedInYoutubeFilm, setHasVotedInYoutubeFilm] = useState(false);
  const [hasVotedInYoutubeContent, setHasVotedInYoutubeContent] = useState(false);
  const [hasVotedInOtt, setHasVotedInOtt] = useState(false);
  const [hasVotedInTelevision, setHasVotedInTelevision] = useState(false);

  useEffect(() => {
    setHasVotedInFilm(
      hasUserVotedInSection("HighBudgetFilm") || 
      hasUserVotedInSection("LowBudgetFilm") || 
      hasUserVotedInSection("ShortFilm")
    );
    setHasVotedInYoutubeFilm(hasUserVotedInSection("YouTubeFilm"));
    setHasVotedInYoutubeContent(hasUserVotedInSection("YouTubeContent"));
    setHasVotedInOtt(hasUserVotedInSection("OTTPlatform"));
    setHasVotedInTelevision(hasUserVotedInSection("Television"));
  }, []);

  const youtubeGenreOptions = useMemo(() => 
    GENRES.filter(g => ["Comedy", "Educational", "Animation", "Drama", "Documentary", "Action", "Thriller", "Horror"].includes(g)), 
    []
  );

  const youtubeCategoriesForSection = useMemo(() => {
    return YOUTUBE_CONTENT_CATEGORIES[youtubeSection] || [];
  }, [youtubeSection]);

  useEffect(() => {
    if (country) {
      setAvailableIndustries(INDUSTRY_BY_COUNTRY[country] || []);
      setAvailableChannels(TELEVISION_CHANNELS_BY_COUNTRY[country] || []);
      
      if (activeTab !== "television" && activeTab !== "youtubeContent") {
        setFilmIndustry("");
      }
      
      if (activeTab === "television") {
        setTelevisionChannel("");
      }
      
      setGenre("");
    } else {
      setAvailableIndustries([]);
      setAvailableChannels([]);
    }
    
    if (activeTab === "film") {
      setProjectType("HighBudgetFilm");
    } else if (activeTab === "youtubeFilm") {
      setProjectType("YouTubeFilm");
    } else if (activeTab === "youtubeContent") {
      setProjectType("YouTubeContent");
    } else if (activeTab === "ott") {
      setProjectType("OTTPlatform");
    } else if (activeTab === "television") {
      setProjectType("Television");
    }
  }, [country, activeTab]);

  useEffect(() => {
    if (projectType !== "OTTPlatform") {
      setOttPlatform("");
    }
    
    if (projectType !== "YouTubeContent") {
      setYoutubeCategory("");
    }
    
    if (projectType !== "Television") {
      setTelevisionChannel("");
      setTelevisionContentType("");
    }
  }, [projectType]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCountry("");
    setFilmIndustry("");
    setGenre("");
    setNotes("");
    setOttPlatform("");
    setYoutubeCategory("");
    setTelevisionChannel("");
    setTelevisionContentType("");

    if (value === "film") {
      setProjectType("HighBudgetFilm");
    } else if (value === "youtubeFilm") {
      setProjectType("YouTubeFilm");
    } else if (value === "youtubeContent") {
      setProjectType("YouTubeContent");
    } else if (value === "ott") {
      setProjectType("OTTPlatform");
    } else if (value === "television") {
      setProjectType("Television");
    }
  };

  const checkIfUserCanVote = (): boolean => {
    if (activeTab === "film" && hasVotedInFilm) {
      toast({
        title: "You've already shared your opinion in Films category",
        description: "Thank you for your opinion! You can share your opinion again in the next voting period. You can still share your opinion in other categories if you haven't already.",
        variant: "destructive",
      });
      return false;
    }
    
    if (activeTab === "youtubeFilm" && hasVotedInYoutubeFilm) {
      toast({
        title: "You've already shared your opinion in YouTube Films category",
        description: "Thank you for your opinion! You can share your opinion again in the next voting period. You can still share your opinion in other categories if you haven't already.",
        variant: "destructive",
      });
      return false;
    }
    
    if (activeTab === "youtubeContent" && hasVotedInYoutubeContent) {
      toast({
        title: "You've already shared your opinion in YouTube Content category",
        description: "Thank you for your opinion! You can share your opinion again in the next voting period. You can still share your opinion in other categories if you haven't already.",
        variant: "destructive",
      });
      return false;
    }
    
    if (activeTab === "ott" && hasVotedInOtt) {
      toast({
        title: "You've already shared your opinion in OTT category",
        description: "Thank you for your opinion! You can share your opinion again in the next voting period. You can still share your opinion in other categories if you haven't already.",
        variant: "destructive",
      });
      return false;
    }
    
    if (activeTab === "television" && hasVotedInTelevision) {
      toast({
        title: "You've already shared your opinion in Television category",
        description: "Thank you for your opinion! You can share your opinion again in the next voting period. You can still share your opinion in other categories if you haven't already.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!country || !projectType) {
      toast({
        title: "Please complete all required fields",
        description: "Country and other required fields must be completed to submit your opinion.",
        variant: "destructive",
      });
      return;
    }

    if ((activeTab === "film" || activeTab === "youtubeFilm" || activeTab === "ott") && (!filmIndustry || !genre)) {
      toast({
        title: "Please complete all required fields",
        description: "Film industry and genre are required fields for this category.",
        variant: "destructive",
      });
      return;
    }

    if (projectType === "OTTPlatform" && !ottPlatform) {
      toast({
        title: "Please select an OTT platform",
        description: "OTT platform selection is required for OTT content votes.",
        variant: "destructive",
      });
      return;
    }
    
    if (projectType === "YouTubeContent" && !youtubeCategory) {
      toast({
        title: "Please select a YouTube content category",
        description: "YouTube content category selection is required for YouTube content votes.",
        variant: "destructive",
      });
      return;
    }
    
    if (projectType === "Television" && (!televisionChannel || !televisionContentType)) {
      toast({
        title: "Please select a Television channel and content type",
        description: "Television channel and content type selections are required for Television votes.",
        variant: "destructive",
      });
      return;
    }

    if (!isVotingActive) {
      toast({
        title: "Voting is currently closed",
        description: "The current voting period is not active. Please check back later.",
        variant: "destructive",
      });
      return;
    }
    
    if (!checkIfUserCanVote()) {
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      try {
        saveVote({
          country: country as Country,
          filmIndustry: filmIndustry as FilmIndustry | undefined,
          genre: genre as Genre | undefined,
          projectType: projectType as ProjectType,
          ottPlatform: ottPlatform as OTTPlatform | undefined,
          youtubeContentCategory: youtubeCategory as YouTubeContentCategory | undefined,
          televisionChannel: televisionChannel as TelevisionChannel | undefined,
          televisionContentType: televisionContentType as TelevisionContentType | undefined,
          notes: notes.trim() || undefined
        });
        
        if (activeTab === "film") {
          setHasVotedInFilm(true);
        } else if (activeTab === "youtubeFilm") {
          setHasVotedInYoutubeFilm(true);
        } else if (activeTab === "youtubeContent") {
          setHasVotedInYoutubeContent(true);
        } else if (activeTab === "ott") {
          setHasVotedInOtt(true);
        } else if (activeTab === "television") {
          setHasVotedInTelevision(true);
        }
        
        setShowSuccess(true);
        
        setTimeout(() => {
          setCountry("");
          setFilmIndustry("");
          setGenre("");
          setOttPlatform("");
          setYoutubeCategory("");
          setTelevisionChannel("");
          setTelevisionContentType("");
          setNotes("");
          setShowSuccess(false);
          
          showConfetti();
        }, 2000);
        
        toast({
          title: "Opinion submitted successfully!",
          description: "Thank you for sharing your preference and helping shape the future of content creation.",
          variant: "default",
        });
      } catch (error) {
        toast({
          title: "Error submitting opinion",
          description: "There was a problem saving your opinion. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  const showConfetti = () => {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.zIndex = '9999';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    document.body.appendChild(container);

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      const size = Math.random() * 10 + 5;
      
      confetti.style.position = 'absolute';
      confetti.style.width = size + 'px';
      confetti.style.height = size + 'px';
      confetti.style.backgroundColor = ['#5b2333', '#f7f4f3', '#00b2ff', '#ff5e5e'][Math.floor(Math.random() * 4)];
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-20px';
      confetti.style.opacity = '1';
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      container.appendChild(confetti);
      
      const animationDuration = Math.random() * 3 + 2;
      const horizMove = (Math.random() - 0.5) * 20;
      
      confetti.animate([
        { transform: `translateY(0) translateX(0) rotate(0deg)`, opacity: 1 },
        { transform: `translateY(${window.innerHeight + 100}px) translateX(${horizMove}vw) rotate(${Math.random() * 720 - 360}deg)`, opacity: 0 }
      ], { 
        duration: animationDuration * 1000, 
        easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)' 
      });
      
      setTimeout(() => {
        if (container.contains(confetti)) {
          container.removeChild(confetti);
        }
      }, animationDuration * 1000);
    }
    
    setTimeout(() => {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    }, 5000);
  };

  const renderVotingPeriodStatus = () => (
    <div className={cn(
      "mt-4 p-3 rounded-lg text-sm border",
      isVotingActive 
        ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400" 
        : "bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400"
    )}>
      <div className="flex items-center gap-2">
        <CalendarDays className="w-5 h-5" />
        {isVotingActive ? (
          <span>
            Voting is currently <strong>open</strong> with {remainingDays} days remaining
          </span>
        ) : (
          <span>
            Voting is currently <strong>closed</strong>
          </span>
        )}
      </div>
      <div className="text-xs mt-1">
        {isVotingActive ? (
          <span>
            Current period: {new Date(votingPeriod.startDate).toLocaleDateString()} to{" "}
            {new Date(votingPeriod.endDate).toLocaleDateString()}
          </span>
        ) : (
          <span>
            Check back later for the next voting period
          </span>
        )}
      </div>
    </div>
  );

  const renderForm = () => {
    const hasVotedInCurrentTab = 
      (activeTab === "film" && hasVotedInFilm) || 
      (activeTab === "youtubeFilm" && hasVotedInYoutubeFilm) ||
      (activeTab === "youtubeContent" && hasVotedInYoutubeContent) ||
      (activeTab === "ott" && hasVotedInOtt) ||
      (activeTab === "television" && hasVotedInTelevision);

    if (hasVotedInCurrentTab && isVotingActive) {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-12 px-6"
        >
          <Alert variant="default" className="border-primary/30 bg-primary/5">
            <Lock className="h-5 w-5 text-primary" />
            <AlertTitle className="text-primary font-semibold text-lg">You've already shared your opinion in this section</AlertTitle>
            <AlertDescription className="mt-2">
              <p className="text-muted-foreground">
                Thank you for your input! You can share your opinion again in the next voting period.
                Stay tuned and keep smiling - your feedback helps shape the future of entertainment!
              </p>
              
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Timer className="h-4 w-4" />
                <span>Next voting period starts after {new Date(votingPeriod.endDate).toLocaleDateString()}</span>
              </div>
              
              {!hasVotedInFilm || !hasVotedInYoutubeFilm || !hasVotedInYoutubeContent || !hasVotedInOtt || !hasVotedInTelevision ? (
                <p className="mt-4 text-sm font-medium">
                  You can still share your opinion in{" "}
                  {[
                    !hasVotedInFilm && "Films",
                    !hasVotedInYoutubeFilm && "YouTube Films",
                    !hasVotedInYoutubeContent && "YouTube Content",
                    !hasVotedInOtt && "OTT",
                    !hasVotedInTelevision && "Television"
                  ].filter(Boolean).join(", ").replace(/,([^,]*)$/, ' or$1')} categories!
                </p>
              ) : (
                <p className="mt-4 text-sm font-medium text-primary">
                  You've shared your opinion in all available categories for this period. Thank you for your participation!
                </p>
              )}
            </AlertDescription>
          </Alert>
        </motion.div>
      );
    }

    if (showSuccess) {
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-16 flex flex-col items-center justify-center text-center space-y-4"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 dark:bg-green-900/30 dark:text-green-400">
            <Check className="w-8 h-8" />
          </div>
          <h3 className="heading-md text-green-600 dark:text-green-400">Opinion Submitted!</h3>
          <p className="body-md text-muted-foreground">
            Thank you for contributing to the future of content creation.
          </p>
        </motion.div>
      );
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="country" className="block text-sm font-medium">
            Your Country
          </label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value as Country)}
            className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            disabled={isLoading || !isVotingActive}
            required
          >
            <option value="">Select your country</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        
        {(activeTab === "film" || activeTab === "youtubeFilm" || activeTab === "ott") && (
          <div className="space-y-2">
            <label htmlFor="filmIndustry" className="block text-sm font-medium">
              Film Industry
            </label>
            <select
              id="filmIndustry"
              value={filmIndustry}
              onChange={(e) => setFilmIndustry(e.target.value as FilmIndustry)}
              className={cn(
                "w-full px-4 py-3 rounded-lg border border-input transition-all",
                !country ? "bg-muted cursor-not-allowed" : "bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              )}
              disabled={!country || isLoading || !isVotingActive}
              required
            >
              <option value="">Select film industry</option>
              {availableIndustries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>
        )}
        
        {activeTab === "television" && (
          <div className="space-y-2">
            <label htmlFor="televisionChannel" className="block text-sm font-medium">
              Television Channel
            </label>
            <select
              id="televisionChannel"
              value={televisionChannel}
              onChange={(e) => setTelevisionChannel(e.target.value as TelevisionChannel)}
              className={cn(
                "w-full px-4 py-3 rounded-lg border border-input transition-all",
                !country ? "bg-muted cursor-not-allowed" : "bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              )}
              disabled={!country || isLoading || !isVotingActive}
              required
            >
              <option value="">Select television channel</option>
              {availableChannels.map((channel) => (
                <option key={channel} value={channel}>
                  {channel}
                </option>
              ))}
            </select>
          </div>
        )}
        
        {activeTab === "film" && (
          <div className="space-y-2">
            <label htmlFor="projectType" className="block text-sm font-medium">
              Project Type
            </label>
            <select
              id="projectType"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value as ProjectType)}
              className={cn(
                "w-full px-4 py-3 rounded-lg border border-input transition-all",
                !country ? "bg-muted cursor-not-allowed" : "bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              )}
              disabled={!country || isLoading || !isVotingActive}
              required
            >
              <option value="HighBudgetFilm">High Budget Film</option>
              <option value="LowBudgetFilm">Low Budget Film</option>
              <option value="ShortFilm">Short Film</option>
            </select>
          </div>
        )}

        {activeTab === "youtubeContent" && (
          <>
            <div className="space-y-2">
              <label htmlFor="youtubeSection" className="block text-sm font-medium">
                YouTube Content Section
              </label>
              <select
                id="youtubeSection"
                value={youtubeSection}
                onChange={(e) => setYoutubeSection(e.target.value)}
                className={cn(
                  "w-full px-4 py-3 rounded-lg border border-input transition-all",
                  !country ? "bg-muted cursor-not-allowed" : "bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                )}
                disabled={!country || isLoading || !isVotingActive}
                required
              >
                <option value="">Select content section</option>
                {Object.keys(YOUTUBE_CONTENT_CATEGORIES).map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="youtubeCategory" className="block text-sm font-medium">
                YouTube Content Category
              </label>
              <select
                id="youtubeCategory"
                value={youtubeCategory}
                onChange={(e) => setYoutubeCategory(e.target.value as YouTubeContentCategory)}
                className={cn(
                  "w-full px-4 py-3 rounded-lg border border-input transition-all",
                  !youtubeSection ? "bg-muted cursor-not-allowed" : "bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                )}
                disabled={!youtubeSection || !country || isLoading || !isVotingActive}
                required
              >
                <option value="">Select content category</option>
                {youtubeCategoriesForSection.map((category) => (
                  <option key={category} value={category}>
                    {YOUTUBE_CONTENT_CATEGORY_LABELS[category]}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {activeTab === "television" && (
          <div className="space-y-2">
            <label htmlFor="televisionContentType" className="block text-sm font-medium">
              TV Content Type
            </label>
            <select
              id="televisionContentType"
              value={televisionContentType}
              onChange={(e) => setTelevisionContentType(e.target.value as TelevisionContentType)}
              className={cn(
                "w-full px-4 py-3 rounded-lg border border-input transition-all",
                !televisionChannel ? "bg-muted cursor-not-allowed" : "bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              )}
              disabled={!televisionChannel || !country || isLoading || !isVotingActive}
              required
            >
              <option value="">Select content type</option>
              {TELEVISION_CONTENT_TYPES.map((contentType) => (
                <option key={contentType} value={contentType}>
                  {contentType}
                </option>
              ))}
            </select>
          </div>
        )}

        {activeTab === "ott" && (
          <div className="space-y-2">
            <label htmlFor="ottPlatform" className="block text-sm font-medium">
              OTT Platform
            </label>
            <select
              id="ottPlatform"
              value={ottPlatform}
              onChange={(e) => setOttPlatform(e.target.value as OTTPlatform)}
              className={cn(
                "w-full px-4 py-3 rounded-lg border border-input transition-all",
                !filmIndustry ? "bg-muted cursor-not-allowed" : "bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              )}
              disabled={!filmIndustry || isLoading || !isVotingActive}
              required
            >
              <option value="">Select OTT platform</option>
              {OTT_PLATFORMS.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </div>
        )}
        
        {(activeTab === "film" || activeTab === "youtubeFilm" || activeTab === "ott") && (
          <div className="space-y-2">
            <label htmlFor="genre" className="block text-sm font-medium">
              Favorite Genre
            </label>
            <select
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value as Genre)}
              className={cn(
                "w-full px-4 py-3 rounded-lg border border-input transition-all",
                !filmIndustry ? "bg-muted cursor-not-allowed" : "bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              )}
              disabled={!filmIndustry || isLoading || !isVotingActive}
              required
            >
              <option value="">Select genre</option>
              {activeTab === "youtubeFilm" 
                ? youtubeGenreOptions.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))
                : activeTab === "ott"
                ? OTT_GENRES.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))
                : GENRES.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))
              }
            </select>
          </div>
        )}
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label 
              htmlFor="notes" 
              className="text-sm font-medium flex items-center gap-1.5"
            >
              <BookText className="w-4 h-4" />
              Notes (Optional)
            </Label>
            <span className="text-xs text-muted-foreground">
              {notes.length}/500 characters
            </span>
          </div>
          <Textarea
            id="notes"
            placeholder="Share any additional thoughts, preferences, or suggestions..."
            value={notes}
            onChange={(e) => setNotes(e.target.value.slice(0, 500))}
            className="min-h-[100px] resize-y"
            disabled={isLoading || !isVotingActive}
          />
        </div>
        
        <motion.button
          type="submit"
          whileTap={{ scale: 0.98 }}
          className={cn(
            "w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center",
            isLoading 
              ? "bg-muted text-muted-foreground cursor-not-allowed" 
              : !isVotingActive
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
          disabled={isLoading || !isVotingActive || !country || !projectType || 
                  ((activeTab === "film" || activeTab === "youtubeFilm" || activeTab === "ott") && (!filmIndustry || !genre)) ||
                  (activeTab === "ott" && !ottPlatform) || 
                  (activeTab === "youtubeContent" && !youtubeCategory) ||
                  (activeTab === "television" && (!televisionChannel || !televisionContentType))}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : !isVotingActive ? (
            <>Voting Currently Closed</>
          ) : (
            <>Submit Your Opinion</>
          )}
        </motion.button>
        
        <div className="text-xs text-muted-foreground flex items-center gap-2 justify-center pt-2">
          <AlertCircle className="w-4 h-4" />
          {isVotingActive 
            ? "Your opinion helps content creators develop projects aligned with audience preferences."
            : "Voting is currently closed. Check back soon for the next voting period."}
        </div>
      </form>
    );
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-2 text-center mb-8">
        <div className="chip bg-secondary text-secondary-foreground">
          Have Your Say
        </div>
        <h2 className="heading-lg">Cast Your Opinion</h2>
        <p className="body-md text-muted-foreground">
          Help shape the future of content creation by sharing your preferences.
        </p>
        
        {renderVotingPeriodStatus()}
        
        <Alert className="mt-4 border-primary/20 dark:border-primary/10 bg-primary/5 dark:bg-primary/10">
          <AlertCircle className="h-5 w-5 text-primary" />
          <AlertTitle className="text-primary font-medium">One opinion per section</AlertTitle>
          <AlertDescription className="text-sm text-muted-foreground">
            To ensure accurate data collection, you can share your opinion once per category (Films, YouTube Films, YouTube Content, OTT, Television) during each voting period.
            Your opinion matters and helps creators make better content based on authentic audience preferences.
          </AlertDescription>
        </Alert>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-2xl p-6 md:p-8"
      >
        <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-8">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="film" className="relative">
              <span className="flex items-center gap-2">
                <Film className="w-4 h-4" />
                Films
              </span>
              {hasVotedInFilm && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px]">
                  <Check className="w-3 h-3" />
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="youtubeFilm" className="relative">
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m22 8-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                  <path d="M18 8h-6V2" />
                  <circle cx="10" cy="14" r="2" />
                  <path d="m14 17.5 1.2-1.6c.8-1.1 2.1-1.1 2.8 0l1.2 1.6" />
                </svg>
                YT Films
              </span>
              {hasVotedInYoutubeFilm && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px]">
                  <Check className="w-3 h-3" />
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="youtubeContent" className="relative">
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
                YT Content
              </span>
              {hasVotedInYoutubeContent && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px]">
                  <Check className="w-3 h-3" />
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="ott" className="relative">
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
                  <polyline points="17 2 12 7 7 2" />
                </svg>
                OTT
              </span>
              {hasVotedInOtt && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px]">
                  <Check className="w-3 h-3" />
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="television" className="relative">
              <span className="flex items-center gap-2">
                <Tv className="w-4 h-4" />
                TV
              </span>
              {hasVotedInTelevision && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px]">
                  <Check className="w-3 h-3" />
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <TabsContent value="film" className="mt-6">
                <div className="text-sm text-muted-foreground mb-6">
                  Share your opinion on your favorite film genres across different budget ranges. Your input helps filmmakers understand what audiences want to see in theaters.
                </div>
              </TabsContent>
              <TabsContent value="youtubeFilm" className="mt-6">
                <div className="text-sm text-muted-foreground mb-6">
                  Share your opinion on your preferred YouTube film genres. Help creators understand what performs well on the platform.
                </div>
              </TabsContent>
              <TabsContent value="youtubeContent" className="mt-6">
                <div className="text-sm text-muted-foreground mb-6">
                  Share your opinion on your favorite YouTube content categories beyond films. From gaming to educational content, your feedback helps creators focus on what viewers want to see.
                </div>
              </TabsContent>
              <TabsContent value="ott" className="mt-6">
                <div className="text-sm text-muted-foreground mb-6">
                  Share what you'd like to see on your favorite streaming platforms. Your opinions help OTT services plan their content strategy.
                </div>
              </TabsContent>
              <TabsContent value="television" className="mt-6">
                <div className="text-sm text-muted-foreground mb-6">
                  Share your opinion on your favorite TV channels and content types. Help television networks understand what viewers prefer to watch.
                </div>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>

        {renderForm()}
      </motion.div>
    </div>
  );
};

export default VotingForm;
