
const Opinion = require('../../models/Opinion');
const VoteRecord = require('../../models/VoteRecord');

class DuplicateChecker {
  static async checkDuplicateVoteRecord(clientFingerprint, serverFingerprint, projectType) {
    const existingVoteRecord = await VoteRecord.findOne({
      $or: [
        { fingerprint: clientFingerprint, projectType: projectType },
        { serverFingerprint: serverFingerprint, projectType: projectType }
      ]
    });
    
    if (existingVoteRecord) {
      console.log(`🚫 Duplicate vote attempt detected via VoteRecord`);
      return {
        isDuplicate: true,
        message: "You've already submitted your opinion for this category.",
        existingVote: {
          id: existingVoteRecord._id,
          createdAt: existingVoteRecord.createdAt,
          preventionMethod: 'enhanced-fingerprinting'
        }
      };
    }
    
    return { isDuplicate: false };
  }

  static async checkDuplicateOpinion(clientFingerprint, projectType) {
    const existingOpinion = await Opinion.findOne({
      userId: clientFingerprint,
      projectType: projectType
    });
    
    if (existingOpinion) {
      console.log(`🚫 Duplicate vote attempt detected via Opinion`);
      return {
        isDuplicate: true,
        message: "You've already shared your opinion in this category.",
        existingVote: {
          id: existingOpinion._id,
          createdAt: existingOpinion.createdAt,
          preventionMethod: 'opinion-fallback'
        }
      };
    }
    
    return { isDuplicate: false };
  }
}

module.exports = DuplicateChecker;
