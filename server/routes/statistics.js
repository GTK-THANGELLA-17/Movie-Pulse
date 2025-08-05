
const express = require('express');
const router = express.Router();
const Opinion = require('../models/Opinion');

// Enhanced television statistics endpoint
router.get('/television', async (req, res) => {
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

    // Get user notes for television
    const userNotes = await Opinion.find({
      projectType: 'Television',
      notes: { $exists: true, $ne: null, $ne: "" }
    })
    .select('notes genre televisionChannel televisionContentType country createdAt demographics')
    .sort({ createdAt: -1 })
    .limit(50);
    
    const result = {
      channelStats,
      contentTypeStats,
      countryStats,
      channelContentCorrelation,
      channelsByCountry,
      userNotes
    };
    
    console.log('Television stats result:', JSON.stringify(result, null, 2));
    
    res.json(result);
  } catch (err) {
    console.error('Error fetching television stats:', err);
    res.status(500).json({ message: err.message });
  }
});

// Get YouTube Content statistics with enhanced category tracking
router.get('/youtube-content', async (req, res) => {
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

    // Get user notes for YouTube content
    const userNotes = await Opinion.find({
      projectType: 'YouTubeContent',
      notes: { $exists: true, $ne: null, $ne: "" }
    })
    .select('notes genre youtubeContentCategory country createdAt demographics')
    .sort({ createdAt: -1 })
    .limit(50);
    
    const result = {
      categoryStats,
      countryStats,
      categoryCountryCorrelation,
      userNotes
    };
    
    console.log('YouTube content stats result:', JSON.stringify(result, null, 2));
    
    res.json(result);
  } catch (err) {
    console.error('Error fetching YouTube content stats:', err);
    res.status(500).json({ message: err.message });
  }
});

// Get Film statistics with notes
router.get('/films', async (req, res) => {
  try {
    console.log('Fetching film statistics...');
    
    // Film industry statistics
    const industryStats = await Opinion.aggregate([
      { $match: { 
        projectType: { $in: ['Films', 'HighBudgetFilm', 'LowBudgetFilm', 'ShortFilm'] },
        filmIndustry: { $exists: true, $ne: null, $ne: "" } 
      }},
      { $group: { _id: '$filmIndustry', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);
    
    // Genre statistics for films
    const genreStats = await Opinion.aggregate([
      { $match: { 
        projectType: { $in: ['Films', 'HighBudgetFilm', 'LowBudgetFilm', 'ShortFilm'] },
        genre: { $exists: true, $ne: null, $ne: "" } 
      }},
      { $group: { _id: '$genre', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);
    
    // Country statistics for films
    const countryStats = await Opinion.aggregate([
      { $match: { 
        projectType: { $in: ['Films', 'HighBudgetFilm', 'LowBudgetFilm', 'ShortFilm'] },
        country: { $exists: true, $ne: null, $ne: "" } 
      }},
      { $group: { _id: '$country', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Get user notes for films
    const userNotes = await Opinion.find({
      projectType: { $in: ['Films', 'HighBudgetFilm', 'LowBudgetFilm', 'ShortFilm'] },
      notes: { $exists: true, $ne: null, $ne: "" }
    })
    .select('notes genre filmIndustry projectType country createdAt demographics')
    .sort({ createdAt: -1 })
    .limit(50);
    
    const result = {
      industryStats,
      genreStats,
      countryStats,
      userNotes
    };
    
    console.log('Film stats result:', JSON.stringify(result, null, 2));
    
    res.json(result);
  } catch (err) {
    console.error('Error fetching film stats:', err);
    res.status(500).json({ message: err.message });
  }
});

// Get OTT Platform statistics with notes
router.get('/ott', async (req, res) => {
  try {
    console.log('Fetching OTT platform statistics...');
    
    // OTT platform statistics
    const platformStats = await Opinion.aggregate([
      { $match: { projectType: 'OTTPlatform', ottPlatform: { $exists: true, $ne: null, $ne: "" } } },
      { $group: { _id: '$ottPlatform', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);
    
    // Genre statistics for OTT
    const genreStats = await Opinion.aggregate([
      { $match: { projectType: 'OTTPlatform', genre: { $exists: true, $ne: null, $ne: "" } } },
      { $group: { _id: '$genre', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);
    
    // Country statistics for OTT
    const countryStats = await Opinion.aggregate([
      { $match: { projectType: 'OTTPlatform', country: { $exists: true, $ne: null, $ne: "" } } },
      { $group: { _id: '$country', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Get user notes for OTT
    const userNotes = await Opinion.find({
      projectType: 'OTTPlatform',
      notes: { $exists: true, $ne: null, $ne: "" }
    })
    .select('notes genre ottPlatform country createdAt demographics')
    .sort({ createdAt: -1 })
    .limit(50);
    
    const result = {
      platformStats,
      genreStats,
      countryStats,
      userNotes
    };
    
    console.log('OTT stats result:', JSON.stringify(result, null, 2));
    
    res.json(result);
  } catch (err) {
    console.error('Error fetching OTT stats:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
