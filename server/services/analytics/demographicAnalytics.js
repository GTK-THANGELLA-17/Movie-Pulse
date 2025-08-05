
const Opinion = require('../../models/Opinion');

class DemographicAnalytics {
  static async getDemographicBreakdown() {
    const [ageStats, genderStats, regionStats] = await Promise.all([
      Opinion.aggregate([
        { $match: { 'demographics.age': { $exists: true, $ne: null } } },
        {
          $group: {
            _id: '$demographics.age',
            count: { $sum: 1 },
            categories: { $addToSet: '$category' }
          }
        },
        { $sort: { count: -1 } }
      ]),
      Opinion.aggregate([
        { $match: { 'demographics.gender': { $exists: true, $ne: null } } },
        {
          $group: {
            _id: '$demographics.gender',
            count: { $sum: 1 },
            categories: { $addToSet: '$category' }
          }
        },
        { $sort: { count: -1 } }
      ]),
      Opinion.aggregate([
        { $match: { 'demographics.region': { $exists: true, $ne: null } } },
        {
          $group: {
            _id: '$demographics.region',
            count: { $sum: 1 },
            country: { $first: '$country' }
          }
        },
        { $sort: { count: -1 } },
        { $limit: 50 }
      ])
    ]);

    return {
      age: ageStats,
      gender: genderStats,
      region: regionStats
    };
  }

  static async getDeviceStats() {
    return await Opinion.aggregate([
      { $match: { 'deviceInfo.device': { $exists: true, $ne: null } } },
      {
        $group: {
          _id: {
            device: '$deviceInfo.device',
            browser: '$deviceInfo.browser'
          },
          count: { $sum: 1 },
          categories: { $addToSet: '$category' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);
  }
}

module.exports = DemographicAnalytics;
