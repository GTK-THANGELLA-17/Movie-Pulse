
const express = require('express');
const router = express.Router();

// Import both legacy and enhanced route modules
const coreOpinionsRouter = require('./core/opinions');
const enhancedOpinionsRouter = require('./core/enhancedOpinions');
const analyticsRouter = require('./analytics');
const statisticsRouter = require('./statistics');

// Mount enhanced routes first (they take precedence)
router.use('/v2', enhancedOpinionsRouter);

// Mount legacy routes for backward compatibility
router.use('/', coreOpinionsRouter);

// Mount analytics and statistics routes
router.use('/analytics', analyticsRouter);
router.use('/stats', statisticsRouter);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    version: '2.0',
    enhancedTracking: true,
    timestamp: new Date().toISOString()
  });
});

// Enhanced endpoint to get all opinions with comprehensive data
router.get('/', async (req, res) => {
  try {
    const Opinion = require('../models/Opinion');
    
    // Get all opinions with all fields
    const opinions = await Opinion.find({})
      .sort({ createdAt: -1 })
      .lean();
    
    console.log(`📊 Retrieved ${opinions.length} opinions for frontend`);
    
    res.json(opinions);
  } catch (error) {
    console.error('❌ Error fetching all opinions:', error);
    res.status(500).json({
      error: 'Failed to fetch opinions',
      message: error.message
    });
  }
});

module.exports = router;
