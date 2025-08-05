
const Opinion = require('../../models/Opinion');

class BaseAnalytics {
  static async getTotalStats() {
    const result = await Opinion.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          lastUpdated: { $max: '$updatedAt' },
          avgImpact: { $avg: '$impact' }
        }
      }
    ]);
    return result[0] || { total: 0, lastUpdated: new Date(), avgImpact: 0 };
  }

  static async getCategoryBreakdown() {
    return await Opinion.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgImpact: { $avg: '$impact' },
          latestOpinion: { $max: '$createdAt' }
        }
      },
      { $sort: { count: -1 } }
    ]);
  }

  static async getSentimentAnalysis() {
    return await Opinion.aggregate([
      {
        $group: {
          _id: '$sentiment',
          count: { $sum: 1 },
          avgImpact: { $avg: '$impact' }
        }
      },
      { $sort: { count: -1 } }
    ]);
  }

  static async getRegionalDistribution() {
    return await Opinion.aggregate([
      {
        $group: {
          _id: '$country',
          count: { $sum: 1 },
          categories: { $addToSet: '$category' },
          avgImpact: { $avg: '$impact' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);
  }
}

module.exports = BaseAnalytics;
