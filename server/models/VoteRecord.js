
const mongoose = require('mongoose');

const VoteRecordSchema = new mongoose.Schema({
  fingerprint: {
    type: String,
    required: true,
    index: true
  },
  serverFingerprint: {
    type: String,
    required: true,
    index: true
  },
  projectType: {
    type: String,
    required: true,
    enum: ['HighBudgetFilm', 'LowBudgetFilm', 'ShortFilm', 'YouTubeFilm', 'YouTubeContent', 'OTTPlatform', 'Television', 'InstagramContent'],
    index: true
  },
  opinionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Opinion',
    required: true
  },
  // Enhanced tracking fields
  ipAddress: {
    type: String,
    index: true
  },
  userAgent: String,
  sessionId: {
    type: String,
    index: true
  },
  votingPeriodId: {
    type: String,
    default: () => new Date().toISOString().split('T')[0],
    index: true
  },
  // Enhanced device info
  deviceInfo: {
    browser: String,
    os: String,
    device: {
      type: String,
      enum: ['mobile', 'desktop', 'tablet']
    },
    screenResolution: String,
    timezone: String
  },
  // Enhanced geolocation (optional)
  location: {
    country: String,
    region: String,
    city: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  // Enhanced metadata
  metadata: {
    submissionTime: { 
      type: Date, 
      default: Date.now 
    },
    processingTime: Number,
    validationChecks: {
      fingerprintValid: { type: Boolean, default: true },
      rateLimitPassed: { type: Boolean, default: true },
      duplicateCheck: { type: Boolean, default: true },
      spamCheck: { type: Boolean, default: true }
    },
    flags: [String],
    source: {
      type: String,
      enum: ['web', 'mobile', 'api'],
      default: 'web'
    }
  },
  // Status tracking
  status: {
    type: String,
    enum: ['active', 'flagged', 'expired', 'deleted'],
    default: 'active'
  },
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 * 90, // Auto-delete after 90 days
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Enhanced compound indexes for efficient querying
VoteRecordSchema.index({ fingerprint: 1, projectType: 1 }, { unique: true });
VoteRecordSchema.index({ serverFingerprint: 1, projectType: 1 });
VoteRecordSchema.index({ fingerprint: 1, createdAt: -1 });
VoteRecordSchema.index({ votingPeriodId: 1, projectType: 1 });
VoteRecordSchema.index({ ipAddress: 1, createdAt: -1 });
VoteRecordSchema.index({ sessionId: 1, status: 1 });
VoteRecordSchema.index({ 'metadata.source': 1, projectType: 1 });

// Pre-save middleware
VoteRecordSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Static methods
VoteRecordSchema.statics.findDuplicates = function(fingerprint, projectType) {
  return this.find({
    $or: [
      { fingerprint, projectType },
      { serverFingerprint: fingerprint, projectType }
    ],
    status: 'active'
  }).sort({ createdAt: -1 });
};

VoteRecordSchema.statics.checkRateLimit = function(fingerprint, timeWindow = 60000, maxVotes = 5) {
  const since = new Date(Date.now() - timeWindow);
  return this.countDocuments({
    $or: [
      { fingerprint },
      { serverFingerprint: fingerprint }
    ],
    createdAt: { $gte: since },
    status: 'active'
  }).then(count => count >= maxVotes);
};

module.exports = mongoose.model('VoteRecord', VoteRecordSchema);
