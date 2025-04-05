
const express = require('express');
const router = express.Router();
const Opinion = require('../models/Opinion');

// Get all opinions with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
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
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get opinions by category with advanced filtering
router.get('/category/:category', async (req, res) => {
  try {
    const { region, timeframe, sentiment } = req.query;
    const query = { category: req.params.category };
    
    // Apply filters if provided
    if (region) query['demographics.region'] = region;
    if (sentiment) query.sentiment = sentiment;
    
    // Apply time-based filtering
    if (timeframe) {
      const date = new Date();
      switch(timeframe) {
        case 'day':
          date.setDate(date.getDate() - 1);
          break;
        case 'week':
          date.setDate(date.getDate() - 7);
          break;
        case 'month':
          date.setMonth(date.getMonth() - 1);
          break;
        case 'year':
          date.setFullYear(date.getFullYear() - 1);
          break;
      }
      query.createdAt = { $gte: date };
    }
    
    const opinions = await Opinion.find(query).sort({ createdAt: -1 });
    res.json(opinions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new opinion with sentiment analysis
router.post('/', async (req, res) => {
  try {
    const opinionData = {
      category: req.body.category,
      question: req.body.question,
      answer: req.body.answer,
      userId: req.body.userId,
      demographics: req.body.demographics || {},
      tags: req.body.tags || []
    };
    
    // Simple sentiment analysis based on keywords
    const answer = req.body.answer.toLowerCase();
    const positiveWords = ['love', 'great', 'excellent', 'good', 'amazing', 'fantastic', 'awesome'];
    const negativeWords = ['hate', 'terrible', 'bad', 'poor', 'awful', 'horrible', 'disappointing'];
    
    let sentimentScore = 0;
    positiveWords.forEach(word => {
      if (answer.includes(word)) sentimentScore++;
    });
    
    negativeWords.forEach(word => {
      if (answer.includes(word)) sentimentScore--;
    });
    
    if (sentimentScore > 0) opinionData.sentiment = 'positive';
    else if (sentimentScore < 0) opinionData.sentiment = 'negative';
    else opinionData.sentiment = 'neutral';
    
    const opinion = new Opinion(opinionData);
    const newOpinion = await opinion.save();
    res.status(201).json(newOpinion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get comprehensive analytics data
router.get('/analytics', async (req, res) => {
  try {
    const totalOpinions = await Opinion.countDocuments();
    
    // Category breakdown
    const categoryBreakdown = await Opinion.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);
    
    // Sentiment analysis
    const sentimentAnalysis = await Opinion.aggregate([
      { $group: { _id: "$sentiment", count: { $sum: 1 } } }
    ]);
    
    // Regional distribution
    const regionalDistribution = await Opinion.aggregate([
      { $group: { _id: "$demographics.region", count: { $sum: 1 } } },
      { $match: { _id: { $ne: null } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    
    // Time-based trends (daily for last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const timeData = await Opinion.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      { 
        $group: { 
          _id: { 
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
    ]);
    
    // Category trends over time
    const categoryTrends = await Opinion.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: {
            category: "$category",
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
    ]);
    
    res.json({
      totalOpinions,
      categoryBreakdown,
      sentimentAnalysis,
      regionalDistribution,
      timeData,
      categoryTrends
    });
  } catch (err) {
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
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
