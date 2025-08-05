
const Opinion = require('../../models/Opinion');
const VoteRecord = require('../../models/VoteRecord');
const EnhancedVoteRecord = require('../../models/EnhancedVoteRecord');
const EnhancedFingerprinting = require('../../utils/enhancedFingerprinting');

class EnhancedDuplicateChecker {
  static async checkComprehensiveDuplicates(fingerprintSet, projectType, votingToken) {
    console.log('🔍 Starting comprehensive duplicate check...');
    
    // Check enhanced vote records first (primary method)
    const enhancedCheck = await this.checkEnhancedVoteRecords(fingerprintSet, projectType);
    if (enhancedCheck.isDuplicate) {
      return enhancedCheck;
    }
    
    // Check voting token usage
    const tokenCheck = await this.checkVotingToken(votingToken);
    if (tokenCheck.isDuplicate) {
      return tokenCheck;
    }
    
    // Check legacy vote records (backward compatibility)
    const legacyCheck = await this.checkLegacyVoteRecords(fingerprintSet, projectType);
    if (legacyCheck.isDuplicate) {
      return legacyCheck;
    }
    
    // Check opinion records (final fallback)
    const opinionCheck = await this.checkOpinionRecords(fingerprintSet, projectType);
    if (opinionCheck.isDuplicate) {
      return opinionCheck;
    }
    
    console.log('✅ No duplicates found - vote allowed');
    return { isDuplicate: false };
  }
  
  static async checkEnhancedVoteRecords(fingerprintSet, projectType) {
    try {
      const existingRecords = await EnhancedVoteRecord.findEnhancedDuplicates(fingerprintSet, projectType);
      
      if (existingRecords.length > 0) {
        const record = existingRecords[0];
        console.log(`🚫 Enhanced duplicate detected - Record ID: ${record._id}`);
        
        return {
          isDuplicate: true,
          message: "You've already submitted your opinion for this category.",
          existingVote: {
            id: record._id,
            createdAt: record.createdAt,
            preventionMethod: 'enhanced-fingerprinting-v2',
            matchType: this.getMatchType(record, fingerprintSet),
            riskScore: record.riskScore
          }
        };
      }
      
      return { isDuplicate: false };
    } catch (error) {
      console.error('Error checking enhanced vote records:', error);
      return { isDuplicate: false };
    }
  }
  
  static async checkVotingToken(votingToken) {
    try {
      const existingToken = await EnhancedVoteRecord.checkTokenUsage(votingToken);
      
      if (existingToken) {
        console.log(`🚫 Voting token already used - Token: ${votingToken.substring(0, 10)}...`);
        
        return {
          isDuplicate: true,
          message: "This voting session has already been used.",
          existingVote: {
            id: existingToken._id,
            createdAt: existingToken.createdAt,
            preventionMethod: 'voting-token',
            tokenId: votingToken.substring(0, 10) + '...'
          }
        };
      }
      
      return { isDuplicate: false };
    } catch (error) {
      console.error('Error checking voting token:', error);
      return { isDuplicate: false };
    }
  }
  
  static async checkLegacyVoteRecords(fingerprintSet, projectType) {
    try {
      const existingRecord = await VoteRecord.findOne({
        $or: [
          { fingerprint: fingerprintSet.primary, projectType },
          { serverFingerprint: fingerprintSet.primary, projectType },
          { fingerprint: fingerprintSet.network, projectType },
          { serverFingerprint: fingerprintSet.network, projectType }
        ],
        status: { $in: ['active', 'verified'] }
      });
      
      if (existingRecord) {
        console.log(`🚫 Legacy duplicate detected - Record ID: ${existingRecord._id}`);
        
        return {
          isDuplicate: true,
          message: "You've already submitted your opinion for this category.",
          existingVote: {
            id: existingRecord._id,
            createdAt: existingRecord.createdAt,
            preventionMethod: 'legacy-fingerprinting',
            upgraded: false
          }
        };
      }
      
      return { isDuplicate: false };
    } catch (error) {
      console.error('Error checking legacy vote records:', error);
      return { isDuplicate: false };
    }
  }
  
  static async checkOpinionRecords(fingerprintSet, projectType) {
    try {
      const existingOpinion = await Opinion.findOne({
        $or: [
          { userId: fingerprintSet.primary, projectType },
          { userId: fingerprintSet.network, projectType }
        ]
      });
      
      if (existingOpinion) {
        console.log(`🚫 Opinion duplicate detected - Opinion ID: ${existingOpinion._id}`);
        
        return {
          isDuplicate: true,
          message: "You've already shared your opinion in this category.",
          existingVote: {
            id: existingOpinion._id,
            createdAt: existingOpinion.createdAt,
            preventionMethod: 'opinion-fallback',
            requiresUpgrade: true
          }
        };
      }
      
      return { isDuplicate: false };
    } catch (error) {
      console.error('Error checking opinion records:', error);
      return { isDuplicate: false };
    }
  }
  
  static getMatchType(record, fingerprintSet) {
    if (record.enhancedFingerprints.primary === fingerprintSet.primary) return 'primary';
    if (record.enhancedFingerprints.device === fingerprintSet.device) return 'device';
    if (record.enhancedFingerprints.network === fingerprintSet.network) return 'network';
    if (record.enhancedFingerprints.composite === fingerprintSet.composite) return 'composite';
    return 'unknown';
  }
  
  // Method to upgrade legacy records to enhanced format
  static async upgradeLegacyRecord(legacyRecord, fingerprintSet, req) {
    try {
      const enhancedRecord = new EnhancedVoteRecord({
        fingerprint: legacyRecord.fingerprint,
        serverFingerprint: legacyRecord.serverFingerprint,
        enhancedFingerprints: fingerprintSet,
        votingToken: EnhancedFingerprinting.generateVotingToken(
          fingerprintSet, 
          legacyRecord.projectType, 
          legacyRecord.votingPeriodId
        ),
        projectType: legacyRecord.projectType,
        opinionId: legacyRecord.opinionId,
        networkInfo: {
          ipAddress: legacyRecord.ipAddress || EnhancedFingerprinting.extractClientIP(req),
          userAgent: legacyRecord.userAgent,
          acceptLanguage: req.headers['accept-language'],
          acceptEncoding: req.headers['accept-encoding']
        },
        deviceInfo: legacyRecord.deviceInfo || {},
        sessionId: legacyRecord.sessionId,
        votingPeriodId: legacyRecord.votingPeriodId,
        metadata: {
          ...legacyRecord.metadata,
          source: 'upgraded',
          version: '2.0'
        },
        status: 'verified',
        createdAt: legacyRecord.createdAt
      });
      
      await enhancedRecord.save();
      
      // Mark legacy record as upgraded
      legacyRecord.status = 'upgraded';
      legacyRecord.flags = [...(legacyRecord.flags || []), 'upgraded_to_enhanced'];
      await legacyRecord.save();
      
      console.log(`✅ Legacy record upgraded: ${legacyRecord._id} -> ${enhancedRecord._id}`);
      return enhancedRecord;
    } catch (error) {
      console.error('Error upgrading legacy record:', error);
      return null;
    }
  }
}

module.exports = EnhancedDuplicateChecker;
