
const mongoose = require('mongoose');

const UserEngagementSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  sessionId: String,
  activity: {
    type: String,
    required: true,
    enum: ['vote', 'view-exclusive', 'view-insight', 'participate-poll', 'share-content']
  },
  category: String,
  contentId: String,
  metadata: {
    votingStreak: { type: Number, default: 0 },
    categoriesVoted: [String],
    lastVoteDate: Date,
    preferences: {
      genres: [String],
      industries: [String],
      platforms: [String]
    }
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

UserEngagementSchema.index({ userId: 1, timestamp: -1 });
UserEngagementSchema.index({ activity: 1, timestamp: -1 });

module.exports = mongoose.model('UserEngagement', UserEngagementSchema);
