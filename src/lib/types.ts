
export type FilmIndustry = "Hollywood" | "Bollywood" | "Tollywood" | "Nollywood" | "Korean" | "European" | "Japanese" | "Chinese" | "Thai" | "Turkish" | "French" | "Italian" | "Regional";

export type Genre = "Action" | "Drama" | "Comedy" | "Romance" | "Thriller" | "Horror" | "Sci-Fi" | "Fantasy" | "Animation" | "Documentary" | "Mystery" | "Adventure" | "Crime" | "Biography" | "Historical" | "Musical" | "Educational";

export type Country = "USA" | "India" | "UK" | "Canada" | "Australia" | "Japan" | "South Korea" | "France" | "Germany" | "Italy" | "Spain" | "Brazil" | "Mexico" | "Nigeria" | "China" | "Russia" | "Saudi Arabia" | "UAE" | "Singapore" | "Other";

export type ProjectType = "HighBudgetFilm" | "LowBudgetFilm" | "ShortFilm" | "YouTubeFilm" | "YouTubeContent" | "OTTPlatform" | "Television";

export type OTTPlatform = 
  "Netflix" | "AmazonPrime" | "Disney+" | "HBOMax" | "Hulu" | "AppleTV+" | 
  "JioCinema" | "Hotstar" | "Aha" | "SonyLIV" | "ZEE5" | "Peacock" | 
  "Paramount+" | "Discovery+" | "CrunchyRoll" | "MXPlayer" | "ALTBalaji" | 
  "ErosNow" | "Voot" | "Other" |
  // Additional OTT platforms
  "Tubi" | "Roku Channel" | "Pluto TV" | "Crackle" | "MUBI" | "Shudder" | 
  "BritBox" | "Acorn TV" | "Funimation" | "DAZN" | "Twitch" | "Hayu" | 
  "iQIYI" | "WeTV" | "Viki" | "Sun NXT" | "YuppTV" | "ThreeNow" | 
  "Stan" | "BINGE" | "Crave";

export type TelevisionChannel = 
  // USA Channels
  "ABC" | "CBS" | "NBC" | "FOX" | "CW" | "PBS" | "HBO" | "Showtime" | "Starz" | "AMC" | "FX" | "USA" | "TNT" | "TBS" | "History" | "Discovery" | "NatGeo" |
  // India Channels
  "StarPlus" | "ZeeTV" | "SonyTV" | "ColorsTV" | "StarBharat" | "SonyMax" | "ZeeCinema" | "StarGold" | "DDNational" | "AndTV" |
  // UK Channels
  "BBC" | "ITV" | "Channel4" | "Channel5" | "Sky" | "UKTV" | "Dave" | "E4" |
  // Other International Channels
  "CCTV" | "NHK" | "KBS" | "TVN" | "Fuji" | "TF1" | "M6" | "ARD" | "ZDF" | "Rai" | "TVE" | "Globo" | "Televisa" | "Other" |
  // Additional channels for different countries
  "CBC" | "CTV" | "Global" | "Citytv" | "TVO" | "YTV" | 
  "Seven" | "Nine" | "Ten" | "SBS" | "Foxtel" |
  "TV Asahi" | "TV Tokyo" | "Nippon TV" |
  "MBC" | "JTBC" | "OCN" |
  "France 2" | "France 3" | "Canal+" | "Arte" |
  "RTL" | "Sat.1" | "ProSieben" | "VOX" |
  "Rai 1" | "Rai 2" | "Rai 3" | "Canale 5" | "Italia 1" | "Rete 4" |
  "Antena 3" | "Telecinco" | "La Sexta" | "Cuatro" |
  "SBT" | "Record" | "Band" | "RedeTV" |
  "TV Azteca" | "Imagen Televisión" | "Canal Once" |
  "NTA" | "Channels TV" | "AIT" | "Silverbird TV" | "WAP TV" |
  "Hunan TV" | "Jiangsu TV" | "Dragon TV" | "Phoenix TV" |
  "Channel One" | "Russia-1" | "NTV" | "TNT" | "CTC" |
  "Saudi TV" | "MBC" | "Rotana" | "Al Arabiya" |
  "Dubai TV" | "Abu Dhabi TV" | "Sama Dubai" |
  "MediaCorp Channel 5" | "MediaCorp Channel 8" | "CNA" | "Suria" |
  // Additional TV channels
  "ESPN" | "CNN" | "MSNBC" | "Fox News" | "Cartoon Network" | "Adult Swim" | 
  "Nickelodeon" | "Disney Channel" | "MTV" | "VH1" | "Bravo" | "Lifetime" | "Syfy" |
  "Star Sports" | "Sony Sports" | "Zee News" | "NDTV" | "Republic TV" | "Aaj Tak" | 
  "India TV" | "ABP News" | "TV9" | "ETV" | "Sun TV" | "Vijay TV" | "Asianet" | 
  "Maa TV" | "Gemini TV" | "BBC News" | "Sky News" | "Sky Sports" | "BT Sport" | 
  "Discovery UK" | "History UK" | "Gold" | "Comedy Central UK" | "Channel 4 News" | 
  "More4" | "Film4" | "TSN" | "Sportsnet" | "CBC News" | "CTV News" | "Global News" | 
  "TVA" | "MuchMusic" | "Treehouse TV" | "W Network" | "Showcase" | "Food Network Canada" | 
  "Fox Sports" | "ABC News" | "Seven News" | "9News" | "Network 10" | "Sky News Australia" | 
  "Nickelodeon Australia" | "Disney Channel Australia" | "Tokyo MX" | "BS Asahi" | "BS-TBS" | 
  "BS Fuji" | "AT-X" | "WOWOW" | "J Sports" | "Animax" | "NHK BS Premium" | "EBS" | "MBN" | 
  "Channel A" | "TV Chosun" | "MNet" | "KBS News" | "YTN" | "SBS Sports" | "KBS Drama";

export type TelevisionContentType = 
  "News" | "Reality" | "TalkShow" | "GameShow" | "SoapOpera" | "SitCom" | "SeriesShow" | "CrimeShow" | "CulturalShow" | 
  "KidsShow" | "Documentary" | "SportsShow" | "CookingShow" | "LifestyleShow" | "Politics" | "MusicalShow" | 
  "RegionalDrama" | "AnimatedShow" | "SciFiShow" | "HistoricalShow" | "Fantasy" | "Comedy" | "Drama" | "Other";

export type YouTubeContentCategory = 
  // Gaming
  "GamingLetsPlays" | "GameReviews" | "GameWalkthroughs" | "GameModding" | "Esports" | "Speedruns" | "GamingNews" |
  // Educational
  "FactsAndTrivia" | "HistoryDocumentaries" | "ScienceExperiments" | "TechInnovations" | "LanguageLearning" | "Tutorials" |
  // Trending
  "CurrentEvents" | "ViralChallenges" | "SocialMediaTrends" | "CelebrityGossip" |
  // Lifestyle
  "DayInLifeVlogs" | "TravelVlogs" | "HealthFitnessTips" | "LifeHacks" | "MinimalismOrganization" |
  // Entertainment
  "ReactionVideos" | "ComedySkits" | "PranksExperiments" | "Challenges" | "UnboxingsReviews" | "ASMR" |
  // Creative
  "MusicVideos" | "ArtTutorials" | "DIYProjects" | "Animation" | "Photography" |
  // Tech
  "TechReviews" | "GadgetInnovations" | "PhonePCReviews" | "SoftwareAppTutorials" |
  // Food
  "RecipeTutorials" | "FoodReviews" | "CookingChallenges" | "StreetFoodTours" |
  // Fitness
  "WorkoutRoutines" | "NutritionAdvice" | "MentalHealthTips" | "WeightLossJourneys" | "YogaMeditation" |
  // Movies
  "MovieReviews" | "TVShowReviews" | "FanTheories" | "BehindTheScenes" | "TopLists" |
  // Finance
  "PersonalFinance" | "InvestmentStrategies" | "CareerAdvice" | "Entrepreneurship" |
  // Motivational
  "SuccessStories" | "MotivationalSpeeches" | "PersonalDevelopment" |
  // Future Tech
  "AIRobotics" | "SpaceExploration" | "VirtualReality" | "FuturisticInnovations" |
  // Pets
  "CuteAnimalVideos" | "PetCareTips" | "WildlifeDocumentaries" | "AnimalRescues" |
  // Hobbies
  "Collecting" | "BoardGames" | "ModelBuilding" | "FanCommunities" |
  // Commentary
  "PoliticalDiscussions" | "DebatesAnalysis" | "SocialJustice" | "CulturalCriticism";

export interface Vote {
  id: string;
  country: Country;
  filmIndustry?: FilmIndustry;
  genre?: Genre;
  projectType: ProjectType;
  ottPlatform?: OTTPlatform;
  youtubeContentCategory?: YouTubeContentCategory;
  televisionChannel?: TelevisionChannel;
  televisionContentType?: TelevisionContentType;
  notes?: string;
  timestamp: string;
}

export interface VotingPeriod {
  isActive: boolean;
  startDate: string;
  endDate: string;
}
