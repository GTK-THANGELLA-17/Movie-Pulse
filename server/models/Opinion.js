
const mongoose = require('mongoose');

const OpinionSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['film', 'television', 'youtube', 'streaming']
  },
  projectType: {
    type: String,
    required: true,
    enum: ['HighBudgetFilm', 'LowBudgetFilm', 'ShortFilm', 'YouTubeFilm', 'YouTubeContent', 'OTTPlatform', 'Television']
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
    required: true
  },
  // TV-specific fields
  televisionChannel: String,
  televisionContentType: String,
  // OTT-specific fields
  ottPlatform: String,
  // YouTube-specific fields
  youtubeContentCategory: String,
  youtubeSection: String,
  // Common fields
  filmIndustry: String,
  genre: String,
  country: String,
  notes: String,
  demographics: {
    age: String,
    gender: String,
    region: String
  },
  sentiment: {
    type: String,
    enum: ['positive', 'neutral', 'negative'],
    default: 'neutral'
  },
  impact: {
    type: Number,
    default: 1,
    min: 1,
    max: 10
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  tags: [String]
});

// Add indexes for faster querying
OpinionSchema.index({ category: 1, createdAt: -1 });
OpinionSchema.index({ userId: 1, projectType: 1 });
OpinionSchema.index({ 'demographics.region': 1 });
OpinionSchema.index({ 'demographics.gender': 1 });
OpinionSchema.index({ 'demographics.age': 1 });
OpinionSchema.index({ televisionChannel: 1, televisionContentType: 1 });
OpinionSchema.index({ ottPlatform: 1 });
OpinionSchema.index({ youtubeContentCategory: 1 });

module.exports = mongoose.model('Opinion', OpinionSchema);
