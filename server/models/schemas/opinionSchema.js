const mongoose = require('mongoose');

const opinionSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['film', 'television', 'youtube', 'streaming', 'instagram']
  },
  projectType: {
    type: String,
    required: true,
    enum: ['HighBudgetFilm', 'LowBudgetFilm', 'ShortFilm', 'YouTubeFilm', 'YouTubeContent', 'OTTPlatform', 'Television', 'InstagramContent']
  },
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true,
    index: true
  },
  // Enhanced TV-specific fields
  televisionChannel: {
    type: String,
    index: true
  },
  televisionContentType: {
    type: String,
    enum: ['Drama', 'Comedy', 'News', 'Sports', 'Reality TV', 'Documentary', 'Kids', 'Music', 'Talk Show', 'Game Show', 'Educational', 'Religious', 'Shopping', 'Movies', 'Series', 'Live Events']
  },
  // Enhanced OTT-specific fields
  ottPlatform: {
    type: String,
    enum: ['Netflix', 'Amazon Prime Video', 'Disney+ Hotstar', 'Hulu', 'HBO Max', 'Apple TV+', 'Paramount+', 'Discovery+', 'Peacock', 'ESPN+', 'YouTube Premium', 'Crunchyroll', 'Other'],
    index: true
  },
  // Enhanced YouTube-specific fields
  youtubeContentCategory: {
    type: String,
    enum: ['Entertainment', 'Music', 'Gaming', 'Education', 'News & Politics', 'Sports', 'Comedy', 'Technology', 'Lifestyle', 'Travel', 'Food', 'Health & Fitness', 'DIY & Crafts', 'Fashion & Beauty', 'Science & Nature', 'Business', 'Art & Culture', 'Kids & Family', 'Documentary', 'Reviews', 'Tutorials', 'Vlogs', 'Live Streaming', 'Shorts', 'Other'],
    index: true
  },
  youtubeSection: String,
  // Enhanced Instagram-specific fields
  instagramContentType: {
    type: String,
    enum: ['Photos', 'Stories', 'Reels', 'IGTV', 'Live', 'Shopping', 'Guides']
  },
  // Enhanced common fields
  filmIndustry: {
    type: String,
    enum: ['Hollywood', 'Bollywood', 'Tollywood (Telugu)', 'Kollywood (Tamil)', 'Mollywood (Malayalam)', 'Sandalwood (Kannada)', 'Ollywood (Odia)', 'Bengali Cinema', 'Marathi Cinema', 'Punjabi Cinema', 'Gujarati Cinema', 'Regional Indian Cinema', 'European Cinema', 'East Asian Cinema', 'Latin American Cinema', 'African Cinema', 'Middle Eastern Cinema', 'Independent Films', 'Other'],
    index: true
  },
  genre: { type: String },
  youtubeChannelType: { type: String },
  instagramProfileType: { type: String },
  instagramContentType: { type: String },
  ottSeriesType: { type: String },
  televisionContentType: { type: String },
  country: {
    type: String,
    enum: ['India', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'South Korea', 'China', 'Brazil', 'Mexico', 'Argentina', 'Spain', 'Italy', 'Russia', 'Turkey', 'Egypt', 'South Africa', 'Nigeria', 'Kenya', 'Morocco', 'Israel', 'UAE', 'Saudi Arabia', 'Thailand', 'Indonesia', 'Malaysia', 'Singapore', 'Philippines', 'Vietnam', 'Pakistan', 'Bangladesh', 'Sri Lanka', 'Nepal', 'Other'],
    required: true,
    index: true
  },
  notes: String,
  // Enhanced demographics
  demographics: {
    age: {
      type: String,
      enum: ['Under 18', '18-24', '25-34', '35-44', '45-54', '55-64', '65+']
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Non-binary', 'Prefer not to say']
    },
    region: {
      type: String,
      index: true
    }
  },
  // Enhanced analytics fields
  sentiment: {
    type: String,
    enum: ['positive', 'neutral', 'negative'],
    default: 'neutral',
    index: true
  },
  impact: {
    type: Number,
    default: 1,
    min: 1,
    max: 10
  },
  // Enhanced tracking
  deviceInfo: {
    browser: String,
    os: String,
    device: String,
    screenResolution: String,
    timezone: String
  },
  sessionId: String,
  votingPeriodId: String,
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  // Enhanced metadata
  tags: [String],
  source: {
    type: String,
    enum: ['web', 'mobile', 'api'],
    default: 'web'
  },
  version: {
    type: String,
    default: '2.0'
  }
});

module.exports = opinionSchema;
