
const mongoose = require('mongoose');

const OpinionSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['film', 'television', 'youtube', 'streaming']
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
  demographics: {
    age: Number,
    region: String,
    gender: String
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
  tags: [String]
});

// Add index for faster querying
OpinionSchema.index({ category: 1, createdAt: -1 });
OpinionSchema.index({ 'demographics.region': 1 });

module.exports = mongoose.model('Opinion', OpinionSchema);
