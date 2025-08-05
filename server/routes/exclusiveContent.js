
const express = require('express');
const router = express.Router();
const ExclusiveContent = require('../models/ExclusiveContent');
const Opinion = require('../models/Opinion');
const UserEngagement = require('../models/UserEngagement');

// Get exclusive content for user based on voting history
router.get('/content/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Check if user has voted (has any opinions)
    const userOpinions = await Opinion.find({ userId }).limit(1);
    
    if (userOpinions.length === 0) {
      return res.json({
        message: 'Vote first to unlock exclusive content!',
        hasAccess: false,
        content: []
      });
    }

    // Get user preferences from voting history
    const userPreferences = await Opinion.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          genres: { $addToSet: '$genre' },
          categories: { $addToSet: '$projectType' },
          countries: { $addToSet: '$country' },
          filmIndustries: { $addToSet: '$filmIndustry' }
        }
      }
    ]);

    let query = { isActive: true };
    
    if (userPreferences.length > 0) {
      const prefs = userPreferences[0];
      query.$or = [
        { genre: { $in: prefs.genres.filter(Boolean) } },
        { category: { $in: prefs.categories.filter(Boolean) } },
        { country: { $in: prefs.countries.filter(Boolean) } },
        { filmIndustry: { $in: prefs.filmIndustries.filter(Boolean) } }
      ];
    }

    const exclusiveContent = await ExclusiveContent.find(query)
      .sort({ createdAt: -1 })
      .limit(20);

    // Track engagement
    await UserEngagement.create({
      userId,
      activity: 'view-exclusive',
      metadata: { contentCount: exclusiveContent.length }
    });

    res.json({
      hasAccess: true,
      content: exclusiveContent,
      personalizedCount: exclusiveContent.length
    });

  } catch (error) {
    console.error('Error fetching exclusive content:', error);
    res.status(500).json({ error: 'Failed to fetch exclusive content' });
  }
});

// Get trending content by category
router.get('/trending/:category?', async (req, res) => {
  try {
    const { category } = req.params;
    
    let query = { isActive: true, contentType: { $in: ['trailer', 'teaser', 'first-look'] } };
    if (category && category !== 'all') {
      query.category = category;
    }

    const trendingContent = await ExclusiveContent.find(query)
      .sort({ viewCount: -1, createdAt: -1 })
      .limit(10);

    res.json({ trending: trendingContent });

  } catch (error) {
    console.error('Error fetching trending content:', error);
    res.status(500).json({ error: 'Failed to fetch trending content' });
  }
});

// Increment view count for content
router.post('/view/:contentId', async (req, res) => {
  try {
    const { contentId } = req.params;
    const { userId } = req.body;

    await ExclusiveContent.findByIdAndUpdate(
      contentId,
      { $inc: { viewCount: 1 } }
    );

    if (userId) {
      await UserEngagement.create({
        userId,
        activity: 'view-exclusive',
        contentId
      });
    }

    res.json({ success: true });

  } catch (error) {
    console.error('Error updating view count:', error);
    res.status(500).json({ error: 'Failed to update view count' });
  }
});

module.exports = router;
