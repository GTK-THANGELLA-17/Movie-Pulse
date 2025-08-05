
const Opinion = require('../../models/Opinion');

class TimeSeriesAnalytics {
  static async getTimeSeriesData() {
    return await Opinion.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          count: { $sum: 1 },
          categories: { $addToSet: '$category' }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1, '_id.day': -1 } },
      { $limit: 30 }
    ]);
  }

  static async getCategoryTrends() {
    return await Opinion.aggregate([
      {
        $group: {
          _id: {
            category: '$category',
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1, '_id.day': -1 } },
      { $limit: 100 }
    ]);
  }

  static async getRealTimeStats() {
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const lastHour = new Date(now.getTime() - 60 * 60 * 1000);

    const [last24HourStats, lastHourStats, liveCount] = await Promise.all([
      Opinion.aggregate([
        { $match: { createdAt: { $gte: last24Hours } } },
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
            sentiment: { $push: '$sentiment' }
          }
        }
      ]),
      Opinion.aggregate([
        { $match: { createdAt: { $gte: lastHour } } },
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
            categories: { $addToSet: '$category' }
          }
        }
      ]),
      Opinion.countDocuments({ createdAt: { $gte: new Date(now.getTime() - 5 * 60 * 1000) } })
    ]);

    return {
      last24Hours: last24HourStats,
      lastHour: lastHourStats[0] || { count: 0, categories: [] },
      last5Minutes: liveCount,
      metadata: {
        generatedAt: now.toISOString(),
        isRealTime: true
      }
    };
  }
}

module.exports = TimeSeriesAnalytics;
