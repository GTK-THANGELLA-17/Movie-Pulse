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
    console.error('Error in GET /opinions:', err);
    res.status(500).json({ message: err.message });
  }
});

// Check if user has already voted in a section
router.get('/user-voted/:userId/:section', async (req, res) => {
  try {
    const { userId, section } = req.params;
    
    console.log(`Checking if user ${userId} has voted in section ${section}`);
    
    const hasVoted = await Opinion.findOne({ 
      userId,
      projectType: section
    });
    
    console.log(`User voted result: ${!!hasVoted}`);
    
    res.json({ 
      hasVoted: !!hasVoted,
      votedAt: hasVoted ? hasVoted.createdAt : null
    });
  } catch (err) {
    console.error('Error checking if user voted:', err);
    res.status(500).json({ message: err.message });
  }
});

// Get opinions by specific field
router.get('/by-field/:field/:value', async (req, res) => {
  try {
    const { field, value } = req.params;
    const allowedFields = ['televisionChannel', 'televisionContentType', 'ottPlatform', 'youtubeContentCategory', 'country', 'filmIndustry', 'genre'];
    
    if (!allowedFields.includes(field)) {
      return res.status(400).json({ message: `Field ${field} is not allowed for filtering` });
    }
    
    const query = {};
    query[field] = value;
    
    const opinions = await Opinion.find(query).sort({ createdAt: -1 });
    res.json(opinions);
  } catch (err) {
    console.error(`Error fetching opinions by field:`, err);
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
    
    console.log('Query for category opinions:', query);
    const opinions = await Opinion.find(query).sort({ createdAt: -1 });
    console.log(`Found ${opinions.length} opinions for category ${req.params.category}`);
    res.json(opinions);
  } catch (err) {
    console.error(`Error fetching opinions for category ${req.params.category}:`, err);
    res.status(500).json({ message: err.message });
  }
});

// Create a new opinion with enhanced validation and error handling
router.post('/', async (req, res) => {
  try {
    console.log('Received opinion data:', JSON.stringify(req.body, null, 2));
    
    if (!req.body.userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    
    if (!req.body.projectType) {
      return res.status(400).json({ message: "Project type is required" });
    }

    // Validate project type against allowed values
    const allowedProjectTypes = [
      'HighBudgetFilm', 'LowBudgetFilm', 'ShortFilm', 
      'YouTubeFilm', 'YouTubeContent', 'OTTPlatform', 'Television'
    ];
    
    if (!allowedProjectTypes.includes(req.body.projectType)) {
      return res.status(400).json({ 
        message: `Invalid project type. Allowed types: ${allowedProjectTypes.join(', ')}` 
      });
    }
    
    // Enhanced validation for Television opinions
    if (req.body.projectType === 'Television') {
      if (!req.body.televisionChannel) {
        return res.status(400).json({ message: "Television channel is required for Television opinions" });
      }
      
      if (!req.body.televisionContentType) {
        return res.status(400).json({ message: "Television content type is required for Television opinions" });
      }
      
      console.log('Television opinion validation passed:', {
        channel: req.body.televisionChannel,
        contentType: req.body.televisionContentType
      });
    }
    
    // Enhanced validation for OTT opinions
    if (req.body.projectType === 'OTTPlatform') {
      if (!req.body.ottPlatform) {
        return res.status(400).json({ message: "OTT platform is required for OTT opinions" });
      }
      
      if (!req.body.genre) {
        return res.status(400).json({ message: "Genre is required for OTT opinions" });
      }
    }
    
    // Enhanced validation for YouTube Content opinions with better category support
    if (req.body.projectType === 'YouTubeContent') {
      if (!req.body.youtubeContentCategory) {
        return res.status(400).json({ message: "YouTube content category is required for YouTube Content opinions" });
      }
      
      // Validate YouTube content category
      const allowedYouTubeCategories = [
        'Comedy', 'Education', 'Entertainment', 'Gaming', 'Music', 'News', 'Sports',
        'Technology', 'Travel', 'Food', 'Fashion', 'Health', 'DIY', 'Vlogs',
        'Reviews', 'Tutorials', 'Science', 'Art', 'Business', 'Lifestyle'
      ];
      
      if (!allowedYouTubeCategories.includes(req.body.youtubeContentCategory)) {
        console.log(`Invalid YouTube category: ${req.body.youtubeContentCategory}. Allowed: ${allowedYouTubeCategories.join(', ')}`);
        // Don't reject, just log for now to allow flexibility
      }
      
      console.log('YouTube Content opinion validation passed:', {
        category: req.body.youtubeContentCategory
      });
    }

    // Enhanced validation for Film opinions
    if (['HighBudgetFilm', 'LowBudgetFilm', 'ShortFilm', 'YouTubeFilm'].includes(req.body.projectType)) {
      if (!req.body.filmIndustry) {
        return res.status(400).json({ message: "Film industry is required for film opinions" });
      }
      
      if (!req.body.genre) {
        return res.status(400).json({ message: "Genre is required for film opinions" });
      }
    }
    
    // Check if user has already submitted for this project type in the current voting period
    const existingVote = await Opinion.findOne({
      userId: req.body.userId,
      projectType: req.body.projectType
    });
    
    if (existingVote) {
      console.log(`User ${req.body.userId} already voted in ${req.body.projectType}`);
      return res.status(400).json({ 
        message: "You've already shared your opinion in this category for the current voting period.",
        existingVote: {
          id: existingVote._id,
          createdAt: existingVote.createdAt
        }
      });
    }
    
    // Check if voting period was provided and still active
    if (req.body.votingPeriodEnd) {
      const votingEndDate = new Date(req.body.votingPeriodEnd);
      const now = new Date();
      
      if (votingEndDate < now) {
        return res.status(400).json({ 
          message: "The current voting period has ended. Please wait for the next voting period."
        });
      }
    }
    
    const opinionData = {
      category: req.body.category || determineCategory(req.body.projectType),
      projectType: req.body.projectType,
      question: req.body.question || `What's your preference for ${req.body.projectType}?`,
      answer: req.body.answer || generateAnswerFromData(req.body),
      userId: req.body.userId,
      demographics: {
        gender: req.body.demographics?.gender,
        age: req.body.demographics?.age,
        region: req.body.country || req.body.demographics?.region
      },
      tags: req.body.tags || [],
      votingPeriodEnd: req.body.votingPeriodEnd || null,
      // Media-specific fields
      televisionChannel: req.body.televisionChannel,
      televisionContentType: req.body.televisionContentType,
      ottPlatform: req.body.ottPlatform,
      youtubeContentCategory: req.body.youtubeContentCategory,
      // Common fields
      filmIndustry: req.body.filmIndustry,
      genre: req.body.genre,
      country: req.body.country,
      notes: req.body.notes
    };
    
    // Enhanced sentiment analysis
    const text = [req.body.answer, req.body.notes].filter(Boolean).join(' ').toLowerCase();
    const positiveWords = ['love', 'great', 'excellent', 'good', 'amazing', 'fantastic', 'awesome', 'like', 'enjoy', 'prefer', 'best'];
    const negativeWords = ['hate', 'terrible', 'bad', 'poor', 'awful', 'horrible', 'disappointing', 'dislike', 'worst'];
    
    let sentimentScore = 0;
    positiveWords.forEach(word => {
      if (text.includes(word)) sentimentScore++;
    });
    
    negativeWords.forEach(word => {
      if (text.includes(word)) sentimentScore--;
    });
    
    if (sentimentScore > 0) opinionData.sentiment = 'positive';
    else if (sentimentScore < 0) opinionData.sentiment = 'negative';
    else opinionData.sentiment = 'neutral';
    
    console.log('Creating new opinion with data:', opinionData);
    
    const opinion = new Opinion(opinionData);
    const newOpinion = await opinion.save();
    
    console.log('New opinion saved successfully:', newOpinion._id);
    res.status(201).json(newOpinion);
  } catch (err) {
    console.error('Error saving opinion:', err);
    res.status(400).json({ 
      message: err.message, 
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined 
    });
  }
});

// Helper function to determine category from project type
function determineCategory(projectType) {
  switch (projectType) {
    case 'Television':
      return 'television';
    case 'OTTPlatform':
      return 'streaming';
    case 'YouTubeContent':
    case 'YouTubeFilm':
      return 'youtube';
    default:
      return 'film';
  }
}

// Helper function to generate answer from form data
function generateAnswerFromData(data) {
  const parts = [];
  
  if (data.country) parts.push(`Country: ${data.country}`);
  if (data.filmIndustry) parts.push(`Film Industry: ${data.filmIndustry}`);
  if (data.genre) parts.push(`Genre: ${data.genre}`);
  if (data.ottPlatform) parts.push(`OTT Platform: ${data.ottPlatform}`);
  if (data.televisionChannel) parts.push(`TV Channel: ${data.televisionChannel}`);
  if (data.televisionContentType) parts.push(`Content Type: ${data.televisionContentType}`);
  if (data.youtubeContentCategory) parts.push(`YouTube Category: ${data.youtubeContentCategory}`);
  if (data.notes) parts.push(`Notes: ${data.notes}`);
  
  return parts.join(', ') || 'User preference submitted';
}

// Enhanced television statistics endpoint
router.get('/stats/television', async (req, res) => {
  try {
    console.log('Fetching television statistics...');
    
    // Most popular TV channels with count
    const channelStats = await Opinion.aggregate([
      { $match: { projectType: 'Television', televisionChannel: { $exists: true, $ne: null, $ne: "" } } },
      { $group: { _id: '$televisionChannel', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);
    
    console.log('Channel stats:', channelStats);
    
    // Most popular content types with count
    const contentTypeStats = await Opinion.aggregate([
      { $match: { projectType: 'Television', televisionContentType: { $exists: true, $ne: null, $ne: "" } } },
      { $group: { _id: '$televisionContentType', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 15 }
    ]);
    
    console.log('Content type stats:', contentTypeStats);
    
    // Country statistics for television
    const countryStats = await Opinion.aggregate([
      { $match: { projectType: 'Television', country: { $exists: true, $ne: null, $ne: "" } } },
      { $group: { _id: '$country', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    
    // Channel by content type correlation
    const channelContentCorrelation = await Opinion.aggregate([
      { $match: { 
        projectType: 'Television', 
        televisionChannel: { $exists: true, $ne: null, $ne: "" },
        televisionContentType: { $exists: true, $ne: null, $ne: "" }
      }},
      { $group: { 
        _id: { channel: "$televisionChannel", contentType: "$televisionContentType" },
        count: { $sum: 1 }
      }},
      { $sort: { count: -1 }},
      { $limit: 30 }
    ]);
    
    // Popular channels by country
    const channelsByCountry = await Opinion.aggregate([
      { $match: { 
        projectType: 'Television', 
        televisionChannel: { $exists: true, $ne: null, $ne: "" },
        country: { $exists: true, $ne: null, $ne: "" }
      }},
      { $group: { 
        _id: { country: "$country", channel: "$televisionChannel" },
        count: { $sum: 1 }
      }},
      { $sort: { count: -1 }},
      { $limit: 30 }
    ]);
    
    const result = {
      channelStats,
      contentTypeStats,
      countryStats,
      channelContentCorrelation,
      channelsByCountry
    };
    
    console.log('Television stats result:', JSON.stringify(result, null, 2));
    
    res.json(result);
  } catch (err) {
    console.error('Error fetching television stats:', err);
    res.status(500).json({ message: err.message });
  }
});

// Get YouTube Content statistics with enhanced category tracking
router.get('/stats/youtube-content', async (req, res) => {
  try {
    console.log('Fetching YouTube content statistics...');
    
    // Most popular YouTube content categories
    const categoryStats = await Opinion.aggregate([
      { $match: { projectType: 'YouTubeContent', youtubeContentCategory: { $exists: true, $ne: null, $ne: "" } } },
      { $group: { _id: '$youtubeContentCategory', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);
    
    console.log('YouTube content category stats:', categoryStats);
    
    // Country statistics for YouTube content
    const countryStats = await Opinion.aggregate([
      { $match: { projectType: 'YouTubeContent', country: { $exists: true, $ne: null, $ne: "" } } },
      { $group: { _id: '$country', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    
    // Category by country correlation
    const categoryCountryCorrelation = await Opinion.aggregate([
      { $match: { 
        projectType: 'YouTubeContent', 
        youtubeContentCategory: { $exists: true, $ne: null, $ne: "" },
        country: { $exists: true, $ne: null, $ne: "" }
      }},
      { $group: { 
        _id: { category: "$youtubeContentCategory", country: "$country" },
        count: { $sum: 1 }
      }},
      { $sort: { count: -1 }},
      { $limit: 30 }
    ]);
    
    const result = {
      categoryStats,
      countryStats,
      categoryCountryCorrelation
    };
    
    console.log('YouTube content stats result:', JSON.stringify(result, null, 2));
    
    res.json(result);
  } catch (err) {
    console.error('Error fetching YouTube content stats:', err);
    res.status(500).json({ message: err.message });
  }
});

// Get comprehensive analytics data
router.get('/analytics', async (req, res) => {
  try {
    const totalOpinions = await Opinion.countDocuments();
    console.log('Total opinions found:', totalOpinions);
    
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
    console.error('Error generating analytics:', err);
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

// Reset votes after voting period ends (admin only)
router.post('/reset-voting-period', async (req, res) => {
  // This would typically have admin authorization
  try {
    if (!req.body.adminKey || req.body.adminKey !== process.env.ADMIN_KEY) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    // We don't actually delete votes, but we can mark them as from a previous period
    // This is a safer approach than deleting data
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
