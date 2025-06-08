import { FilmIndustry, Genre, ProjectType, FilmProjectType, Country, OTTPlatform, YouTubeContentCategory, YouTubeChannelType, TelevisionContentType, Vote, VotingPeriod } from "./types";

export const FILM_INDUSTRIES: FilmIndustry[] = [
  "Bollywood", "Hollywood", "Tollywood", "Kollywood", "Mollywood", "Sandalwood", 
  "Bhojpuri", "Punjabi", "Marathi", "Bengali", "Gujarati", "Assamese", "Odia", "Other"
];

export const GENRES: Genre[] = [
  "Action", "Comedy", "Drama", "Horror", "Romance", "Thriller", "Sci-Fi", 
  "Fantasy", "Adventure", "Crime", "Mystery", "Documentary", "Animation", 
  "Musical", "War", "Western", "Biography", "History", "Sport", "Family"
];

export const PROJECT_TYPES: ProjectType[] = [
  "Films", "YouTubeFilm", "YouTubeContent", "OTTPlatform", "Television"
];

export const FILM_PROJECT_TYPES: FilmProjectType[] = [
  "HighBudgetFilm", "LowBudgetFilm", "ShortFilm"
];

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  Films: "Films",
  YouTubeFilm: "YouTube Film",
  YouTubeContent: "YouTube Content",
  OTTPlatform: "OTT Platform",
  Television: "Television"
};

export const FILM_PROJECT_TYPE_LABELS: Record<FilmProjectType, string> = {
  HighBudgetFilm: "High Budget Film",
  LowBudgetFilm: "Low Budget Film",
  ShortFilm: "Short Film"
};

export const COUNTRIES: Country[] = [
  "India", "USA", "UK", "Canada", "Australia", "Germany", "France", "Japan", 
  "South Korea", "China", "Brazil", "Mexico", "Argentina", "Italy", "Spain", 
  "Russia", "Turkey", "Egypt", "Nigeria", "South Africa", "Other"
];

export const OTT_PLATFORMS: OTTPlatform[] = [
  "Netflix", "Amazon Prime Video", "Disney+ Hotstar", "YouTube Premium", "SonyLIV", 
  "ZEE5", "Voot", "MX Player", "Alt Balaji", "Eros Now", "Hulu", "HBO Max", 
  "Apple TV+", "Paramount+", "Peacock", "Other"
];

export const YOUTUBE_CHANNEL_TYPES: YouTubeChannelType[] = [
  "Entertainment", "Educational", "Gaming", "Tech Reviews", "Lifestyle", "Music", 
  "Comedy", "News", "Sports", "Cooking", "Travel", "Fashion", "DIY/Crafts", 
  "Business", "Health & Fitness", "Science", "Art & Design", "Movie Reviews", "Vlogs", "Other"
];

// Expanded YouTube Content Categories
export const YOUTUBE_CONTENT_CATEGORIES: YouTubeContentCategory[] = [
  "Comedy", "Education", "Entertainment", "Gaming", "Music", "News", "Sports", 
  "Technology", "Travel", "Food", "Fashion", "Health", "DIY", "Reviews", 
  "Tutorials", "Science", "Art", "Business", "Lifestyle", "Beauty", "Fitness",
  "Politics", "Documentary", "Animation", "Kids", "How-to & DIY", "Review",
  "Unboxing", "Vlog", "Podcast", "Live Streaming", "Reaction", "Challenge",
  "Prank", "Dance", "Art & Craft", "Cooking", "Photography", "Film Making",
  "Music Production", "Software Development", "Mobile Apps", "Web Design",
  "Digital Marketing", "Cryptocurrency", "Stock Trading", "Real Estate",
  "Personal Finance", "Self Improvement", "Meditation", "Yoga", "Workout",
  "Bodybuilding", "Weight Loss", "Nutrition", "Mental Health", "Relationships",
  "Parenting", "Pet Care", "Gardening", "Home Improvement", "Car Reviews",
  "Motorcycle", "Aviation", "Space", "History", "Geography", "Language Learning",
  "Mathematics", "Physics", "Chemistry", "Biology", "Programming", "AI & ML",
  "Cybersecurity", "Blockchain", "VR & AR", "3D Modeling", "Graphic Design",
  "Logo Design", "UI/UX Design", "Fashion Design", "Interior Design",
  "Architecture", "Engineering", "Medicine", "Law", "Economics", "Philosophy",
  "Psychology", "Sociology", "Anthropology", "Religious", "Spirituality",
  "True Crime", "Mystery", "Horror Stories", "Stand-up Comedy", "Sketches",
  "Improvisation", "Theater", "Opera", "Classical Music", "Jazz", "Rock",
  "Pop Music", "Hip Hop", "Electronic Music", "Country Music", "Folk Music",
  "World Music", "Instrumental", "Karaoke", "Music Theory", "Singing Lessons",
  "Guitar Lessons", "Piano Lessons", "Drum Lessons", "Sports Analysis",
  "Cricket", "Football", "Basketball", "Tennis", "Soccer", "Baseball",
  "Golf", "Swimming", "Athletics", "Olympics", "Esports", "Chess",
  "Board Games", "Card Games", "Puzzle Games", "Strategy Games",
  "Mobile Gaming", "PC Gaming", "Console Gaming", "Game Development",
  "Game Reviews", "Let's Play", "Speed Running", "Game Streaming",
  "Recipe", "Restaurant Reviews", "Culture", "Adventure", "Shopping",
  "Style Tips", "Woodworking", "Crafting", "Entrepreneurship", "Analysis",
  "Daily Life", "Personal Stories"
];

// Mapping channel types to relevant content categories
export const CHANNEL_TYPE_TO_CATEGORIES: Record<YouTubeChannelType, YouTubeContentCategory[]> = {
  "Entertainment": [
    "Entertainment", "Comedy", "Music", "Vlog", "Reaction", "Challenge", 
    "Prank", "Dance", "Stand-up Comedy", "Sketches", "Improvisation"
  ],
  "Educational": [
    "Education", "Tutorials", "Science", "Mathematics", "Physics", "Chemistry", 
    "Biology", "Programming", "Language Learning", "How-to & DIY", "History", "Geography"
  ],
  "Gaming": [
    "Gaming", "Reviews", "Entertainment", "Mobile Gaming", "PC Gaming", "Console Gaming",
    "Game Development", "Game Reviews", "Let's Play", "Speed Running", "Game Streaming", "Esports"
  ],
  "Tech Reviews": [
    "Technology", "Reviews", "Tutorials", "Unboxing", "Software Development", 
    "Mobile Apps", "Web Design", "AI & ML", "Cybersecurity", "Blockchain"
  ],
  "Lifestyle": [
    "Lifestyle", "Fashion", "Health", "Beauty", "Fitness", "Self Improvement",
    "Relationships", "Home Improvement", "Interior Design"
  ],
  "Music": [
    "Music", "Entertainment", "Classical Music", "Jazz", "Rock", "Pop Music",
    "Hip Hop", "Electronic Music", "Music Production", "Singing Lessons", "Guitar Lessons", "Piano Lessons"
  ],
  "Comedy": [
    "Comedy", "Entertainment", "Stand-up Comedy", "Sketches", "Prank", 
    "Improvisation", "Reaction"
  ],
  "News": ["News", "Politics", "Documentary"],
  "Sports": [
    "Sports", "Entertainment", "Sports Analysis", "Cricket", "Football", 
    "Basketball", "Tennis", "Soccer", "Olympics", "Fitness", "Workout"
  ],
  "Cooking": [
    "Food", "Tutorials", "Cooking", "Nutrition", "Recipe", "Restaurant Reviews"
  ],
  "Travel": [
    "Travel", "Vlog", "Documentary", "Geography", "Culture", "Adventure"
  ],
  "Fashion": [
    "Fashion", "Lifestyle", "Beauty", "Fashion Design", "Shopping", "Style Tips"
  ],
  "DIY/Crafts": [
    "DIY", "Tutorials", "Art & Craft", "Home Improvement", "Gardening", 
    "How-to & DIY", "Woodworking", "Crafting"
  ],
  "Business": [
    "Business", "Education", "Digital Marketing", "Cryptocurrency", "Stock Trading",
    "Real Estate", "Personal Finance", "Economics", "Entrepreneurship"
  ],
  "Health & Fitness": [
    "Health", "Lifestyle", "Fitness", "Workout", "Bodybuilding", "Weight Loss",
    "Nutrition", "Mental Health", "Yoga", "Meditation"
  ],
  "Science": [
    "Science", "Education", "Physics", "Chemistry", "Biology", "Space",
    "Engineering", "Medicine", "Documentary"
  ],
  "Art & Design": [
    "Art", "Tutorials", "Graphic Design", "Logo Design", "UI/UX Design",
    "3D Modeling", "Photography", "Art & Craft", "Architecture"
  ],
  "Movie Reviews": [
    "Reviews", "Entertainment", "Film Making", "Documentary", "Analysis"
  ],
  "Vlogs": [
    "Vlog", "Lifestyle", "Travel", "Daily Life", "Personal Stories"
  ],
  "Other": YOUTUBE_CONTENT_CATEGORIES
};

export const TELEVISION_CONTENT_TYPES = [
  "News", "Entertainment", "Sports", "Educational", "Documentary", "Movies", 
  "Series", "Reality Shows", "Talk Shows", "Cartoons", "Music", "Religious", "Regional", "Other"
];

export const TELEVISION_CHANNELS_BY_COUNTRY: Record<Country, string[]> = {
  "India": [
    "Star Plus", "Colors TV", "Sony TV", "Zee TV", "Star Bharat", "DD National", 
    "NDTV", "Republic TV", "Times Now", "CNN-News18", "India Today", "Aaj Tak",
    "Star Sports", "Sony Sports", "ESPN", "Eurosport", "Discovery Channel",
    "National Geographic", "History TV18", "Animal Planet", "TLC", "FoodFood",
    "Zee Cinema", "Star Gold", "Sony Max", "Colors Cineplex", "UTV Movies",
    "Star World", "Comedy Central", "MTV", "VH1", "Cartoon Network", "Pogo",
    "Nick Jr.", "Disney Channel", "Hungama TV", "Sony YAY!", "Super Hungama"
  ],
  "USA": [
    "ABC", "NBC", "CBS", "FOX", "CNN", "ESPN", "HBO", "Discovery Channel",
    "National Geographic", "History Channel", "Animal Planet", "TLC", "Food Network",
    "HGTV", "Travel Channel", "Comedy Central", "MTV", "VH1", "Nickelodeon",
    "Cartoon Network", "Disney Channel", "Disney XD", "PBS Kids", "Netflix",
    "Hulu", "Amazon Prime Video", "Disney+", "HBO Max", "Paramount+", "Peacock"
  ],
  "UK": [
    "BBC One", "BBC Two", "ITV", "Channel 4", "Sky News", "Sky Sports",
    "BBC News", "Channel 5", "Dave", "E4", "More4", "Film4", "Sky Cinema",
    "Discovery UK", "National Geographic UK", "History Channel UK", "Animal Planet UK",
    "Food Network UK", "Travel Channel UK", "Comedy Central UK", "MTV UK",
    "Nickelodeon UK", "Cartoon Network UK", "Disney Channel UK", "CBeebies", "CBBC"
  ],
  "Canada": [
    "CBC", "CTV", "Global TV", "TVA", "Radio-Canada", "CBC News Network",
    "CTV News Channel", "Sportsnet", "TSN", "Discovery Channel Canada",
    "National Geographic Canada", "History Channel Canada", "Animal Planet Canada",
    "Food Network Canada", "HGTV Canada", "Comedy Network", "Much", "YTV",
    "Teletoon", "Family Channel", "Disney Channel Canada", "Treehouse"
  ],
  "Australia": [
    "ABC Australia", "Nine Network", "Seven Network", "SBS", "Ten Network",
    "ABC News 24", "Sky News Australia", "Fox Sports", "ESPN Australia",
    "Discovery Channel Australia", "National Geographic Australia", "History Channel Australia",
    "Animal Planet Australia", "Food Network Australia", "Lifestyle Channel",
    "Comedy Channel Australia", "MTV Australia", "Nickelodeon Australia",
    "Cartoon Network Australia", "Disney Channel Australia", "ABC Kids"
  ],
  "Germany": [
    "ARD", "ZDF", "RTL", "ProSieben", "Sat.1", "VOX", "RTL2", "Kabel Eins",
    "Tagesschau24", "N-TV", "N24", "Sport1", "Eurosport Deutschland",
    "Discovery Channel Deutschland", "National Geographic Deutschland", "History Channel Deutschland",
    "Animal Planet Deutschland", "TLC Deutschland", "Comedy Central Deutschland",
    "MTV Deutschland", "VIVA", "Nickelodeon Deutschland", "Super RTL", "KiKA"
  ],
  "France": [
    "TF1", "France 2", "France 3", "M6", "Canal+", "France 5", "Arte",
    "BFM TV", "CNews", "LCI", "Eurosport France", "RMC Sport",
    "Discovery Channel France", "National Geographic France", "History Channel France",
    "Animal Planet France", "Ushuaïa TV", "Comedy Central France", "MTV France",
    "Nickelodeon France", "Cartoon Network France", "Disney Channel France", "Gulli"
  ],
  "Japan": [
    "NHK", "TV Asahi", "TBS", "Fuji TV", "TV Tokyo", "Nippon TV",
    "NHK World", "TV Asahi News", "TBS News", "Fuji News Network",
    "J Sports", "Gaora", "Discovery Channel Japan", "National Geographic Japan",
    "History Channel Japan", "Animal Planet Japan", "Food Network Japan",
    "MTV Japan", "Nickelodeon Japan", "Cartoon Network Japan", "Disney Channel Japan"
  ],
  "South Korea": [
    "KBS", "MBC", "SBS", "JTBC", "tvN", "OCN", "Mnet", "KBS News",
    "MBC News", "SBS News", "YTN", "KBS Sports", "SBS Sports",
    "Discovery Channel Korea", "National Geographic Korea", "History Channel Korea",
    "Animal Planet Korea", "Food Network Korea", "Comedy TV", "MTV Korea",
    "Nickelodeon Korea", "Cartoon Network Korea", "Disney Channel Korea"
  ],
  "China": [
    "CCTV", "Hunan TV", "Zhejiang TV", "Jiangsu TV", "Beijing TV", "Shanghai TV",
    "CCTV News", "Phoenix TV", "CCTV Sports", "Discovery Channel China",
    "National Geographic China", "History Channel China", "Animal Planet China",
    "Travel Channel China", "MTV China", "Nickelodeon China", "Cartoon Network China"
  ],
  "Brazil": ["Globo", "SBT", "Record TV", "Band", "RedeTV!", "GloboNews", "SporTV", "Discovery Brasil", "National Geographic Brasil", "History Channel Brasil", "Animal Planet Brasil", "Food Network Brasil", "MTV Brasil", "Nickelodeon Brasil", "Cartoon Network Brasil", "Disney Channel Brasil"],
  "Mexico": ["Televisa", "TV Azteca", "Canal 5", "Las Estrellas", "Foro TV", "ESPN México", "Discovery Channel México", "National Geographic México", "History Channel México", "Animal Planet México", "Food Network México", "MTV México", "Nickelodeon México", "Cartoon Network México", "Disney Channel México"],
  "Argentina": ["Telefe", "Canal 13", "América TV", "Canal 9", "TN", "C5N", "ESPN Argentina", "Discovery Channel Argentina", "National Geographic Argentina", "History Channel Argentina", "Animal Planet Argentina", "Food Network Argentina", "MTV Argentina", "Nickelodeon Argentina", "Cartoon Network Argentina", "Disney Channel Argentina"],
  "Italy": ["RAI 1", "RAI 2", "Canale 5", "Italia 1", "Rete 4", "Sky TG24", "Sky Sport", "Discovery Channel Italia", "National Geographic Italia", "History Channel Italia", "Animal Planet Italia", "Food Network Italia", "MTV Italia", "Nickelodeon Italia", "Cartoon Network Italia", "Disney Channel Italia"],
  "Spain": ["TVE", "Antena 3", "Telecinco", "La Sexta", "24 Horas", "Teledeporte", "Discovery Channel España", "National Geographic España", "History Channel España", "Animal Planet España", "Canal Cocina", "MTV España", "Nickelodeon España", "Cartoon Network España", "Disney Channel España"],
  "Russia": ["Channel One", "Russia-1", "NTV", "TNT", "Russia-24", "Match TV", "Discovery Channel Russia", "National Geographic Russia", "History Channel Russia", "Animal Planet Russia", "MTV Russia", "Nickelodeon Russia", "Cartoon Network Russia", "Disney Channel Russia"],
  "Turkey": ["TRT 1", "Show TV", "Kanal D", "ATV", "TRT Haber", "TRT Spor", "Discovery Channel Turkey", "National Geographic Turkey", "History Channel Turkey", "Animal Planet Turkey", "MTV Turkey", "Nickelodeon Turkey", "Cartoon Network Turkey", "Disney Channel Turkey"],
  "Egypt": ["Al Kahera Wal Nas", "CBC", "ON TV", "MBC Masr", "Al Hayah", "Nile Sport", "Discovery Channel Middle East", "National Geographic Abu Dhabi", "History Channel Middle East", "Animal Planet Middle East", "MTV Middle East", "Nickelodeon Middle East", "Cartoon Network Arabic"],
  "Nigeria": ["NTA", "Channels TV", "AIT", "STV", "TVC", "SuperSport", "Discovery Channel Africa", "National Geographic Africa", "History Channel Africa", "Animal Planet Africa", "MTV Base", "Nickelodeon Africa", "Cartoon Network Africa"],
  "South Africa": ["SABC 1", "SABC 2", "e.tv", "M-Net", "eNCA", "SuperSport", "Discovery Channel Africa", "National Geographic Africa", "History Channel Africa", "Animal Planet Africa", "MTV Base", "Nickelodeon Africa", "Cartoon Network Africa"],
  "Other": ["Local Channel 1", "Local Channel 2", "International News", "Documentary Channel", "Sports Channel", "Kids Channel", "Music Channel", "Movie Channel"]
};

export const DEFAULT_VOTING_PERIOD: VotingPeriod = {
  isActive: true,
  startDate: new Date().toISOString(),
  endDate: new Date('2025-07-03T07:33:12.335Z').toISOString()
};

export function getVotingPeriod() {
  const now = new Date();
  const endDate = new Date('2025-07-03T07:33:12.335Z');
  const isActive = now < endDate;
  const remainingDays = Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  
  return {
    isActive,
    endDate: endDate.toISOString(),
    remainingDays
  };
}

export const saveVote = (vote: Vote) => {
  try {
    console.log('Saving vote to local storage:', vote);
    
    const existingVotesString = localStorage.getItem('moviepulse-votes');
    let existingVotes: Vote[] = [];
    
    if (existingVotesString) {
      try {
        const parsed = JSON.parse(existingVotesString);
        existingVotes = Array.isArray(parsed) ? parsed : [];
      } catch (parseError) {
        console.warn('Error parsing existing votes, starting fresh:', parseError);
        existingVotes = [];
      }
    }
    
    // Always add new vote (don't check for duplicates in this function)
    existingVotes.push(vote);
    
    localStorage.setItem('moviepulse-votes', JSON.stringify(existingVotes));
    console.log('Vote saved successfully. Total votes:', existingVotes.length);
    
    // Also save to session storage as backup
    try {
      sessionStorage.setItem('moviepulse-latest-vote', JSON.stringify(vote));
    } catch (sessionError) {
      console.warn('Could not save to session storage:', sessionError);
    }
    
    return true;
  } catch (error) {
    console.error('Failed to save vote:', error);
    throw error;
  }
};

export function getVotes(): Vote[] {
  try {
    const votesString = localStorage.getItem('moviepulse-votes');
    if (!votesString) {
      return [];
    }
    
    const parsed = JSON.parse(votesString);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Error loading votes from localStorage:', error);
    return [];
  }
}

export function getFilteredVoteStats(filters: {
  projectType?: ProjectType;
  country?: Country;
  gender?: string;
  ageGroup?: string;
  dateRange?: { start: Date; end: Date };
} = {}) {
  console.log('Getting filtered vote stats with filters:', filters);
  
  const votes = getVotes();
  console.log('All votes before filtering:', votes.length, votes);
  
  let filteredVotes = votes;
  
  // Apply filters
  if (filters.projectType) {
    filteredVotes = filteredVotes.filter(vote => {
      console.log(`Checking vote projectType: ${vote.projectType} against filter: ${filters.projectType}`);
      return vote.projectType === filters.projectType;
    });
    console.log('After project type filter:', filteredVotes.length);
  }
  
  if (filters.country) {
    filteredVotes = filteredVotes.filter(vote => {
      console.log(`Checking vote country: ${vote.country} against filter: ${filters.country}`);
      return vote.country === filters.country;
    });
    console.log('After country filter:', filteredVotes.length);
  }
  
  if (filters.gender && filters.gender !== 'all') {
    filteredVotes = filteredVotes.filter(vote => {
      const voteGender = vote.demographics?.gender;
      console.log(`Checking vote gender: ${voteGender} against filter: ${filters.gender}`);
      return voteGender === filters.gender;
    });
    console.log('After gender filter:', filteredVotes.length);
  }
  
  if (filters.ageGroup && filters.ageGroup !== 'all') {
    filteredVotes = filteredVotes.filter(vote => {
      const voteAge = vote.demographics?.age;
      let ageGroup: string;
      
      if (typeof voteAge === 'number') {
        // Convert number age to age group string
        if (voteAge >= 13 && voteAge <= 17) ageGroup = '13-17';
        else if (voteAge >= 18 && voteAge <= 24) ageGroup = '18-24';
        else if (voteAge >= 25 && voteAge <= 34) ageGroup = '25-34';
        else if (voteAge >= 35 && voteAge <= 44) ageGroup = '35-44';
        else if (voteAge >= 45 && voteAge <= 54) ageGroup = '45-54';
        else if (voteAge >= 55 && voteAge <= 64) ageGroup = '55-64';
        else if (voteAge >= 65) ageGroup = '65+';
        else ageGroup = 'Unknown';
      } else {
        ageGroup = String(voteAge || 'Unknown');
      }
      
      console.log(`Checking vote age group: ${ageGroup} against filter: ${filters.ageGroup}`);
      return ageGroup === filters.ageGroup;
    });
    console.log('After age filter:', filteredVotes.length);
  }
  
  if (filters.dateRange) {
    filteredVotes = filteredVotes.filter(vote => {
      const voteDate = new Date(vote.timestamp);
      const inRange = voteDate >= filters.dateRange!.start && voteDate <= filters.dateRange!.end;
      console.log(`Checking vote date: ${vote.timestamp} against range: ${filters.dateRange!.start} - ${filters.dateRange!.end}, result: ${inRange}`);
      return inRange;
    });
    console.log('After date range filter:', filteredVotes.length);
  }
  
  console.log('Final filtered votes:', filteredVotes.length);
  
  // Calculate recent votes (last 7 days)
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const recentVotes = filteredVotes.filter(vote => new Date(vote.timestamp) >= weekAgo);
  
  // Group by different categories
  const byProjectType: Record<string, number> = {};
  const byCountry: Record<string, number> = {};
  const byGenre: Record<string, number> = {};
  const byFilmIndustry: Record<string, number> = {};
  const byOttPlatform: Record<string, number> = {};
  const byYoutubeCategory: Record<string, number> = {};
  const byYoutubeChannel: Record<string, number> = {};
  const byTelevisionContentType: Record<string, number> = {};
  const byDemographics = {
    gender: {} as Record<string, number>,
    age: {} as Record<string, number>,
    region: {} as Record<string, number>
  };
  
  filteredVotes.forEach(vote => {
    // Project type
    byProjectType[vote.projectType] = (byProjectType[vote.projectType] || 0) + 1;
    
    // Country
    if (vote.country) {
      byCountry[vote.country] = (byCountry[vote.country] || 0) + 1;
    }
    
    // Genre
    if (vote.genre) {
      byGenre[vote.genre] = (byGenre[vote.genre] || 0) + 1;
    }
    
    // Film Industry
    if (vote.filmIndustry) {
      byFilmIndustry[vote.filmIndustry] = (byFilmIndustry[vote.filmIndustry] || 0) + 1;
    }
    
    // OTT Platform
    if (vote.ottPlatform) {
      byOttPlatform[vote.ottPlatform] = (byOttPlatform[vote.ottPlatform] || 0) + 1;
    }
    
    // YouTube Category
    if (vote.youtubeContentCategory) {
      byYoutubeCategory[vote.youtubeContentCategory] = (byYoutubeCategory[vote.youtubeContentCategory] || 0) + 1;
    }
    
    // YouTube Channel Type
    if (vote.youtubeChannelType) {
      byYoutubeChannel[vote.youtubeChannelType] = (byYoutubeChannel[vote.youtubeChannelType] || 0) + 1;
    }
    
    // Television Content Type
    if (vote.televisionContentType) {
      byTelevisionContentType[vote.televisionContentType] = (byTelevisionContentType[vote.televisionContentType] || 0) + 1;
    }
    
    // Demographics
    if (vote.demographics) {
      if (vote.demographics.gender) {
        byDemographics.gender[vote.demographics.gender] = (byDemographics.gender[vote.demographics.gender] || 0) + 1;
      }
      
      // Handle age - convert number to string if needed
      let ageGroup: string;
      if (typeof vote.demographics.age === 'number') {
        const age = vote.demographics.age;
        if (age >= 13 && age <= 17) ageGroup = '13-17';
        else if (age >= 18 && age <= 24) ageGroup = '18-24';
        else if (age >= 25 && age <= 34) ageGroup = '25-34';
        else if (age >= 35 && age <= 44) ageGroup = '35-44';
        else if (age >= 45 && age <= 54) ageGroup = '45-54';
        else if (age >= 55 && age <= 64) ageGroup = '55-64';
        else if (age >= 65) ageGroup = '65+';
        else ageGroup = 'Unknown';
      } else {
        ageGroup = String(vote.demographics.age || 'Unknown');
      }
      
      byDemographics.age[ageGroup] = (byDemographics.age[ageGroup] || 0) + 1;
      
      if (vote.demographics.region) {
        byDemographics.region[vote.demographics.region] = (byDemographics.region[vote.demographics.region] || 0) + 1;
      }
    }
  });
  
  const stats = {
    total: filteredVotes.length,
    recent: recentVotes.length,
    byProjectType,
    byCountry,
    byGenre,
    byFilmIndustry,
    byOttPlatform,
    byYoutubeCategory,
    byYoutubeChannel,
    byTelevisionContentType,
    byDemographics
  };
  
  console.log('Calculated stats:', stats);
  return stats;
}

function getAgeGroup(age: number): string {
  if (age >= 13 && age <= 17) return '13-17';
  if (age >= 18 && age <= 24) return '18-24';
  if (age >= 25 && age <= 34) return '25-34';
  if (age >= 35 && age <= 44) return '35-44';
  if (age >= 45 && age <= 54) return '45-54';
  if (age >= 55 && age <= 64) return '55-64';
  if (age >= 65) return '65+';
  return 'Unknown';
}

// Add YouTube Content Category Labels
export const YOUTUBE_CONTENT_CATEGORY_LABELS: Record<YouTubeContentCategory, string> = {
  "Comedy": "Comedy",
  "Education": "Education", 
  "Entertainment": "Entertainment",
  "Gaming": "Gaming",
  "Music": "Music",
  "News": "News",
  "Sports": "Sports",
  "Technology": "Technology",
  "Travel": "Travel",
  "Food": "Food",
  "Fashion": "Fashion",
  "Health": "Health",
  "DIY": "DIY",
  "Reviews": "Reviews",
  "Tutorials": "Tutorials",
  "Science": "Science",
  "Art": "Art",
  "Business": "Business",
  "Lifestyle": "Lifestyle",
  "Beauty": "Beauty",
  "Fitness": "Fitness",
  "Politics": "Politics",
  "Documentary": "Documentary",
  "Animation": "Animation",
  "Kids": "Kids",
  "How-to & DIY": "How-to & DIY",
  "Review": "Review",
  "Unboxing": "Unboxing",
  "Vlog": "Vlog",
  "Podcast": "Podcast",
  "Live Streaming": "Live Streaming",
  "Reaction": "Reaction",
  "Challenge": "Challenge",
  "Prank": "Prank",
  "Dance": "Dance",
  "Art & Craft": "Art & Craft",
  "Cooking": "Cooking",
  "Photography": "Photography",
  "Film Making": "Film Making",
  "Music Production": "Music Production",
  "Software Development": "Software Development",
  "Mobile Apps": "Mobile Apps",
  "Web Design": "Web Design",
  "Digital Marketing": "Digital Marketing",
  "Cryptocurrency": "Cryptocurrency",
  "Stock Trading": "Stock Trading",
  "Real Estate": "Real Estate",
  "Personal Finance": "Personal Finance",
  "Self Improvement": "Self Improvement",
  "Meditation": "Meditation",
  "Yoga": "Yoga",
  "Workout": "Workout",
  "Bodybuilding": "Bodybuilding",
  "Weight Loss": "Weight Loss",
  "Nutrition": "Nutrition",
  "Mental Health": "Mental Health",
  "Relationships": "Relationships",
  "Parenting": "Parenting",
  "Pet Care": "Pet Care",
  "Gardening": "Gardening",
  "Home Improvement": "Home Improvement",
  "Car Reviews": "Car Reviews",
  "Motorcycle": "Motorcycle",
  "Aviation": "Aviation",
  "Space": "Space",
  "History": "History",
  "Geography": "Geography",
  "Language Learning": "Language Learning",
  "Mathematics": "Mathematics",
  "Physics": "Physics",
  "Chemistry": "Chemistry",
  "Biology": "Biology",
  "Programming": "Programming",
  "AI & ML": "AI & ML",
  "Cybersecurity": "Cybersecurity",
  "Blockchain": "Blockchain",
  "VR & AR": "VR & AR",
  "3D Modeling": "3D Modeling",
  "Graphic Design": "Graphic Design",
  "Logo Design": "Logo Design",
  "UI/UX Design": "UI/UX Design",
  "Fashion Design": "Fashion Design",
  "Interior Design": "Interior Design",
  "Architecture": "Architecture",
  "Engineering": "Engineering",
  "Medicine": "Medicine",
  "Law": "Law",
  "Economics": "Economics",
  "Philosophy": "Philosophy",
  "Psychology": "Psychology",
  "Sociology": "Sociology",
  "Anthropology": "Anthropology",
  "Religious": "Religious",
  "Spirituality": "Spirituality",
  "True Crime": "True Crime",
  "Mystery": "Mystery",
  "Horror Stories": "Horror Stories",
  "Stand-up Comedy": "Stand-up Comedy",
  "Sketches": "Sketches",
  "Improvisation": "Improvisation",
  "Theater": "Theater",
  "Opera": "Opera",
  "Classical Music": "Classical Music",
  "Jazz": "Jazz",
  "Rock": "Rock",
  "Pop Music": "Pop Music",
  "Hip Hop": "Hip Hop",
  "Electronic Music": "Electronic Music",
  "Country Music": "Country Music",
  "Folk Music": "Folk Music",
  "World Music": "World Music",
  "Instrumental": "Instrumental",
  "Karaoke": "Karaoke",
  "Music Theory": "Music Theory",
  "Singing Lessons": "Singing Lessons",
  "Guitar Lessons": "Guitar Lessons",
  "Piano Lessons": "Piano Lessons",
  "Drum Lessons": "Drum Lessons",
  "Sports Analysis": "Sports Analysis",
  "Cricket": "Cricket",
  "Football": "Football",
  "Basketball": "Basketball",
  "Tennis": "Tennis",
  "Soccer": "Soccer",
  "Baseball": "Baseball",
  "Golf": "Golf",
  "Swimming": "Swimming",
  "Athletics": "Athletics",
  "Olympics": "Olympics",
  "Esports": "Esports",
  "Chess": "Chess",
  "Board Games": "Board Games",
  "Card Games": "Card Games",
  "Puzzle Games": "Puzzle Games",
  "Strategy Games": "Strategy Games",
  "Mobile Gaming": "Mobile Gaming",
  "PC Gaming": "PC Gaming",
  "Console Gaming": "Console Gaming",
  "Game Development": "Game Development",
  "Game Reviews": "Game Reviews",
  "Let's Play": "Let's Play",
  "Speed Running": "Speed Running",
  "Game Streaming": "Game Streaming",
  "Recipe": "Recipe",
  "Restaurant Reviews": "Restaurant Reviews",
  "Culture": "Culture",
  "Adventure": "Adventure",
  "Shopping": "Shopping",
  "Style Tips": "Style Tips",
  "Woodworking": "Woodworking",
  "Crafting": "Crafting",
  "Entrepreneurship": "Entrepreneurship",
  "Analysis": "Analysis",
  "Daily Life": "Daily Life",
  "Personal Stories": "Personal Stories"
};

export async function saveVoteToBackend(vote: Vote) {
  try {
    console.log('Attempting to save vote to backend:', vote);
    
    const response = await fetch('/api/opinions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...vote,
        category: determineCategory(vote.projectType),
        question: `What's your preference for ${vote.projectType}?`,
        answer: generateAnswerFromVote(vote)
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Backend save successful:', result);
    return result;
  } catch (error) {
    console.error('Backend save failed:', error);
    // Don't throw error, let it fallback to local storage
    throw error;
  }
}

function determineCategory(projectType: ProjectType): string {
  switch (projectType) {
    case 'Television':
      return 'television';
    case 'OTTPlatform':
      return 'streaming';
    case 'YouTubeContent':
    case 'YouTubeFilm':
      return 'youtube';
    default:
      return 'film';
  }
}

function generateAnswerFromVote(vote: Vote): string {
  const parts = [];
  
  if (vote.country) parts.push(`Country: ${vote.country}`);
  if (vote.filmIndustry) parts.push(`Film Industry: ${vote.filmIndustry}`);
  if (vote.filmProjectType) parts.push(`Film Type: ${vote.filmProjectType}`);
  if (vote.genre) parts.push(`Genre: ${vote.genre}`);
  if (vote.ottPlatform) parts.push(`OTT Platform: ${vote.ottPlatform}`);
  if (vote.televisionChannel) parts.push(`TV Channel: ${vote.televisionChannel}`);
  if (vote.televisionContentType) parts.push(`Content Type: ${vote.televisionContentType}`);
  if (vote.youtubeContentCategory) parts.push(`YouTube Category: ${vote.youtubeContentCategory}`);
  if (vote.notes) parts.push(`Notes: ${vote.notes}`);
  
  return parts.join(', ') || 'User preference submitted';
}

export function saveVotingPeriod(period: VotingPeriod): VotingPeriod {
  if (typeof window === 'undefined') return period;
  
  try {
    localStorage.setItem('moviepulse-voting-period', JSON.stringify(period));
    return period;
  } catch (error) {
    console.error('Failed to save voting period:', error);
    return period;
  }
}

// Legacy compatibility functions
export function getCountsByIndustry(industry: FilmIndustry): Record<string, number> {
  const votes = getVotes();
  const counts: Record<string, number> = {};
  
  GENRES.forEach(genre => {
    counts[genre] = votes.filter(vote => 
      vote.filmIndustry === industry && vote.genre === genre
    ).length;
  });
  
  return counts;
}

export function getCountsByProjectType(projectType: ProjectType): Record<string, number> {
  const votes = getVotes();
  const counts: Record<string, number> = {};
  
  GENRES.forEach(genre => {
    counts[genre] = votes.filter(vote => 
      vote.projectType === projectType && vote.genre === genre
    ).length;
  });
  
  return counts;
}

export function getCountsByCountry(country: Country): Record<string, number> {
  const votes = getVotes();
  const counts: Record<string, number> = {};
  
  GENRES.forEach(genre => {
    counts[genre] = votes.filter(vote => 
      vote.country === country && vote.genre === genre
    ).length;
  });
  
  return counts;
}

export function getCountsByOTTPlatform(platform: OTTPlatform): Record<string, number> {
  const votes = getVotes();
  const counts: Record<string, number> = {};
  
  GENRES.forEach(genre => {
    counts[genre] = votes.filter(vote => 
      vote.ottPlatform === platform && vote.genre === genre
    ).length;
  });
  
  return counts;
}

export function getCountsByYoutubeSection(section: string): Record<string, number> {
  const votes = getVotes();
  const counts: Record<string, number> = {};
  
  YOUTUBE_CONTENT_CATEGORIES.forEach(category => {
    counts[category] = votes.filter(vote => 
      vote.projectType === "YouTubeContent" && vote.youtubeContentCategory === category
    ).length;
  });
  
  return counts;
}

export function getCountsByYoutubeContentCategory(category: YouTubeContentCategory): Record<string, number> {
  const votes = getVotes();
  const counts: Record<string, number> = {};
  
  YOUTUBE_CHANNEL_TYPES.forEach(channelType => {
    counts[channelType] = votes.filter(vote => 
      vote.youtubeContentCategory === category && vote.youtubeChannelType === channelType
    ).length;
  });
  
  return counts;
}

export const OTT_GENRES: Genre[] = GENRES;
