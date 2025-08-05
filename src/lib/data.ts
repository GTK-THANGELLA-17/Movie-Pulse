export const COUNTRIES = [
  "United States", "Canada", "United Kingdom", "Germany", "France", "Italy", "Spain", "Japan", "China", "India",
  "Brazil", "Mexico", "Australia", "South Korea", "Russia", "Netherlands", "Switzerland", "Sweden", "Norway", "Denmark",
  "Finland", "Ireland", "Belgium", "Austria", "Poland", "Portugal", "Greece", "Czech Republic", "Hungary", "Romania",
  "Singapore", "Hong Kong", "Thailand", "Indonesia", "Malaysia", "Philippines", "Vietnam", "Argentina", "Colombia", "Chile",
  "Peru", "Venezuela", "Egypt", "Nigeria", "South Africa", "Kenya", "Morocco", "Saudi Arabia", "United Arab Emirates", "Israel"
];

export const GENRES = [
  "Action", "Adventure", "Animation", "Anthology", "Biography", "Children", "Comedy", "Crime", "Documentary", "Drama", 
  "Family", "Fantasy", "Film-Noir", "History", "Horror", "Musical", "Mystery", "Romance", "Sci-Fi", "Sport", "Superhero", 
  "Thriller", "War", "Western", "Teen", "Young Adult", "Mature", "Adult",
  "Political", "Historical", "Mythology", "Psychological", "Suspense", "Satire", "Period Drama", "Neo-noir", "Slice of Life",
  "Coming of Age", "Road Movie", "Heist", "Disaster", "Survival", "Post-Apocalyptic", "Cyberpunk", "Steampunk", "Time Travel",
  "Alternate History", "Dystopian", "Utopian", "Space Opera", "Urban Fantasy", "Paranormal", "Supernatural", "Gothic",
  "Black Comedy", "Dark Comedy", "Romantic Comedy", "Screwball Comedy", "Slapstick", "Parody", "Mockumentary",
  "Experimental", "Avant-garde", "Surreal", "Abstract", "Minimalist", "Episodic", "Non-linear", "Found Footage",
  "Social Commentary", "Environmental", "Feminist", "LGBTQ+", "Cultural", "Religious", "Spiritual", "Philosophical"
];

export const FILM_INDUSTRIES = [
  "Hollywood", "Bollywood", "Tollywood", "Kollywood", "Mollywood", "Sandalwood", "Bhojpuri Cinema", "Marathi Cinema", "Punjabi Cinema", "Bengali Cinema",
  "Korean Cinema", "Japanese Cinema", "Chinese Cinema", "Hong Kong Cinema", "Thai Cinema", "Indonesian Cinema", "Malaysian Cinema", "Philippine Cinema",
  "European Cinema", "French Cinema", "German Cinema", "Italian Cinema", "Spanish Cinema", "Russian Cinema", "Scandinavian Cinema", "British Cinema",
  "African Cinema", "Nigerian Cinema (Nollywood)", "Egyptian Cinema", "South African Cinema", "Moroccan Cinema",
  "Latin American Cinema", "Mexican Cinema", "Brazilian Cinema", "Argentinian Cinema", "Colombian Cinema",
  "Middle Eastern Cinema", "Iranian Cinema", "Turkish Cinema", "Israeli Cinema",
  "Independent Film", "Arthouse Cinema", "Documentary", "Short Film", "Student Film", "Experimental Cinema", "Animation Studios", "Web Series"
];

export const OTT_PLATFORMS = [
  "Netflix", "Amazon Prime Video", "Disney+", "Disney+ Hotstar", "Hulu", "HBO Max", "HBO NOW", "Apple TV+", "Peacock", "Paramount+", "Paramount+ Global",
  "YouTube Premium", "YouTube TV", "Crunchyroll", "Funimation", "VRV", "Tubi", "Pluto TV", "IMDb TV", "The CW", "CBS All Access",
  "Discovery+", "National Geographic", "History Channel", "A&E", "Lifetime", "TLC", "Food Network", "HGTV", "Travel Channel",
  "ESPN+", "NFL Network", "NBA League Pass", "MLB.TV", "UFC Fight Pass", "WWE Network",
  "Sony LIV", "ZEE5", "Voot", "MX Player", "ALTBalaji", "Eros Now", "SonyLiv", "Jio Cinema", "Airtel Xstream", "HOOQ",
  "Hotstar", "Sun NXT", "Aha", "Simply South", "hoichoi", "Addatimes", "Klikk", "Shemaroo Me", "Hungama Play", "BigFlix",
  "iQiyi", "Youku", "Tencent Video", "Bilibili", "WeTV", "MangoTV", "Viki", "Kocowa", "OnDemandKorea", "AsianCrush",
  "Starz", "Showtime", "Cinemax", "Epix", "Britbox", "Acorn TV", "Shudder", "Sundance Now", "AMC+", "Spectrum TV",
  "Sling TV", "FuboTV", "AT&T TV", "Philo", "Vidgo", "Frndly TV",
  "BBC iPlayer", "ITV Hub", "All 4", "My5", "BritBox", "Now TV", "Hayu", "UKTV Play",
  "Stan", "Binge", "Kayo Sports", "Foxtel Now", "ABC iview", "SBS On Demand", "7plus", "9Now", "10 play",
  "Salto", "France.tv", "MyCanal", "OCS", "Arte", "Molotov.tv", "6play",
  "Sky Go", "TVP VOD", "Polsat Go", "Player.pl", "CDA Premium", "Ipla",
  "Other Regional Platform", "Local Platform", "Indie Platform", "Other"
];

export const YOUTUBE_CONTENT_CATEGORIES = [
  "Music", "Gaming", "Education", "Comedy", "Sports", "News", "Film", "Vlog", "DIY", "Kids", "Animation", "Technology", "Travel", "Health", "Science"
];

export const INSTAGRAM_PROFILE_TYPES = [
  "Personal", "Business", "Creator", "Celebrity", "Brand", "Influencer", "Micro Influencer", "Lifestyle Blogger", "Fashion Influencer", "Food Blogger", "Travel Blogger", "Fitness Influencer", "Music Artist", "Actor", "Director"
];

export const INSTAGRAM_CONTENT_TYPES = [
  "Photo", "Video", "Reels", "Stories", "Live", "IGTV", "Collab", "Ad"
];

export const OTT_SERIES_TYPES = [
  "Limited Series", "Anthology Series", "Mini-Series", "Long-running Series", "Web Series", "Docuseries"
];

export const DEMOGRAPHICS_OPTIONS = {
  age: ["13-17", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"],
  gender: ["male", "female", "non-binary", "prefer-not-to-say"],
  region: COUNTRIES,
};

export const MUSIC_GENRES = [
  "Pop", "Rock", "Hip Hop", "Electronic", "Classical", "Country", "Jazz", "Blues", "Folk", "R&B",
  "Metal", "Punk", "Reggae", "World", "Alternative", "Indie", "Gospel", "Latin", "Funk", "Soul"
];

export const MUSIC_MOODS = [
  "Happy", "Sad", "Energetic", "Relaxing", "Romantic", "Angry", "Calm", "Hopeful", "Dark", "Dreamy",
  "Funky", "Groovy", "Inspirational", "Melancholic", "Mysterious", "Nostalgic", "Optimistic", "Peaceful", "Reflective", "Uplifting"
];

export const MUSIC_LANGUAGES = [
  "English", "Spanish", "French", "German", "Italian", "Portuguese", "Russian", "Chinese", "Japanese", "Korean",
  "Hindi", "Arabic", "Swahili", "Bengali", "Turkish", "Vietnamese", "Indonesian", "Thai", "Persian", "Urdu"
];

// Expand Film and YouTube Film genres
export const FILM_GENRES = [
  "Drama", "Comedy", "Action", "Thriller", "Romance", "Fantasy", "Animation", "Adventure",
  "Crime", "Family", "Historical", "Mystery", "Documentary", "Horror", "Sci-Fi", "Musical", "War", "Western"
];
export const YOUTUBE_FILM_GENRES = [
  "Drama", "Comedy", "Action", "Documentary", "Romance", "Thriller", "Short", "Music", "Animation", "Adventure",
  "Vlog", "Crime", "Historical", "Mystery", "Horror", "Fantasy", "Sci-Fi", "Family"
];

export const FILM_PROJECT_TYPES = [
  "HighBudgetFilm",
  "LowBudgetFilm",
  "ShortFilm",
  "YouTubeFilm",
  "YouTubeContent",
  "OTTPlatform",
  "Television",
  "InstagramContent",
];

export const FILM_PROJECT_TYPE_LABELS: Record<string, string> = {
  HighBudgetFilm: "High Budget Film",
  LowBudgetFilm: "Low Budget Film",
  ShortFilm: "Short Film",
  YouTubeFilm: "YouTube Film",
  YouTubeContent: "YouTube Content",
  OTTPlatform: "OTT Platform",
  Television: "Television",
  InstagramContent: "Instagram Content",
};

// For Project-type selectors/stats UI
export const PROJECT_TYPES = [...FILM_PROJECT_TYPES];
export const PROJECT_TYPE_LABELS = { ...FILM_PROJECT_TYPE_LABELS };

// OTT Genres stub (could reuse GENRES for now)
export const OTT_GENRES = [...GENRES];

// Stub: pretend we have a country type if importing as value
export type Country = string;

// Expanded Television channels by country
export const TELEVISION_CHANNELS_BY_COUNTRY: Record<string, string[]> = {
  "United States": ["NBC", "CBS", "ABC", "FOX", "PBS", "CNN", "MSNBC", "ESPN", "HBO", "Discovery", "Cartoon Network"],
  "India": ["Zee TV", "Star Plus", "Sony", "Aaj Tak", "CNBC Awaaz", "NDTV", "Colors TV", "Sun TV", "ETV", "News18", "DD National"],
  "United Kingdom": ["BBC One", "BBC Two", "ITV", "Channel 4", "Channel 5", "Sky News", "Sky Sports", "Dave", "E4", "CBBC"],
  "Japan": ["NHK", "Fuji TV", "Nippon TV", "TV Asahi", "TBS"],
  "Australia": ["ABC Australia", "SBS", "Seven Network", "Nine Network", "Ten Network"],
  "Germany": ["ARD", "ZDF", "RTL", "Sat.1", "VOX"],
  // ... add more as needed ...
};

// Expanded channel content types mapping
export const TELEVISION_CONTENT_TYPES_BY_CHANNEL = {
  "NBC": ["News", "Drama Series", "Late Night Shows", "Morning Shows", "Variety Shows"],
  "CBS": ["Drama Series", "Reality Shows", "Comedy Shows", "Morning Shows", "Late Night Shows"],
  "ABC": ["Drama Series", "Reality Shows", "Talk Shows", "Game Shows", "News"],
  "FOX": ["Sports", "News", "Drama Series", "Animated Shows", "Reality Shows"],
  "PBS": ["Documentary", "Kids", "Educational", "Drama Series", "News"],
  "CNN": ["News", "Current Affairs", "Talk Shows", "Documentary"],
  "MSNBC": ["News", "Current Affairs", "Political Shows"],
  "ESPN": ["Sports", "Live Events", "Talk Shows", "Documentary"],
  "HBO": ["Drama Series", "Movies", "Comedy Shows", "Talk Shows"],
  "Discovery": ["Documentary", "Nature", "Science", "Reality Shows"],
  "Cartoon Network": ["Kids", "Animation", "Comedy Shows", "Cartoon Series"],

  "Zee TV": ["Drama Series", "Soap Opera", "Game Shows", "Reality Shows", "Comedy Shows"],
  "Star Plus": ["Drama Series", "Reality Shows", "Cooking Shows", "Game Shows"],
  "Sony": ["Drama Series", "Crime Shows", "Music", "Game Shows", "Comedy Shows"],
  "Aaj Tak": ["News", "Current Affairs", "Political Shows", "Talk Shows"],
  "CNBC Awaaz": ["Business News", "Financial Shows", "Economy"],
  "NDTV": ["News", "Debate Shows", "Current Affairs", "Interviews"],
  "Colors TV": ["Drama Series", "Reality Shows", "Comedy Shows", "Game Shows"],
  "Sun TV": ["Drama Series", "Serials", "Music", "Talk Shows"],
  "ETV": ["Drama Series", "Talk Shows", "Reality Shows"],
  "News18": ["News", "Interviews", "Current Affairs"],
  "DD National": ["News", "Drama Series", "Cultural Shows"],

  "BBC One": ["Drama Series", "News", "Comedy Shows", "Reality Shows"],
  "BBC Two": ["Documentary", "Comedy Shows", "Drama Series", "Educational"],
  "ITV": ["Drama Series", "Reality Shows", "News", "Game Shows"],
  "Channel 4": ["Documentary", "Reality Shows", "Comedy Shows"],
  "Channel 5": ["Drama Series", "Reality Shows", "News"],
  "Sky News": ["News", "Current Affairs"],
  "Sky Sports": ["Sports", "Live Events"],
  "Dave": ["Comedy Shows", "Reality Shows"],
  "E4": ["Drama Series", "Comedy Shows", "Reality Shows"],
  "CBBC": ["Kids", "Drama Series", "Comedy Shows"],

  "NHK": ["News", "Drama Series", "Educational", "Documentary", "Kids"],
  "Fuji TV": ["Drama Series", "Variety Shows", "Comedy Shows"],
  "Nippon TV": ["Drama Series", "Documentary", "Sports"],
  "TV Asahi": ["Music", "Drama Series", "News"],
  "TBS": ["Drama Series", "Comedy Shows", "Reality Shows"],

  "ABC Australia": ["News", "Drama Series", "Documentary", "Kids"],
  "SBS": ["Documentary", "Drama Series", "Movies"],
  "Seven Network": ["Drama Series", "Reality Shows", "News"],
  "Nine Network": ["Drama Series", "Reality Shows", "News", "Game Shows"],
  "Ten Network": ["Drama Series", "Comedy Shows", "Reality Shows"],

  "ARD": ["News", "Drama Series", "Documentary"],
  "ZDF": ["News", "Drama Series", "Comedy Shows", "Talk Shows"],
  "RTL": ["Drama Series", "Reality Shows", "Comedy Shows", "News"],
  "Sat.1": ["Drama Series", "Comedy Shows", "Game Shows"],
  "VOX": ["Drama Series", "Reality Shows", "Comedy Shows"],

  // ... add more channel content mappings as desired ...
};

// Television fallback content types (used if none provided above)
export const TELEVISION_CONTENT_TYPES = [
  "News", "Entertainment", "Sports", "Educational", "Documentary", "Movies", 
  "Series", "Reality Shows", "Talk Shows", "Music", "Comedy Shows", "Drama Series", "Kids", "Game Shows", "Live Events"
];

export const YOUTUBE_CHANNEL_TYPES = [
  "Entertainment",
  "Educational",
  "Gaming",
  "Tech Reviews",
  "Lifestyle",
  "Music",
  "Comedy",
  "News",
  "Sports",
  "Cooking",
  "Travel",
  "Fashion",
  "DIY/Crafts",
  "Business",
  "Health & Fitness",
  "Science",
  "Art & Design",
  "Movie Reviews",
  "Vlogs",
  "Podcasts",
  "Finance",
  "Spirituality",
  "Kids",
  "Esports",
  // Added types:
  "Documentary",
  "Makeup & Beauty",
  "Automotive",
  "Food & Drink",
  "Animals & Pets",
  "Parenting",
  "Language Learning",
  "History",
  "Unboxing",
  "ASMR",
  "Memes",
  "BookTube",
  "Productivity",
];

// Expanded mapping: channel type to content categories
export const CHANNEL_TYPE_TO_CATEGORIES: Record<string, string[]> = {
  "Entertainment": ["Comedy", "Drama", "Music", "Documentary", "Vlog", "Movie Reviews", "Reality", "Skits", "Reactions"],
  "Educational": ["Education", "Science", "Technology", "Tutorials", "Programming", "History", "Language Learning", "Book Reviews"],
  "Gaming": ["Gaming", "Esports", "Let's Play", "Game Development", "Game Reviews", "Game Lore", "Speedruns"],
  "Tech Reviews": ["Technology", "Gadgets", "Unboxing", "Product Reviews", "How-Tos"],
  "Lifestyle": ["Vlog", "Daily Life", "Advice", "Travel", "Home Decor", "Relationships", "Minimalism"],
  "Music": ["Music", "Live Performances", "Instrumental", "Singing Lessons", "Music Production", "Covers", "Originals"],
  "Comedy": ["Comedy", "Sketches", "Stand-up Comedy", "Prank", "Parody", "Memes", "Impressions", "Satire"],
  "News": ["News", "Current Affairs", "Political Commentary", "Debate", "Interviews"],
  "Sports": ["Sports", "Analysis", "Live Commentary", "Highlights", "Fitness"],
  "Cooking": ["Cooking", "Recipes", "Food Reviews", "Baking", "Meal Prep", "Food Challenges"],
  "Travel": ["Travel", "Vlog", "Culture", "Exploration", "Nature"],
  "Fashion": ["Fashion", "Outfits", "Hauls", "Makeup", "Trends", "Behind the Scenes"],
  "DIY/Crafts": ["DIY", "Crafts", "Home Improvement", "Upcycling", "Tutorials", "Art & Design"],
  "Business": ["Business", "Entrepreneurship", "Finance", "Startups", "Investing", "Marketing"],
  "Health & Fitness": ["Health", "Workout", "Wellness", "Nutrition", "Mental Health"],
  "Science": ["Science", "Experiments", "Education", "Space", "Technology"],
  "Art & Design": ["Art", "Drawing", "Painting", "Digital Art", "Animation", "Graphic Design"],
  "Movie Reviews": ["Movie Reviews", "Film Analysis", "Reactions", "Rankings", "Commentary"],
  "Vlogs": ["Vlogs", "Travel", "Lifestyle", "Daily Life"],
  "Podcasts": ["Podcasts", "Interviews", "Discussions", "Roundtables"],
  "Finance": ["Finance", "Investing", "Budgeting", "Crypto", "Economic News"],
  "Spirituality": ["Spirituality", "Meditation", "Mindfulness", "Philosophy"],
  "Kids": ["Kids", "Animation", "Cartoons", "Family", "Learning", "Toy Unboxings"],
  "Esports": ["Esports", "Game Analysis", "Competitive Gaming", "Tournaments", "Highlights"],
  "Documentary": ["Documentary", "Mini-Docs", "Interviews", "Field Reports"],
  "Makeup & Beauty": ["Makeup", "Beauty", "Tutorials", "Hauls", "Product Reviews"],
  "Automotive": ["Cars", "Car Reviews", "Test Drives", "Car Culture", "DIY"],
  "Food & Drink": ["Food", "Cooking", "Beverages", "Tasting", "Challenges"],
  "Animals & Pets": ["Animals", "Pets", "Training", "Rescue Stories", "Cute Moments"],
  "Parenting": ["Parenting", "Advice", "Family", "Kids"],
  "Language Learning": ["Language Learning", "Education", "Tutorials", "Practice"],
  "History": ["History", "Documentary", "Storytelling", "Analysis"],
  "Unboxing": ["Unboxing", "Product Reviews", "Tech", "Toys", "Fashion", "Gadgets"],
  "ASMR": ["ASMR", "Relaxation", "Sounds", "Roleplay"],
  "Memes": ["Memes", "Funny Moments", "Reactions", "Trends"],
  "BookTube": ["Book Reviews", "Literature", "Discussion", "Rankings"],
  "Productivity": ["Productivity", "Advice", "Techniques", "Work", "Study"],
  // ...expand or split more as needed...
};

export const INSTAGRAM_CONTENT_CATEGORY_LABELS = YOUTUBE_CONTENT_CATEGORIES.reduce(
  (acc, cat) => ({ ...acc, [cat]: cat }),
  {}
);

export const getFilteredVoteStats = (filters: any) => {
  let storedOpinions: any[] = [];

  Object.keys(localStorage).forEach(key => {
    if (key.startsWith("moviepulse-opinions-")) {
      const opinions = JSON.parse(localStorage.getItem(key) || "[]");
      if (Array.isArray(opinions)) {
        storedOpinions = storedOpinions.concat(opinions);
      }
    }
  });

  let filteredOpinions = storedOpinions.filter(opinion => {
    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        if (key === 'gender' && opinion.demographics?.gender !== filters[key]) {
          return false;
        } else if (key === 'ageGroup' && opinion.demographics?.age !== filters[key]) {
          return false;
        } else if (opinion[key] !== filters[key]) {
          return false;
        }
      }
    }
    return true;
  });

  const stats: any = {
    total: filteredOpinions.length,
    byYoutubeCategory: {},
    byYoutubeChannelType: {}
  };

  filteredOpinions.forEach(opinion => {
    if (opinion.youtubeContentCategory) {
      stats.byYoutubeCategory[opinion.youtubeContentCategory] = (stats.byYoutubeCategory[opinion.youtubeContentCategory] || 0) + 1;
    }
    if (opinion.youtubeChannelType) {
      stats.byYoutubeChannelType[opinion.youtubeChannelType] = (stats.byYoutubeChannelType[opinion.youtubeChannelType] || 0) + 1;
    }
  });

  return stats;
};

// Dummy functions for counts (should be replaced with real implementations)
export function getCountsByIndustry(industry?: string) {
  // This is a stub, real implementation needed
  return {};
}
export function getCountsByProjectType(projectType?: string) {
  // This is a stub, real implementation needed
  return {};
}
export function getCountsByCountry(country?: string) {
  // This is a stub, real implementation needed
  return {};
}
export function getCountsByOTTPlatform(platform?: string) {
  // This is a stub, real implementation needed
  return {};
}
export function getVotes() { return []; }

// For backward compatibility if some UIs reference label maps
export const YOUTUBE_CONTENT_CATEGORY_LABELS = YOUTUBE_CONTENT_CATEGORIES.reduce(
  (acc, cat) => ({ ...acc, [cat]: cat }),
  {}
);

// Default voting period configuration
export const DEFAULT_VOTING_PERIOD = {
  isActive: false,
  // Defaults to today and 7 days from now
  startDate: new Date().toISOString().split("T")[0],
  endDate: (() => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toISOString().split("T")[0];
  })()
};

// Retrieve voting period from localStorage
export function getVotingPeriod() {
  const key = "moviepulse-voting-period";
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch { /* Ignore parse error */ }
  }
  return null;
}

// Save voting period to localStorage and return updated period
export function saveVotingPeriod(period: any) {
  const key = "moviepulse-voting-period";
  localStorage.setItem(key, JSON.stringify(period));
  return period;
}
