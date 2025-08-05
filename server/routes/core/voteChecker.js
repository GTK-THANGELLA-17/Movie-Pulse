
const Opinion = require('../../models/Opinion');
const VoteRecord = require('../../models/VoteRecord');
const { generateServerFingerprint } = require('../../utils/fingerprinting');

class VoteChecker {
  static async checkVoteStatus(userId, section, req) {
    const serverFingerprint = generateServerFingerprint(req);
    
    console.log(`🔍 Checking vote status for user ${userId}, section ${section}`);
    
    // Check both client fingerprint and server fingerprint
    const voteRecords = await VoteRecord.find({
      $or: [
        { fingerprint: userId, projectType: section },
        { serverFingerprint: serverFingerprint, projectType: section }
      ]
    }).sort({ createdAt: -1 }).limit(1);
    
    const hasVoted = voteRecords.length > 0;
    
    if (hasVoted) {
      console.log(`✅ Found existing vote record for ${section}`);
      return { 
        hasVoted: true,
        votedAt: voteRecords[0].createdAt,
        voteId: voteRecords[0]._id,
        preventionMethod: 'enhanced-fingerprinting'
      };
    }
    
    // Fallback to opinion check
    const opinionVote = await Opinion.findOne({ 
      userId,
      projectType: section
    });
    
    console.log(`📊 Vote status result: ${!!opinionVote || hasVoted}`);
    
    return { 
      hasVoted: !!opinionVote,
      votedAt: opinionVote ? opinionVote.createdAt : null,
      fallbackCheck: !hasVoted && !!opinionVote
    };
  }
}

module.exports = VoteChecker;
