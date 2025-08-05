const Opinion = require('../../models/Opinion');

class PlatformAnalytics {
  static async getPlatformSpecificStats() {
    const [filmStats, tvStats, ottStats, youtubeStats, instagramStats, ottSeriesStats, tvTypeStats, youtubeChannelTypeStats] = await Promise.all([
      // Film industry stats
      Opinion.aggregate([
        { $match: { category: 'film', filmIndustry: { $exists: true, $ne: null } } },
        {
          $group: {
            _id: { industry: '$filmIndustry', genre: '$genre' },
            count: { $sum: 1 },
            countries: { $addToSet: '$country' }
          }
        },
        { $sort: { count: -1 } },
        { $limit: 30 }
      ]),
      // TV channel stats
      Opinion.aggregate([
        { $match: { category: 'television', televisionChannel: { $exists: true, $ne: null } } },
        {
          $group: {
            _id: { channel: '$televisionChannel', contentType: '$televisionContentType' },
            count: { $sum: 1 },
            countries: { $addToSet: '$country' }
          }
        },
        { $sort: { count: -1 } },
        { $limit: 30 }
      ]),
      // OTT platform stats
      Opinion.aggregate([
        { $match: { category: 'streaming', ottPlatform: { $exists: true, $ne: null } } },
        {
          $group: {
            _id: { platform: '$ottPlatform', genre: '$genre' },
            count: { $sum: 1 },
            countries: { $addToSet: '$country' }
          }
        },
        { $sort: { count: -1 } },
        { $limit: 30 }
      ]),
      // YouTube category stats
      Opinion.aggregate([
        { $match: { category: 'youtube', youtubeContentCategory: { $exists: true, $ne: null } } },
        {
          $group: {
            _id: { category: '$youtubeContentCategory' },
            count: { $sum: 1 },
            countries: { $addToSet: '$country' }
          }
        },
        { $sort: { count: -1 } },
        { $limit: 30 }
      ]),
      // Instagram stats
      Opinion.aggregate([
        { $match: { category: 'instagram', instagramContentType: { $exists: true, $ne: null } } },
        { $group: { _id: { contentType: '$instagramContentType', profileType: '$instagramProfileType' }, count: { $sum: 1 } } },
        { $sort: { count: -1 } }, { $limit: 30 }
      ]),
      // OTT Series type stats
      Opinion.aggregate([
        { $match: { category: 'streaming', ottSeriesType: { $exists: true, $ne: null } } },
        { $group: { _id: { seriesType: '$ottSeriesType', platform: '$ottPlatform' }, count: { $sum: 1 } } },
        { $sort: { count: -1 } }, { $limit: 30 }
      ]),
      // TV Content type
      Opinion.aggregate([
        { $match: { category: 'television', televisionContentType: { $exists: true, $ne: null } } },
        { $group: { _id: { contentType: '$televisionContentType', channel: '$televisionChannel' }, count: { $sum: 1 } } },
        { $sort: { count: -1 } }, { $limit: 30 }
      ]),
      // YouTube Channel Type
      Opinion.aggregate([
        { $match: { category: 'youtube', youtubeChannelType: { $exists: true, $ne: null } } },
        { $group: { _id: { channelType: '$youtubeChannelType', contentCategory: '$youtubeContentCategory' }, count: { $sum: 1 } } },
        { $sort: { count: -1 } }, { $limit: 30 }
      ])
    ]);

    return {
      film: filmStats,
      television: tvStats,
      streaming: ottStats,
      youtube: youtubeStats,
      instagram: instagramStats,
      ottSeriesType: ottSeriesStats,
      televisionContentType: tvTypeStats,
      youtubeChannelType: youtubeChannelTypeStats,
    };
  }
}

module.exports = PlatformAnalytics;
