
const VoteRecord = require('../../models/VoteRecord');

class VotingAnalytics {
  static async getVotingStatistics() {
    const [voteRecordStats, duplicateAttempts, deviceBreakdown] = await Promise.all([
      VoteRecord.aggregate([
        {
          $group: {
            _id: '$projectType',
            totalVotes: { $sum: 1 },
            uniqueFingerprints: { $addToSet: '$fingerprint' },
            avgProcessingTime: { $avg: '$metadata.processingTime' }
          }
        },
        {
          $addFields: {
            uniqueVoteCount: { $size: '$uniqueFingerprints' }
          }
        },
        { $sort: { totalVotes: -1 } }
      ]),
      VoteRecord.aggregate([
        { $match: { 'metadata.validationChecks.duplicateCheck': false } },
        {
          $group: {
            _id: '$projectType',
            duplicateAttempts: { $sum: 1 }
          }
        }
      ]),
      VoteRecord.aggregate([
        {
          $group: {
            _id: '$deviceInfo.device',
            count: { $sum: 1 },
            projectTypes: { $addToSet: '$projectType' }
          }
        },
        { $sort: { count: -1 } }
      ])
    ]);

    return {
      voteRecordStats,
      duplicateAttempts,
      deviceBreakdown,
      metadata: {
        generatedAt: new Date().toISOString()
      }
    };
  }
}

module.exports = VotingAnalytics;
