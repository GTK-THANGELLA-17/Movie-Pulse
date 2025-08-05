
const express = require('express');
const router = express.Router();
const Opinion = require('../models/Opinion');
const TrendingInsight = require('../models/TrendingInsight');
const UserEngagement = require('../models/UserEngagement');

// Generate real-time insights from opinion data
router.get('/live', async (req, res) => {
  try {
    // Get recent opinions (last 7 days)
    const recentDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    // Genre trends
    const genreTrends = await Opinion.aggregate([
      { $match: { createdAt: { $gte: recentDate }, genre: { $exists: true, $ne: null } } },
      {
        $group: {
          _id: '$genre',
          count: { $sum: 1 },
          categories: { $addToSet: '$projectType' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Regional preferences
    const regionalTrends = await Opinion.aggregate([
      { 
        $match: { 
          createdAt: { $gte: recentDate },
          'demographics.region': { $exists: true, $ne: null }
        }
      },
      {
        $group: {
          _id: {
            region: '$demographics.region',
            genre: '$genre'
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 15 }
    ]);

    // Platform preferences
    const platformTrends = await Opinion.aggregate([
      { $match: { createdAt: { $gte: recentDate } } },
      {
        $group: {
          _id: '$projectType',
          count: { $sum: 1 },
          avgAge: { $avg: { $toInt: '$demographics.age' } }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Demographic shifts
    const demographicTrends = await Opinion.aggregate([
      { $match: { createdAt: { $gte: recentDate } } },
      {
        $group: {
          _id: {
            gender: '$demographics.gender',
            age: '$demographics.age',
            genre: '$genre'
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);

    const insights = {
      genreTrends,
      regionalTrends,
      platformTrends,
      demographicTrends,
      generatedAt: new Date(),
      totalRecentOpinions: await Opinion.countDocuments({ createdAt: { $gte: recentDate } })
    };

    res.json(insights);

  } catch (error) {
    console.error('Error generating insights:', error);
    res.status(500).json({ error: 'Failed to generate insights' });
  }
});

// Get curated trending insights
router.get('/trending', async (req, res) => {
  try {
    const trendingInsights = await TrendingInsight.find({ isActive: true })
      .sort({ priority: -1, createdAt: -1 })
      .limit(10);

    res.json({ insights: trendingInsights });

  } catch (error) {
    console.error('Error fetching trending insights:', error);
    res.status(500).json({ error: 'Failed to fetch trending insights' });
  }
});

// Get personalized insights for user
router.get('/personalized/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Get user's voting patterns
    const userOpinions = await Opinion.find({ userId })
      .sort({ createdAt: -1 })
      .limit(50);

    if (userOpinions.length === 0) {
      return res.json({
        message: 'Vote to see personalized insights!',
        insights: [],
        hasData: false
      });
    }

    // Analyze user preferences
    const userGenres = [...new Set(userOpinions.map(o => o.genre).filter(Boolean))];
    const userCategories = [...new Set(userOpinions.map(o => o.projectType))];
    
    // Find similar users and their preferences
    const similarUserInsights = await Opinion.aggregate([
      {
        $match: {
          userId: { $ne: userId },
          $or: [
            { genre: { $in: userGenres } },
            { projectType: { $in: userCategories } }
          ]
        }
      },
      {
        $group: {
          _id: '$genre',
          count: { $sum: 1 },
          users: { $addToSet: '$userId' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // Track engagement
    await UserEngagement.create({
      userId,
      activity: 'view-insight',
      metadata: { insightType: 'personalized' }
    });

    res.json({
      hasData: true,
      userPreferences: {
        genres: userGenres,
        categories: userCategories,
        totalVotes: userOpinions.length
      },
      similarUserInsights,
      insights: [
        {
          title: "Your Taste Profile",
          description: `You've shown strong interest in ${userGenres.slice(0, 3).join(', ')} content across ${userCategories.length} different platforms.`,
          type: 'profile'
        },
        {
          title: "Community Match",
          description: `Your preferences align with ${similarUserInsights.length} trending genres in the community.`,
          type: 'community'
        }
      ]
    });

  } catch (error) {
    console.error('Error generating personalized insights:', error);
    res.status(500).json({ error: 'Failed to generate personalized insights' });
  }
});

module.exports = router;
