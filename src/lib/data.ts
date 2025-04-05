import { FilmIndustry, Genre, Vote, VotingPeriod, ProjectType, Country, OTTPlatform, YouTubeContentCategory, TelevisionChannel, TelevisionContentType } from "./types";

export const FILM_INDUSTRIES: FilmIndustry[] = [
  "Hollywood", 
  "Bollywood", 
  "Tollywood", 
  "Nollywood", 
  "Korean", 
  "European", 
  "Japanese",
  "Chinese",
  "Thai",
  "Turkish",
  "French",
  "Italian",
  "Regional"
];

export const GENRES: Genre[] = [
  "Action", 
  "Drama", 
  "Comedy", 
  "Romance", 
  "Thriller", 
  "Horror", 
  "Sci-Fi", 
  "Fantasy", 
  "Animation", 
  "Documentary",
  "Mystery",
  "Adventure",
  "Crime",
  "Biography",
  "Historical",
  "Musical",
  "Educational"
];

export const PROJECT_TYPES: ProjectType[] = [
  "HighBudgetFilm",
  "LowBudgetFilm",
  "ShortFilm",
  "YouTubeFilm",
  "YouTubeContent",
  "OTTPlatform",
  "Television"
];

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  "HighBudgetFilm": "High Budget Film",
  "LowBudgetFilm": "Low Budget Film",
  "ShortFilm": "Short Film",
  "YouTubeFilm": "YouTube Films",
  "YouTubeContent": "YouTube Content",
  "OTTPlatform": "OTT Platform Content",
  "Television": "Television Content"
};

export const OTT_PLATFORMS: OTTPlatform[] = [
  "Netflix",
  "AmazonPrime",
  "Disney+",
  "HBOMax",
  "Hulu",
  "AppleTV+",
  "JioCinema",
  "Hotstar",
  "Aha",
  "SonyLIV",
  "ZEE5",
  "Peacock",
  "Paramount+",
  "Discovery+",
  "CrunchyRoll",
  "MXPlayer",
  "ALTBalaji",
  "ErosNow",
  "Voot",
  "Tubi",
  "Roku Channel",
  "Pluto TV",
  "Crackle",
  "MUBI",
  "Shudder",
  "BritBox",
  "Acorn TV",
  "Funimation",
  "DAZN",
  "Twitch",
  "Hayu",
  "iQIYI",
  "WeTV",
  "Viki",
  "Sun NXT",
  "YuppTV",
  "ThreeNow",
  "Stan",
  "BINGE",
  "Crave",
  "Other"
];

export const TELEVISION_CHANNELS_BY_COUNTRY: Record<Country, TelevisionChannel[]> = {
  "USA": ["ABC", "CBS", "NBC", "FOX", "CW", "PBS", "HBO", "Showtime", "Starz", "AMC", "FX", "USA", "TNT", "TBS", "History", "Discovery", "NatGeo", "ESPN", "CNN", "MSNBC", "Fox News", "Cartoon Network", "Adult Swim", "Nickelodeon", "Disney Channel", "MTV", "VH1", "Bravo", "Lifetime", "Syfy", "Other"],
  "India": ["StarPlus", "ZeeTV", "SonyTV", "ColorsTV", "StarBharat", "SonyMax", "ZeeCinema", "StarGold", "DDNational", "AndTV", "Star Sports", "Sony Sports", "Zee News", "NDTV", "Republic TV", "Aaj Tak", "India TV", "ABP News", "TV9", "ETV", "Sun TV", "Vijay TV", "Asianet", "Maa TV", "Gemini TV", "Other"],
  "UK": ["BBC", "ITV", "Channel4", "Channel5", "Sky", "UKTV", "Dave", "E4", "BBC News", "Sky News", "Sky Sports", "BT Sport", "Discovery UK", "History UK", "Gold", "Comedy Central UK", "Channel 4 News", "More4", "Film4", "Other"],
  "Canada": ["CBC", "CTV", "Global", "Citytv", "TVO", "YTV", "HBO", "Discovery", "TSN", "Sportsnet", "CBC News", "CTV News", "Global News", "TVA", "MuchMusic", "Treehouse TV", "W Network", "Showcase", "Food Network Canada", "Other"],
  "Australia": ["ABC", "Seven", "Nine", "Ten", "SBS", "Foxtel", "Fox Sports", "ABC News", "Seven News", "9News", "Network 10", "Sky News Australia", "Nickelodeon Australia", "Disney Channel Australia", "Other"],
  "Japan": ["NHK", "Fuji", "TBS", "TV Asahi", "TV Tokyo", "Nippon TV", "Tokyo MX", "BS Asahi", "BS-TBS", "BS Fuji", "AT-X", "WOWOW", "J Sports", "Animax", "NHK BS Premium", "Other"],
  "South Korea": ["KBS", "MBC", "SBS", "TVN", "JTBC", "OCN", "EBS", "MBN", "Channel A", "TV Chosun", "MNet", "KBS News", "YTN", "SBS Sports", "KBS Drama", "Other"],
  "France": ["TF1", "France 2", "France 3", "M6", "Canal+", "Arte", "Other"],
  "Germany": ["ARD", "ZDF", "RTL", "Sat.1", "ProSieben", "VOX", "Other"],
  "Italy": ["Rai", "Rai 1", "Rai 2", "Rai 3", "Canale 5", "Italia 1", "Rete 4", "Other"],
  "Spain": ["TVE", "Antena 3", "Telecinco", "La Sexta", "Cuatro", "Other"],
  "Brazil": ["Globo", "SBT", "Record", "Band", "RedeTV", "Other"],
  "Mexico": ["Televisa", "TV Azteca", "Imagen Televisión", "Canal Once", "Other"],
  "Nigeria": ["NTA", "Channels TV", "AIT", "Silverbird TV", "WAP TV", "Other"],
  "China": ["CCTV", "Hunan TV", "Jiangsu TV", "Dragon TV", "Phoenix TV", "Other"],
  "Russia": ["Channel One", "Russia-1", "NTV", "TNT", "CTC", "Other"],
  "Saudi Arabia": ["Saudi TV", "MBC", "Rotana", "Al Arabiya", "Other"],
  "UAE": ["Dubai TV", "Abu Dhabi TV", "MBC", "Sama Dubai", "Other"],
  "Singapore": ["MediaCorp Channel 5", "MediaCorp Channel 8", "CNA", "Suria", "Other"],
  "Other": ["Other"]
};

export const TELEVISION_CONTENT_TYPES: TelevisionContentType[] = [
  "News", "Reality", "TalkShow", "GameShow", "SoapOpera", "SitCom", "SeriesShow", 
  "CrimeShow", "CulturalShow", "KidsShow", "Documentary", "SportsShow", "CookingShow", 
  "LifestyleShow", "Politics", "MusicalShow", "RegionalDrama", "AnimatedShow", 
  "SciFiShow", "HistoricalShow", "Fantasy", "Comedy", "Drama", "Other"
];

export const COUNTRIES: Country[] = [
  "USA", 
  "India", 
  "UK", 
  "Canada", 
  "Australia", 
  "Japan", 
  "South Korea", 
  "France", 
  "Germany", 
  "Italy", 
  "Spain", 
  "Brazil", 
  "Mexico", 
  "Nigeria",
  "China",
  "Russia",
  "Saudi Arabia",
  "UAE",
  "Singapore",
  "Other"
];

export const INDUSTRY_BY_COUNTRY: Record<string, FilmIndustry[]> = {
  "USA": FILM_INDUSTRIES,
  "India": FILM_INDUSTRIES,
  "UK": FILM_INDUSTRIES,
  "Canada": FILM_INDUSTRIES,
  "Australia": FILM_INDUSTRIES,
  "Japan": FILM_INDUSTRIES,
  "South Korea": FILM_INDUSTRIES,
  "France": FILM_INDUSTRIES,
  "Germany": FILM_INDUSTRIES,
  "Italy": FILM_INDUSTRIES,
  "Spain": FILM_INDUSTRIES,
  "Brazil": FILM_INDUSTRIES,
  "Mexico": FILM_INDUSTRIES,
  "Nigeria": FILM_INDUSTRIES,
  "China": FILM_INDUSTRIES,
  "Russia": FILM_INDUSTRIES,
  "Saudi Arabia": FILM_INDUSTRIES,
  "UAE": FILM_INDUSTRIES,
  "Singapore": FILM_INDUSTRIES,
  "Other": FILM_INDUSTRIES
};

export const YOUTUBE_GENRES: Genre[] = [
  "Comedy", "Documentary", "Educational", "Animation", "Action", "Drama", "Thriller", "Mystery"
];

export const OTT_GENRES: Genre[] = [
  "Action", "Drama", "Comedy", "Thriller", "Horror", "Sci-Fi", "Fantasy", 
  "Romance", "Documentary", "Crime", "Mystery", "Biography"
];

export const YOUTUBE_CONTENT_CATEGORIES: Record<string, YouTubeContentCategory[]> = {
  "Gaming": [
    "GamingLetsPlays", "GameReviews", "GameWalkthroughs", "GameModding", 
    "Esports", "Speedruns", "GamingNews"
  ],
  "Educational": [
    "FactsAndTrivia", "HistoryDocumentaries", "ScienceExperiments", 
    "TechInnovations", "LanguageLearning", "Tutorials"
  ],
  "Trending": [
    "CurrentEvents", "ViralChallenges", "SocialMediaTrends", "CelebrityGossip"
  ],
  "Lifestyle": [
    "DayInLifeVlogs", "TravelVlogs", "HealthFitnessTips", "LifeHacks", "MinimalismOrganization"
  ],
  "Entertainment": [
    "ReactionVideos", "ComedySkits", "PranksExperiments", "Challenges", "UnboxingsReviews", "ASMR"
  ],
  "Creative": [
    "MusicVideos", "ArtTutorials", "DIYProjects", "Animation", "Photography"
  ],
  "Tech": [
    "TechReviews", "GadgetInnovations", "PhonePCReviews", "SoftwareAppTutorials"
  ],
  "Food": [
    "RecipeTutorials", "FoodReviews", "CookingChallenges", "StreetFoodTours"
  ],
  "Fitness": [
    "WorkoutRoutines", "NutritionAdvice", "MentalHealthTips", "WeightLossJourneys", "YogaMeditation"
  ],
  "Movies & TV": [
    "MovieReviews", "TVShowReviews", "FanTheories", "BehindTheScenes", "TopLists"
  ],
  "Finance": [
    "PersonalFinance", "InvestmentStrategies", "CareerAdvice", "Entrepreneurship"
  ],
  "Motivational": [
    "SuccessStories", "MotivationalSpeeches", "PersonalDevelopment"
  ],
  "Future Tech": [
    "AIRobotics", "SpaceExploration", "VirtualReality", "FuturisticInnovations"
  ],
  "Pets & Animals": [
    "CuteAnimalVideos", "PetCareTips", "WildlifeDocumentaries", "AnimalRescues"
  ],
  "Hobbies": [
    "Collecting", "BoardGames", "ModelBuilding", "FanCommunities"
  ],
  "Commentary": [
    "PoliticalDiscussions", "DebatesAnalysis", "SocialJustice", "CulturalCriticism"
  ]
};

export const YOUTUBE_CONTENT_CATEGORY_LABELS: Record<YouTubeContentCategory, string> = {
  // Gaming
  "GamingLetsPlays": "Let's Plays",
  "GameReviews": "Game Reviews",
  "GameWalkthroughs": "Walkthroughs & Guides",
  "GameModding": "Game Modding & Customization",
  "Esports": "Esports & Competitive Gaming",
  "Speedruns": "Speedruns",
  "GamingNews": "Gaming News & Updates",
  
  // Educational
  "FactsAndTrivia": "Interesting Facts & Trivia",
  "HistoryDocumentaries": "History & Documentaries",
  "ScienceExperiments": "Science Experiments & Discoveries",
  "TechInnovations": "Technology & Innovations",
  "LanguageLearning": "Language Learning",
  "Tutorials": "Tutorials & How-To Guides",
  
  // Trending
  "CurrentEvents": "Current Events & News",
  "ViralChallenges": "Viral Challenges",
  "SocialMediaTrends": "Popular Social Media Trends",
  "CelebrityGossip": "Celebrity Gossip & Entertainment News",
  
  // Lifestyle
  "DayInLifeVlogs": "Day-in-the-Life Vlogs",
  "TravelVlogs": "Travel Vlogs",
  "HealthFitnessTips": "Health & Fitness Tips",
  "LifeHacks": "Life Hacks & Productivity Tips",
  "MinimalismOrganization": "Minimalism & Organization",
  
  // Entertainment
  "ReactionVideos": "Reaction Videos",
  "ComedySkits": "Comedy Skits",
  "PranksExperiments": "Pranks & Social Experiments",
  "Challenges": "Fun Challenges & Games",
  "UnboxingsReviews": "Unboxings & Reviews",
  "ASMR": "ASMR Videos",
  
  // Creative
  "MusicVideos": "Music Videos & Covers",
  "ArtTutorials": "Art Tutorials & Speedpaints",
  "DIYProjects": "DIY Projects & Crafts",
  "Animation": "Animation & Storytelling",
  "Photography": "Photography Tips",
  
  // Tech
  "TechReviews": "Tech Reviews & Unboxings",
  "GadgetInnovations": "Latest Gadgets & Innovations",
  "PhonePCReviews": "Mobile Phone & PC Reviews",
  "SoftwareAppTutorials": "Software & App Tutorials",
  
  // Food
  "RecipeTutorials": "Recipe Tutorials",
  "FoodReviews": "Food Reviews & Tastings",
  "CookingChallenges": "Cooking Challenges",
  "StreetFoodTours": "Street Food Tours",
  
  // Fitness
  "WorkoutRoutines": "Workout Routines",
  "NutritionAdvice": "Nutrition Advice",
  "MentalHealthTips": "Mental Health Tips",
  "WeightLossJourneys": "Weight Loss Journeys",
  "YogaMeditation": "Yoga & Meditation",
  
  // Movies
  "MovieReviews": "Movie Reviews & Analysis",
  "TVShowReviews": "TV Show Reviews & Recaps",
  "FanTheories": "Fan Theories & Discussions",
  "BehindTheScenes": "Behind-the-Scenes Content",
  "TopLists": "Top 10 Lists & Rankings",
  
  // Finance
  "PersonalFinance": "Personal Finance Tips",
  "InvestmentStrategies": "Investment Strategies",
  "CareerAdvice": "Career Advice & Job Tips",
  "Entrepreneurship": "Entrepreneurship & Business Ideas",
  
  // Motivational
  "SuccessStories": "Success Stories",
  "MotivationalSpeeches": "Motivational Speeches & Quotes",
  "PersonalDevelopment": "Personal Development & Growth",
  
  // Future Tech
  "AIRobotics": "AI & Robotics",
  "SpaceExploration": "Space Exploration",
  "VirtualReality": "Virtual Reality & Augmented Reality",
  "FuturisticInnovations": "Futuristic Innovations",
  
  // Pets
  "CuteAnimalVideos": "Cute Animal Videos",
  "PetCareTips": "Pet Care Tips",
  "WildlifeDocumentaries": "Wildlife Documentaries",
  "AnimalRescues": "Animal Rescues & Stories",
  
  // Hobbies
  "Collecting": "Collecting & Collections",
  "BoardGames": "Board Games & Card Games",
  "ModelBuilding": "Model Building",
  "FanCommunities": "Fantasy & Sci-Fi Fan Communities",
  
  // Commentary
  "PoliticalDiscussions": "Political Discussions",
  "DebatesAnalysis": "Debates & Analysis",
  "SocialJustice": "Social Justice Issues",
  "CulturalCriticism": "Cultural Criticism"
};

export const ALL_YOUTUBE_CONTENT_CATEGORIES: YouTubeContentCategory[] = Object.values(YOUTUBE_CONTENT_CATEGORIES).flat();

export const DEFAULT_VOTING_PERIOD: VotingPeriod = {
  isActive: true,
  startDate: new Date().toISOString(),
  endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString()
};

export const getVotingPeriod = (): VotingPeriod => {
  const storedPeriod = localStorage.getItem("moviepulse-voting-period");
  return storedPeriod ? JSON.parse(storedPeriod) : DEFAULT_VOTING_PERIOD;
};

export const saveVotingPeriod = (period: VotingPeriod) => {
  localStorage.setItem("moviepulse-voting-period", JSON.stringify(period));
  return period;
};

export const getVotes = (): Vote[] => {
  const storedVotes = localStorage.getItem("moviepulse-votes");
  return storedVotes ? JSON.parse(storedVotes) : [];
};

export const saveVote = (vote: Omit<Vote, "id" | "timestamp">) => {
  const votes = getVotes();
  const newVote: Vote = {
    ...vote,
    id: Math.random().toString(36).substring(2, 15),
    timestamp: new Date().toISOString()
  };
  votes.push(newVote);
  localStorage.setItem("moviepulse-votes", JSON.stringify(votes));
  return newVote;
};

export const hasUserVotedInSection = (projectType: ProjectType): boolean => {
  const votes = getVotes();
  const votingPeriod = getVotingPeriod();
  
  if (!votingPeriod.isActive) {
    return false;
  }
  
  const periodStart = new Date(votingPeriod.startDate);
  const periodEnd = new Date(votingPeriod.endDate);
  
  return votes.some(vote => 
    vote.projectType === projectType &&
    new Date(vote.timestamp) >= periodStart &&
    new Date(vote.timestamp) <= periodEnd
  );
};

export const hasUserVoted = (country: Country, projectType: ProjectType): boolean => {
  const votes = getVotes();
  const votingPeriod = getVotingPeriod();
  
  if (!votingPeriod.isActive) {
    return false;
  }
  
  const periodStart = new Date(votingPeriod.startDate);
  const periodEnd = new Date(votingPeriod.endDate);
  
  return votes.some(vote => 
    vote.country === country && 
    vote.projectType === projectType &&
    new Date(vote.timestamp) >= periodStart &&
    new Date(vote.timestamp) <= periodEnd
  );
};

export const getUserVotedCombinations = (): { country: Country; filmIndustry?: FilmIndustry; genre?: Genre; projectType: ProjectType }[] => {
  const votes = getVotes();
  const votingPeriod = getVotingPeriod();
  
  if (!votingPeriod.isActive) {
    return [];
  }
  
  const periodStart = new Date(votingPeriod.startDate);
  const periodEnd = new Date(votingPeriod.endDate);
  
  return votes
    .filter(vote => 
      new Date(vote.timestamp) >= periodStart &&
      new Date(vote.timestamp) <= periodEnd
    )
    .map(vote => ({
      country: vote.country,
      filmIndustry: vote.filmIndustry,
      genre: vote.genre,
      projectType: vote.projectType
    }));
};

export const getCountsByIndustry = (industry: FilmIndustry): Record<Genre, number> => {
  const votes = getVotes();
  const filtered = votes.filter(vote => vote.filmIndustry === industry);
  
  return GENRES.reduce((acc, genre) => {
    acc[genre] = filtered.filter(vote => vote.genre === genre).length;
    return acc;
  }, {} as Record<Genre, number>);
};

export const getCountsByProjectType = (projectType: ProjectType): Record<Genre, number> => {
  const votes = getVotes();
  const filtered = votes.filter(vote => vote.projectType === projectType);
  
  return GENRES.reduce((acc, genre) => {
    acc[genre] = filtered.filter(vote => vote.genre === genre).length;
    return acc;
  }, {} as Record<Genre, number>);
};

export const getCountsByCountry = (country: string): Record<Genre, number> => {
  const votes = getVotes();
  const filtered = votes.filter(vote => vote.country === country);
  
  return GENRES.reduce((acc, genre) => {
    acc[genre] = filtered.filter(vote => vote.genre === genre).length;
    return acc;
  }, {} as Record<Genre, number>);
};

export const getTotalsByGenre = (): Record<Genre, number> => {
  const votes = getVotes();
  
  return GENRES.reduce((acc, genre) => {
    acc[genre] = votes.filter(vote => vote.genre === genre).length;
    return acc;
  }, {} as Record<Genre, number>);
};

export const getCountsByTelevisionChannel = (channel: TelevisionChannel): Record<TelevisionContentType, number> => {
  const votes = getVotes();
  const filtered = votes.filter(vote => 
    vote.projectType === "Television" && 
    vote.televisionChannel === channel
  );
  
  return TELEVISION_CONTENT_TYPES.reduce((acc, contentType) => {
    acc[contentType] = filtered.filter(vote => vote.televisionContentType === contentType).length;
    return acc;
  }, {} as Record<TelevisionContentType, number>);
};

export const getCountsByTelevisionContentType = (contentType: TelevisionContentType): number => {
  const votes = getVotes();
  return votes.filter(vote => 
    vote.projectType === "Television" && 
    vote.televisionContentType === contentType
  ).length;
};

export const getNotesBySection = (projectTypes: ProjectType[]): { notes: string, timestamp: string }[] => {
  const votes = getVotes();
  return votes
    .filter(vote => 
      projectTypes.includes(vote.projectType) && 
      vote.notes && 
      vote.notes.trim().length > 0
    )
    .map(vote => ({
      notes: vote.notes as string,
      timestamp: vote.timestamp
    }))
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const getCountsByYoutubeContentCategory = (category: YouTubeContentCategory): number => {
  const votes = getVotes();
  return votes.filter(vote => 
    (vote.projectType === "YouTubeContent") && 
    vote.youtubeContentCategory === category
  ).length;
};

export const getCountsByYoutubeSection = (section: string): Record<YouTubeContentCategory, number> => {
  const votes = getVotes();
  const categoryList = YOUTUBE_CONTENT_CATEGORIES[section] || [];
  
  return categoryList.reduce((acc, category) => {
    acc[category] = votes.filter(vote => 
      vote.projectType === "YouTubeContent" && 
      vote.youtubeContentCategory === category
    ).length;
    return acc;
  }, {} as Record<YouTubeContentCategory, number>);
};

export const getCountsByOTTPlatform = (platform: OTTPlatform): Record<Genre, number> => {
  const votes = getVotes();
  const filtered = votes.filter(vote => 
    vote.projectType === "OTTPlatform" && 
    vote.ottPlatform === platform
  );
  
  return OTT_GENRES.reduce((acc, genre) => {
    acc[genre] = filtered.filter(vote => vote.genre === genre).length;
    return acc;
  }, {} as Record<Genre, number>);
};
