
const Opinion = require('../../models/Opinion');
const EnhancedVoteRecord = require('../../models/EnhancedVoteRecord');
const EnhancedFingerprinting = require('../../utils/enhancedFingerprinting');
const { createOpinionData, getCurrentVotingPeriod } = require('../helpers/opinionHelpers');
const crypto = require('crypto');

class EnhancedOpinionCreator {
  static async createOpinion(body) {
    const startTime = Date.now();
    
    try {
      const opinionData = createOpinionData(body);
      console.log('💾 Creating new opinion with enhanced tracking v2.0');
      
      const opinion = new Opinion(opinionData);
      const savedOpinion = await opinion.save();
      
      const processingTime = Date.now() - startTime;
      console.log(`✅ Opinion created in ${processingTime}ms - ID: ${savedOpinion._id}`);
      
      return savedOpinion;
    } catch (error) {
      console.error('❌ Error creating opinion:', error);
      throw error;
    }
  }

  static async createEnhancedVoteRecord(savedOpinion, fingerprintSet, votingToken, body, req) {
    const startTime = Date.now();
    
    try {
      // Extract and hash IP for privacy
      const ipAddress = EnhancedFingerprinting.extractClientIP(req);
      const ipHash = crypto.createHash('sha256').update(ipAddress).digest('hex');
      
      // Collect comprehensive device and network information
      const deviceInfo = this.extractDeviceInfo(body, req);
      const networkInfo = this.extractNetworkInfo(req, ipAddress, ipHash);
      const securityChecks = this.performSecurityChecks(fingerprintSet, body, req);
      
      const enhancedVoteRecord = new EnhancedVoteRecord({
        fingerprint: body.userId, // Legacy compatibility
        serverFingerprint: fingerprintSet.network,
        enhancedFingerprints: fingerprintSet,
        votingToken,
        projectType: body.projectType,
        opinionId: savedOpinion._id,
        networkInfo,
        deviceInfo,
        sessionId: body.sessionId || req.headers['x-session-id'] || 'unknown',
        votingPeriodId: body.votingPeriodId || getCurrentVotingPeriod(),
        location: this.extractLocationInfo(body),
        securityChecks,
        riskFactors: this.identifyRiskFactors(body, req, securityChecks),
        metadata: {
          submissionTime: new Date(),
          processingTime: 0, // Will be set before save
          validationDuration: Date.now() - startTime,
          fingerprintGenerationTime: body.fingerprintGenerationTime || 0,
          source: this.detectSource(req),
          version: '2.0'
        },
        status: securityChecks.spamCheck && securityChecks.consistencyCheck ? 'active' : 'flagged'
      });
      
      // Set processing time
      enhancedVoteRecord.metadata.processingTime = Date.now() - startTime;
      
      await enhancedVoteRecord.save();
      
      console.log(`✅ Enhanced vote record created - ID: ${enhancedVoteRecord._id}, Risk Score: ${enhancedVoteRecord.riskScore}`);
      
      return enhancedVoteRecord;
    } catch (error) {
      console.error('❌ Error creating enhanced vote record:', error);
      throw error;
    }
  }
  
  static extractDeviceInfo(body, req) {
    const deviceInfo = body.deviceInfo || {};
    
    return {
      browser: deviceInfo.browser || req.headers['user-agent']?.substring(0, 200),
      os: deviceInfo.os || req.headers['sec-ch-ua-platform']?.replace(/"/g, ''),
      platform: deviceInfo.platform,
      device: this.detectDeviceType(req.headers['user-agent'] || ''),
      screenResolution: deviceInfo.screenResolution,
      timezone: deviceInfo.timezone,
      colorDepth: deviceInfo.colorDepth,
      deviceMemory: deviceInfo.deviceMemory,
      hardwareConcurrency: deviceInfo.hardwareConcurrency,
      canvasFingerprint: deviceInfo.canvasFingerprint,
      webglFingerprint: deviceInfo.webglFingerprint
    };
  }
  
  static extractNetworkInfo(req, ipAddress, ipHash) {
    return {
      ipAddress,
      ipHash,
      userAgent: req.headers['user-agent'],
      acceptLanguage: req.headers['accept-language'],
      acceptEncoding: req.headers['accept-encoding'],
      connection: req.headers['connection'],
      proxyHeaders: this.extractProxyHeaders(req)
    };
  }
  
  static extractProxyHeaders(req) {
    const proxyHeaders = [];
    const potentialProxyHeaders = [
      'x-forwarded-for',
      'x-real-ip',
      'x-client-ip',
      'x-cluster-client-ip',
      'cf-connecting-ip',
      'true-client-ip'
    ];
    
    potentialProxyHeaders.forEach(header => {
      if (req.headers[header]) {
        proxyHeaders.push(`${header}: ${req.headers[header]}`);
      }
    });
    
    return proxyHeaders;
  }
  
  static extractLocationInfo(body) {
    if (body.location) {
      return {
        country: body.location.country,
        region: body.location.region,
        city: body.location.city,
        coordinates: body.location.coordinates,
        accuracy: 'user-provided'
      };
    }
    
    // Could add IP-based geolocation here if needed
    return {};
  }
  
  static performSecurityChecks(fingerprintSet, body, req) {
    return {
      fingerprintValid: EnhancedFingerprinting.validateFingerprintSet(fingerprintSet, req),
      rateLimitPassed: true, // Will be checked separately
      duplicateCheck: true, // Will be checked separately
      spamCheck: this.checkForSpam(body, req),
      tokenValid: this.validateVotingToken(body.votingToken, fingerprintSet),
      consistencyCheck: this.checkDataConsistency(body, req)
    };
  }
  
  static checkForSpam(body, req) {
    // Basic spam detection
    const userAgent = req.headers['user-agent'] || '';
    const spamPatterns = [
      /bot/i, /crawler/i, /spider/i, /scraper/i,
      /automated/i, /phantom/i, /headless/i
    ];
    
    if (spamPatterns.some(pattern => pattern.test(userAgent))) {
      return false;
    }
    
    // Check for suspicious submission speed (too fast)
    if (body.submissionTime && body.startTime) {
      const submissionDuration = body.submissionTime - body.startTime;
      if (submissionDuration < 5000) { // Less than 5 seconds
        return false;
      }
    }
    
    return true;
  }
  
  static validateVotingToken(votingToken, fingerprintSet) {
    // Basic validation - token should be a valid hash
    if (!votingToken || votingToken.length < 32) {
      return false;
    }
    
    // Could add more sophisticated token validation here
    return true;
  }
  
  static checkDataConsistency(body, req) {
    // Check for basic data consistency
    if (!body.projectType || !body.userId) {
      return false;
    }
    
    // Check if device info is consistent with headers
    const userAgent = req.headers['user-agent'] || '';
    const deviceInfo = body.deviceInfo || {};
    
    if (deviceInfo.browser && !userAgent.includes(deviceInfo.browser.split(' ')[0])) {
      return false;
    }
    
    return true;
  }
  
  static identifyRiskFactors(body, req, securityChecks) {
    const riskFactors = [];
    
    // Check security failures
    Object.entries(securityChecks).forEach(([check, passed]) => {
      if (!passed) {
        riskFactors.push(`failed_${check}`);
      }
    });
    
    // Check for suspicious patterns
    const userAgent = req.headers['user-agent'] || '';
    if (userAgent.length < 50) {
      riskFactors.push('short_user_agent');
    }
    
    if (!req.headers['accept-language']) {
      riskFactors.push('missing_accept_language');
    }
    
    // Check submission speed
    if (body.submissionTime && body.startTime) {
      const duration = body.submissionTime - body.startTime;
      if (duration < 3000) {
        riskFactors.push('very_fast_submission');
      } else if (duration < 10000) {
        riskFactors.push('fast_submission');
      }
    }
    
    return riskFactors;
  }
  
  static detectDeviceType(userAgent) {
    if (/Mobi|Android|iPhone|iPad/i.test(userAgent)) {
      if (/iPad/i.test(userAgent)) return 'tablet';
      return 'mobile';
    }
    return 'desktop';
  }
  
  static detectSource(req) {
    const userAgent = req.headers['user-agent'] || '';
    
    if (/Mobi|Android/i.test(userAgent)) return 'mobile';
    if (req.headers['x-api-key']) return 'api';
    return 'web';
  }
}

module.exports = EnhancedOpinionCreator;
