
const express = require('express');
const router = express.Router();
const Opinion = require('../../models/Opinion');
const { generateServerFingerprint } = require('../../utils/fingerprinting');
const OpinionValidation = require('./opinionValidation');
const DuplicateChecker = require('./duplicateChecker');
const VoteChecker = require('./voteChecker');
const OpinionCreator = require('./opinionCreator');

// Get all opinions with pagination and data source options
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const includeRemote = req.query.includeRemote !== 'false';
    
    if (!includeRemote) {
      return res.json({
        opinions: [],
        pagination: { total: 0, page, pages: 0 },
        dataSource: 'local-only',
        message: 'Remote data disabled - showing local data only'
      });
    }
    
    const opinions = await Opinion.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
      
    const total = await Opinion.countDocuments();
    
    res.json({
      opinions,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      },
      dataSource: 'remote'
    });
  } catch (err) {
    console.error('Error in GET /opinions:', err);
    res.status(500).json({ message: err.message });
  }
});

// Enhanced vote checking with multiple fingerprint validation
router.get('/user-voted/:userId/:section', async (req, res) => {
  try {
    const { userId, section } = req.params;
    const result = await VoteChecker.checkVoteStatus(userId, section, req);
    res.json(result);
  } catch (err) {
    console.error('Error checking vote status:', err);
    res.status(500).json({ message: err.message });
  }
});

// Enhanced opinion submission with comprehensive duplicate prevention
router.post('/', async (req, res) => {
  try {
    console.log('📝 Enhanced opinion submission started');
    console.log('📊 Request data:', { ...req.body, userId: req.body.userId?.substring(0, 10) + '...' });
    
    const clientFingerprint = req.body.userId;
    const serverFingerprint = generateServerFingerprint(req);
    
    // Basic validation
    const fieldErrors = OpinionValidation.validateRequiredFields(req.body);
    if (fieldErrors.length > 0) {
      return res.status(400).json({ message: fieldErrors[0] });
    }
    
    // Fingerprint validation
    try {
      await OpinionValidation.validateFingerprints(clientFingerprint, serverFingerprint);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
    
    // Rate limiting check
    try {
      await OpinionValidation.checkRateLimit(clientFingerprint);
    } catch (error) {
      return res.status(429).json({ 
        message: error.message,
        retryAfter: 60
      });
    }

    // Enhanced duplicate checking
    const voteRecordCheck = await DuplicateChecker.checkDuplicateVoteRecord(
      clientFingerprint, 
      serverFingerprint, 
      req.body.projectType
    );
    
    if (voteRecordCheck.isDuplicate) {
      return res.status(400).json(voteRecordCheck);
    }

    const opinionCheck = await DuplicateChecker.checkDuplicateOpinion(
      clientFingerprint, 
      req.body.projectType
    );
    
    if (opinionCheck.isDuplicate) {
      return res.status(400).json(opinionCheck);
    }

    // Validate project-specific requirements
    try {
      OpinionValidation.validateProjectFields(req.body);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
    
    // Create opinion and vote record
    const savedOpinion = await OpinionCreator.createOpinion(req.body);
    const voteRecord = await OpinionCreator.createVoteRecord(
      savedOpinion, 
      clientFingerprint, 
      serverFingerprint, 
      req.body, 
      req
    );
    
    console.log('✅ Opinion and vote record saved successfully');
    
    res.status(201).json({
      opinion: savedOpinion,
      voteRecord: voteRecord._id,
      preventionActive: true,
      message: 'Opinion submitted successfully with enhanced tracking'
    });
    
  } catch (err) {
    console.error('❌ Error saving opinion:', err);
    res.status(400).json({ 
      message: err.message, 
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined 
    });
  }
});

// Reset votes after voting period ends (admin only)
router.post('/reset-voting-period', async (req, res) => {
  try {
    if (!req.body.adminKey || req.body.adminKey !== process.env.ADMIN_KEY) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const result = await Opinion.updateMany(
      {}, 
      { $set: { votingPeriodId: req.body.previousPeriodId || new Date().toISOString() } }
    );
    
    res.json({
      message: "Voting period reset successfully",
      modifiedCount: result.modifiedCount
    });
  } catch (err) {
    console.error('Error resetting voting period:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
