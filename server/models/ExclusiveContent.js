
const mongoose = require('mongoose');

const ExclusiveContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    required: true,
    enum: ['trailer', 'teaser', 'behind-the-scenes', 'poll', 'first-look', 'insider-news']
  },
  category: {
    type: String,
    required: true,
    enum: ['Films', 'YouTubeFilm', 'YouTubeContent', 'OTTPlatform', 'Television', 'InstagramContent']
  },
  mediaUrl: String,
  thumbnailUrl: String,
  genre: String,
  filmIndustry: String,
  country: String,
  releaseDate: Date,
  isActive: {
    type: Boolean,
    default: true
  },
  viewCount: {
    type: Number,
    default: 0
  },
  requiredVotes: {
    type: Number,
    default: 1,
    min: 1
  },
  tags: [String],
  metadata: {
    duration: String,
    quality: String,
    language: String,
    production: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: Date
});

// Indexes for performance
ExclusiveContentSchema.index({ category: 1, isActive: 1 });
ExclusiveContentSchema.index({ contentType: 1, createdAt: -1 });
ExclusiveContentSchema.index({ genre: 1, filmIndustry: 1 });
ExclusiveContentSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('ExclusiveContent', ExclusiveContentSchema);
