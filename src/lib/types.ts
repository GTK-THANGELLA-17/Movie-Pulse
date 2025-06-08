export type FilmIndustry = "Bollywood" | "Hollywood" | "Tollywood" | "Kollywood" | "Mollywood" | "Sandalwood" | "Bhojpuri" | "Punjabi" | "Marathi" | "Bengali" | "Gujarati" | "Assamese" | "Odia" | "Other";

export type Genre = "Action" | "Comedy" | "Drama" | "Horror" | "Romance" | "Thriller" | "Sci-Fi" | "Fantasy" | "Adventure" | "Crime" | "Mystery" | "Documentary" | "Animation" | "Musical" | "War" | "Western" | "Biography" | "History" | "Sport" | "Family";

export type ProjectType = "Films" | "YouTubeFilm" | "YouTubeContent" | "OTTPlatform" | "Television";

export type FilmProjectType = "HighBudgetFilm" | "LowBudgetFilm" | "ShortFilm";

export type Country = "India" | "USA" | "UK" | "Canada" | "Australia" | "Germany" | "France" | "Japan" | "South Korea" | "China" | "Brazil" | "Mexico" | "Argentina" | "Italy" | "Spain" | "Russia" | "Turkey" | "Egypt" | "Nigeria" | "South Africa" | "Other";

export type OTTPlatform = "Netflix" | "Amazon Prime Video" | "Disney+ Hotstar" | "YouTube Premium" | "SonyLIV" | "ZEE5" | "Voot" | "MX Player" | "Alt Balaji" | "Eros Now" | "Hulu" | "HBO Max" | "Apple TV+" | "Paramount+" | "Peacock" | "Other";

export type YouTubeChannelType = "Entertainment" | "Educational" | "Gaming" | "Tech Reviews" | "Lifestyle" | "Music" | "Comedy" | "News" | "Sports" | "Cooking" | "Travel" | "Fashion" | "DIY/Crafts" | "Business" | "Health & Fitness" | "Science" | "Art & Design" | "Movie Reviews" | "Vlogs" | "Other";

export type YouTubeContentCategory = 
  | "Comedy" | "Education" | "Entertainment" | "Gaming" | "Music" | "News" | "Sports" 
  | "Technology" | "Travel" | "Food" | "Fashion" | "Health" | "DIY" | "Reviews" 
  | "Tutorials" | "Science" | "Art" | "Business" | "Lifestyle" | "Beauty" | "Fitness"
  | "Politics" | "Documentary" | "Animation" | "Kids" | "How-to & DIY" | "Review"
  | "Unboxing" | "Vlog" | "Podcast" | "Live Streaming" | "Reaction" | "Challenge"
  | "Prank" | "Dance" | "Art & Craft" | "Cooking" | "Photography" | "Film Making"
  | "Music Production" | "Software Development" | "Mobile Apps" | "Web Design"
  | "Digital Marketing" | "Cryptocurrency" | "Stock Trading" | "Real Estate"
  | "Personal Finance" | "Self Improvement" | "Meditation" | "Yoga" | "Workout"
  | "Bodybuilding" | "Weight Loss" | "Nutrition" | "Mental Health" | "Relationships"
  | "Parenting" | "Pet Care" | "Gardening" | "Home Improvement" | "Car Reviews"
  | "Motorcycle" | "Aviation" | "Space" | "History" | "Geography" | "Language Learning"
  | "Mathematics" | "Physics" | "Chemistry" | "Biology" | "Programming" | "AI & ML"
  | "Cybersecurity" | "Blockchain" | "VR & AR" | "3D Modeling" | "Graphic Design"
  | "Logo Design" | "UI/UX Design" | "Fashion Design" | "Interior Design"
  | "Architecture" | "Engineering" | "Medicine" | "Law" | "Economics" | "Philosophy"
  | "Psychology" | "Sociology" | "Anthropology" | "Religious" | "Spirituality"
  | "True Crime" | "Mystery" | "Horror Stories" | "Stand-up Comedy" | "Sketches"
  | "Improvisation" | "Theater" | "Opera" | "Classical Music" | "Jazz" | "Rock"
  | "Pop Music" | "Hip Hop" | "Electronic Music" | "Country Music" | "Folk Music"
  | "World Music" | "Instrumental" | "Karaoke" | "Music Theory" | "Singing Lessons"
  | "Guitar Lessons" | "Piano Lessons" | "Drum Lessons" | "Sports Analysis"
  | "Cricket" | "Football" | "Basketball" | "Tennis" | "Soccer" | "Baseball"
  | "Golf" | "Swimming" | "Athletics" | "Olympics" | "Esports" | "Chess"
  | "Board Games" | "Card Games" | "Puzzle Games" | "Strategy Games"
  | "Mobile Gaming" | "PC Gaming" | "Console Gaming" | "Game Development"
  | "Game Reviews" | "Let's Play" | "Speed Running" | "Game Streaming"
  | "Recipe" | "Restaurant Reviews" | "Culture" | "Adventure" | "Shopping"
  | "Style Tips" | "Woodworking" | "Crafting" | "Entrepreneurship" | "Analysis"
  | "Daily Life" | "Personal Stories";

export type TelevisionChannel = string;
export type TelevisionContentType = "News" | "Entertainment" | "Sports" | "Educational" | "Documentary" | "Movies" | "Series" | "Reality Shows" | "Talk Shows" | "Cartoons" | "Music" | "Religious" | "Regional" | "Other";

export interface Vote {
  id: string;
  projectType: ProjectType;
  filmProjectType?: FilmProjectType;
  filmIndustry?: FilmIndustry;
  genre?: Genre;
  country: Country;
  ottPlatform?: OTTPlatform;
  youtubeContentCategory?: YouTubeContentCategory;
  youtubeChannelType?: YouTubeChannelType;
  televisionChannel?: TelevisionChannel;
  televisionContentType?: TelevisionContentType;
  notes?: string;
  demographics: {
    gender?: string;
    age?: number;
    region?: string;
  };
  timestamp: string;
  userId: string;
}

export interface VotedStatus {
  hasVotedInFilm: boolean;
  hasVotedInYoutubeFilm: boolean;
  hasVotedInYoutubeContent: boolean;
  hasVotedInOtt: boolean;
  hasVotedInTelevision: boolean;
}

export interface VotingPeriod {
  isActive: boolean;
  startDate: string;
  endDate: string;
}
