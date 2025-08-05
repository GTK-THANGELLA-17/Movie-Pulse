
const express = require('express');
const router = express.Router();
const Opinion = require('../models/Opinion');
const StatisticsService = require('../services/statisticsService');

// Enhanced analytics endpoint with local/remote options
router.get('/', async (req, res) => {
  try {
    const includeRemoteData = req.query.includeRemote !== 'false';
    const analytics = await StatisticsService.getAnalytics(includeRemoteData);
    
    res.json(analytics);
  } catch (err) {
    console.error('Error generating analytics:', err);
    res.status(500).json({ message: err.message });
  }
});

// New endpoint for voting statistics
router.get('/voting-stats', async (req, res) => {
  try {
    const votingStats = await StatisticsService.getVotingStatistics();
    res.json(votingStats);
  } catch (err) {
    console.error('Error fetching voting statistics:', err);
    res.status(500).json({ message: err.message });
  }
});

// New endpoint for real-time dashboard stats
router.get('/realtime-stats', async (req, res) => {
  try {
    const realtimeStats = await StatisticsService.getRealTimeStats();
    res.json(realtimeStats);
  } catch (err) {
    console.error('Error fetching real-time stats:', err);
    res.status(500).json({ message: err.message });
  }
});

// Get trending topics
router.get('/trending', async (req, res) => {
  try {
    const result = await Opinion.aggregate([
      { $match: { tags: { $exists: true, $ne: [] } } },
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    
    res.json(result);
  } catch (err) {
    console.error('Error fetching trending topics:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
