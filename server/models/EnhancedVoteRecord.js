
const mongoose = require('mongoose');

const EnhancedVoteRecordSchema = new mongoose.Schema({
  // Primary fingerprints
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
  
  // Enhanced fingerprint set for comprehensive tracking
  enhancedFingerprints: {
    primary: { type: String, required: true, index: true },
    device: { type: String, required: true, index: true },
    network: { type: String, required: true, index: true },
    browser: { type: String, required: true, index: true },
    composite: { type: String, required: true, index: true }
  },
  
  // Voting token for additional security
  votingToken: {
    type: String,
    required: true,
    unique: true,
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
  
  // Enhanced network tracking
  networkInfo: {
    ipAddress: { type: String, required: true, index: true },
    ipHash: { type: String, index: true }, // Hashed IP for privacy
    userAgent: String,
    acceptLanguage: String,
    acceptEncoding: String,
    connection: String,
    proxyHeaders: [String]
  },
  
  // Enhanced device tracking
  deviceInfo: {
    browser: String,
    os: String,
    platform: String,
    device: {
      type: String,
      enum: ['mobile', 'desktop', 'tablet', 'unknown']
    },
    screenResolution: String,
    timezone: String,
    colorDepth: Number,
    deviceMemory: Number,
    hardwareConcurrency: Number,
    canvasFingerprint: String,
    webglFingerprint: String
  },
  
  // Session and tracking
  sessionId: {
    type: String,
    index: true
  },
  votingPeriodId: {
    type: String,
    required: true,
    index: true
  },
  
  // Enhanced geolocation (optional, privacy-respecting)
  location: {
    country: String,
    region: String,
    city: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    },
    accuracy: String // low, medium, high
  },
  
  // Security and validation
  securityChecks: {
    fingerprintValid: { type: Boolean, default: true },
    rateLimitPassed: { type: Boolean, default: true },
    duplicateCheck: { type: Boolean, default: true },
    spamCheck: { type: Boolean, default: true },
    tokenValid: { type: Boolean, default: true },
    consistencyCheck: { type: Boolean, default: true }
  },
  
  // Risk assessment
  riskScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  
  riskFactors: [String],
  
  // Enhanced metadata
  metadata: {
    submissionTime: { 
      type: Date, 
      default: Date.now 
    },
    processingTime: Number,
    validationDuration: Number,
    fingerprintGenerationTime: Number,
    source: {
      type: String,
      enum: ['web', 'mobile', 'api', 'unknown'],
      default: 'web'
    },
    version: {
      type: String,
      default: '2.0'
    }
  },
  
  // Status and lifecycle
  status: {
    type: String,
    enum: ['active', 'flagged', 'suspicious', 'expired', 'deleted', 'verified'],
    default: 'active',
    index: true
  },
  
  flags: [String],
  
  // Admin actions
  adminActions: [{
    action: String,
    reason: String,
    timestamp: { type: Date, default: Date.now },
    adminId: String
  }],
  
  // Timestamps with automatic expiry
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 * 180, // Auto-delete after 180 days
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Comprehensive indexes for efficient querying
EnhancedVoteRecordSchema.index({ 'enhancedFingerprints.primary': 1, projectType: 1 }, { unique: true });
EnhancedVoteRecordSchema.index({ 'enhancedFingerprints.device': 1, projectType: 1 });
EnhancedVoteRecordSchema.index({ 'enhancedFingerprints.network': 1, projectType: 1 });
EnhancedVoteRecordSchema.index({ 'enhancedFingerprints.composite': 1, createdAt: -1 });
EnhancedVoteRecordSchema.index({ votingToken: 1 }, { unique: true });
EnhancedVoteRecordSchema.index({ votingPeriodId: 1, projectType: 1, status: 1 });
EnhancedVoteRecordSchema.index({ 'networkInfo.ipHash': 1, createdAt: -1 });
EnhancedVoteRecordSchema.index({ riskScore: -1, status: 1 });
EnhancedVoteRecordSchema.index({ 'metadata.source': 1, projectType: 1 });

// Compound indexes for complex queries
EnhancedVoteRecordSchema.index({ 
  projectType: 1, 
  status: 1, 
  'enhancedFingerprints.primary': 1,
  createdAt: -1 
});

// Pre-save middleware
EnhancedVoteRecordSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  
  // Calculate risk score based on various factors
  this.riskScore = this.calculateRiskScore();
  
  next();
});

// Instance methods
EnhancedVoteRecordSchema.methods.calculateRiskScore = function() {
  let score = 0;
  
  // Check validation failures
  Object.values(this.securityChecks).forEach(check => {
    if (!check) score += 20;
  });
  
  // Check for suspicious patterns
  if (this.riskFactors.length > 0) {
    score += this.riskFactors.length * 10;
  }
  
  // Check for rapid submissions
  if (this.metadata.processingTime && this.metadata.processingTime < 1000) {
    score += 15;
  }
  
  return Math.min(score, 100);
};

EnhancedVoteRecordSchema.methods.flagAsSuspicious = function(reason) {
  this.status = 'suspicious';
  this.riskFactors.push(reason);
  this.flags.push(`suspicious_${Date.now()}`);
  return this.save();
};

// Static methods for enhanced duplicate detection
EnhancedVoteRecordSchema.statics.findEnhancedDuplicates = function(fingerprintSet, projectType) {
  return this.find({
    $or: [
      { 'enhancedFingerprints.primary': fingerprintSet.primary, projectType },
      { 'enhancedFingerprints.device': fingerprintSet.device, projectType },
      { 'enhancedFingerprints.network': fingerprintSet.network, projectType },
      { 'enhancedFingerprints.composite': fingerprintSet.composite, projectType }
    ],
    status: { $in: ['active', 'verified'] }
  }).sort({ createdAt: -1 });
};

EnhancedVoteRecordSchema.statics.checkTokenUsage = function(votingToken) {
  return this.findOne({ votingToken, status: { $ne: 'deleted' } });
};

EnhancedVoteRecordSchema.statics.getSuspiciousActivity = function(timeWindow = 24 * 60 * 60 * 1000) {
  const since = new Date(Date.now() - timeWindow);
  return this.find({
    $or: [
      { riskScore: { $gte: 50 } },
      { status: 'suspicious' },
      { flags: { $exists: true, $not: { $size: 0 } } }
    ],
    createdAt: { $gte: since }
  }).sort({ riskScore: -1, createdAt: -1 });
};

module.exports = mongoose.model('EnhancedVoteRecord', EnhancedVoteRecordSchema);
