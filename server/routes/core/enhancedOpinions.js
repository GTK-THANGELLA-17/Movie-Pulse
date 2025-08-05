
const express = require('express');
const router = express.Router();
const Opinion = require('../../models/Opinion');
const EnhancedVoteRecord = require('../../models/EnhancedVoteRecord');
const EnhancedFingerprinting = require('../../utils/enhancedFingerprinting');
const OpinionValidation = require('./opinionValidation');
const EnhancedDuplicateChecker = require('./enhancedDuplicateChecker');
const VoteChecker = require('./voteChecker');
const EnhancedOpinionCreator = require('./enhancedOpinionCreator');

// Enhanced vote checking with comprehensive fingerprint validation
router.get('/user-voted/:userId/:section', async (req, res) => {
  try {
    const { userId, section } = req.params;
    
    // Generate enhanced fingerprints for current request
    const fingerprintSet = EnhancedFingerprinting.generateFingerprintSet(req, {});
    
    // Check both legacy and enhanced systems
    const result = await VoteChecker.checkVoteStatus(userId, section, req);
    
    // Also check enhanced vote records
    const enhancedCheck = await EnhancedVoteRecord.findEnhancedDuplicates(fingerprintSet, section);
    
    if (enhancedCheck.length > 0) {
      result.hasVoted = true;
      result.enhancedTracking = true;
      result.voteRecord = enhancedCheck[0];
    }
    
    res.json(result);
  } catch (err) {
    console.error('Error checking enhanced vote status:', err);
    res.status(500).json({ message: err.message });
  }
});

// Enhanced opinion submission with comprehensive security
router.post('/', async (req, res) => {
  const submissionStartTime = Date.now();
  
  try {
    console.log('📝 Enhanced opinion submission v2.0 started');
    console.log('📊 Request data:', { 
      projectType: req.body.projectType,
      userId: req.body.userId?.substring(0, 10) + '...',
      hasDeviceInfo: !!req.body.deviceInfo
    });
    
    const clientFingerprint = req.body.userId;
    
    // Generate comprehensive fingerprint set
    const fingerprintGenerationStart = Date.now();
    const fingerprintSet = EnhancedFingerprinting.generateFingerprintSet(req, req.body.deviceInfo || {});
    const fingerprintGenerationTime = Date.now() - fingerprintGenerationStart;
    
    console.log('🔐 Enhanced fingerprints generated:', {
      primary: fingerprintSet.primary.substring(0, 10) + '...',
      device: fingerprintSet.device.substring(0, 10) + '...',
      network: fingerprintSet.network.substring(0, 10) + '...',
      generationTime: fingerprintGenerationTime + 'ms'
    });
    
    // Generate voting token
    const votingToken = EnhancedFingerprinting.generateVotingToken(
      fingerprintSet, 
      req.body.projectType, 
      req.body.votingPeriodId || new Date().toISOString().split('T')[0]
    );
    
    // Basic validation
    const fieldErrors = OpinionValidation.validateRequiredFields(req.body);
    if (fieldErrors.length > 0) {
      return res.status(400).json({ 
        message: fieldErrors[0],
        errorType: 'validation',
        submissionId: votingToken.substring(0, 8)
      });
    }
    
    // Enhanced fingerprint validation
    try {
      if (!EnhancedFingerprinting.validateFingerprintSet(fingerprintSet, req)) {
        return res.status(400).json({ 
          message: "Invalid device fingerprint detected. Please try refreshing the page.",
          errorType: 'fingerprint',
          submissionId: votingToken.substring(0, 8)
        });
      }
    } catch (error) {
      return res.status(400).json({ 
        message: error.message,
        errorType: 'fingerprint_validation',
        submissionId: votingToken.substring(0, 8)
      });
    }
    
    // Enhanced rate limiting
    try {
      const rateLimitResult = await EnhancedFingerprinting.checkAdvancedRateLimit(
        EnhancedVoteRecord, 
        fingerprintSet
      );
      
      if (rateLimitResult.isLimited) {
        return res.status(429).json({ 
          message: `Rate limit exceeded. Please wait ${rateLimitResult.retryAfter} seconds before voting again.`,
          errorType: 'rate_limit',
          retryAfter: rateLimitResult.retryAfter,
          window: rateLimitResult.window,
          submissionId: votingToken.substring(0, 8)
        });
      }
    } catch (error) {
      console.warn('Rate limit check failed:', error);
      // Continue with submission but log the error
    }

    // Comprehensive duplicate checking
    const duplicateCheck = await EnhancedDuplicateChecker.checkComprehensiveDuplicates(
      fingerprintSet, 
      req.body.projectType,
      votingToken
    );
    
    if (duplicateCheck.isDuplicate) {
      return res.status(400).json({
        ...duplicateCheck,
        submissionId: votingToken.substring(0, 8),
        errorType: 'duplicate'
      });
    }

    // Validate project-specific requirements
    try {
      OpinionValidation.validateProjectFields(req.body);
    } catch (error) {
      return res.status(400).json({ 
        message: error.message,
        errorType: 'project_validation',
        submissionId: votingToken.substring(0, 8)
      });
    }
    
    // Create opinion and enhanced vote record
    const savedOpinion = await EnhancedOpinionCreator.createOpinion({
      ...req.body,
      fingerprintGenerationTime
    });
    
    const enhancedVoteRecord = await EnhancedOpinionCreator.createEnhancedVoteRecord(
      savedOpinion, 
      fingerprintSet,
      votingToken,
      req.body, 
      req
    );
    
    const totalProcessingTime = Date.now() - submissionStartTime;
    
    console.log('✅ Enhanced opinion and vote record saved successfully');
    console.log('⏱️ Total processing time:', totalProcessingTime + 'ms');
    
    res.status(201).json({
      opinion: savedOpinion,
      voteRecord: enhancedVoteRecord._id,
      votingToken: votingToken.substring(0, 8) + '...', // Partial token for client reference
      preventionActive: true,
      enhancedTracking: true,
      riskScore: enhancedVoteRecord.riskScore,
      processingTime: totalProcessingTime,
      message: 'Opinion submitted successfully with enhanced security tracking'
    });
    
  } catch (err) {
    console.error('❌ Error in enhanced opinion submission:', err);
    res.status(400).json({ 
      message: err.message,
      errorType: 'server_error',
      processingTime: Date.now() - submissionStartTime,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined 
    });
  }
});

// Get enhanced analytics and statistics
router.get('/enhanced-stats/:projectType?', async (req, res) => {
  try {
    const { projectType } = req.params;
    const { timeframe = '24h', includeRisk = 'false' } = req.query;
    
    const matchStage = projectType ? { projectType } : {};
    
    // Calculate time window
    let timeWindow;
    switch (timeframe) {
      case '1h': timeWindow = 60 * 60 * 1000; break;
      case '24h': timeWindow = 24 * 60 * 60 * 1000; break;
      case '7d': timeWindow = 7 * 24 * 60 * 60 * 1000; break;
      case '30d': timeWindow = 30 * 24 * 60 * 60 * 1000; break;
      default: timeWindow = 24 * 60 * 60 * 1000;
    }
    
    const since = new Date(Date.now() - timeWindow);
    matchStage.createdAt = { $gte: since };
    
    const stats = await EnhancedVoteRecord.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: '$projectType',
          totalVotes: { $sum: 1 },
          activeVotes: {
            $sum: {
              $cond: [{ $eq: ['$status', 'active'] }, 1, 0]
            }
          },
          flaggedVotes: {
            $sum: {
              $cond: [{ $eq: ['$status', 'flagged'] }, 1, 0]
            }
          },
          suspiciousVotes: {
            $sum: {
              $cond: [{ $eq: ['$status', 'suspicious'] }, 1, 0]
            }
          },
          averageRiskScore: { $avg: '$riskScore' },
          maxRiskScore: { $max: '$riskScore' },
          averageProcessingTime: { $avg: '$metadata.processingTime' },
          deviceTypes: { $addToSet: '$deviceInfo.device' },
          sources: { $addToSet: '$metadata.source' }
        }
      },
      { $sort: { totalVotes: -1 } }
    ]);
    
    let suspiciousActivity = [];
    if (includeRisk === 'true') {
      suspiciousActivity = await EnhancedVoteRecord.getSuspiciousActivity(timeWindow);
    }
    
    res.json({
      stats,
      suspiciousActivity: includeRisk === 'true' ? suspiciousActivity : [],
      timeframe,
      generatedAt: new Date().toISOString(),
      enhancedTracking: true
    });
    
  } catch (err) {
    console.error('Error fetching enhanced stats:', err);
    res.status(500).json({ message: err.message });
  }
});

// Admin endpoint to flag suspicious activity
router.post('/admin/flag-suspicious', async (req, res) => {
  try {
    const { adminKey, recordId, reason } = req.body;
    
    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const record = await EnhancedVoteRecord.findById(recordId);
    if (!record) {
      return res.status(404).json({ message: "Vote record not found" });
    }
    
    await record.flagAsSuspicious(reason);
    
    res.json({
      message: "Record flagged successfully",
      recordId,
      newStatus: record.status,
      riskScore: record.riskScore
    });
  } catch (err) {
    console.error('Error flagging record:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
