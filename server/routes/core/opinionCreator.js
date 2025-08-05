
const Opinion = require('../../models/Opinion');
const VoteRecord = require('../../models/VoteRecord');
const { createOpinionData, getCurrentVotingPeriod } = require('../helpers/opinionHelpers');

class OpinionCreator {
  static async createOpinion(body) {
    const opinionData = createOpinionData(body);
    console.log('💾 Creating new opinion with enhanced tracking');
    
    const opinion = new Opinion(opinionData);
    const savedOpinion = await opinion.save();
    
    return savedOpinion;
  }

  static async createVoteRecord(savedOpinion, clientFingerprint, serverFingerprint, body, req) {
    const voteRecord = new VoteRecord({
      fingerprint: clientFingerprint,
      serverFingerprint: serverFingerprint,
      projectType: body.projectType,
      opinionId: savedOpinion._id,
      ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      userAgent: req.headers['user-agent'],
      sessionId: req.headers['x-session-id'] || 'unknown',
      votingPeriodId: body.votingPeriodId || getCurrentVotingPeriod(),
      deviceInfo: {
        browser: body.deviceInfo?.browser,
        os: body.deviceInfo?.os,
        device: body.deviceInfo?.device,
        screenResolution: body.deviceInfo?.screenResolution,
        timezone: body.deviceInfo?.timezone
      },
      metadata: {
        submissionTime: new Date(),
        validationChecks: {
          fingerprintValid: true,
          rateLimitPassed: true,
          duplicateCheck: true
        }
      }
    });
    
    await voteRecord.save();
    return voteRecord;
  }
}

module.exports = OpinionCreator;
