
const mongoose = require('mongoose');

const TrendingInsightSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  insightType: {
    type: String,
    required: true,
    enum: ['trending-up', 'trending-down', 'regional-preference', 'demographic-shift', 'emerging-genre', 'surprise-hit']
  },
  category: String,
  genre: String,
  country: String,
  demographics: {
    age: String,
    gender: String,
    region: String
  },
  data: {
    percentage: Number,
    comparisonValue: Number,
    timeframe: String,
    sampleSize: Number
  },
  isActive: {
    type: Boolean,
    default: true
  },
  priority: {
    type: Number,
    default: 1,
    min: 1,
    max: 10
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  }
});

TrendingInsightSchema.index({ isActive: 1, priority: -1, createdAt: -1 });
TrendingInsightSchema.index({ category: 1, genre: 1 });
TrendingInsightSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('TrendingInsight', TrendingInsightSchema);
