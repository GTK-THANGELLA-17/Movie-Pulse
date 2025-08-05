
const crypto = require('crypto');

class EnhancedFingerprinting {
  // Generate comprehensive device fingerprint with multiple factors
  static generateEnhancedFingerprint(req, clientData = {}) {
    const factors = [
      // Network factors
      this.extractClientIP(req),
      req.headers['user-agent'] || '',
      req.headers['accept-language'] || '',
      req.headers['accept-encoding'] || '',
      req.headers['accept'] || '',
      
      // Browser factors
      clientData.screenResolution || '',
      clientData.timezone || '',
      clientData.colorDepth || '',
      clientData.deviceMemory || '',
      clientData.hardwareConcurrency || '',
      clientData.platform || '',
      
      // Canvas and WebGL fingerprinting
      clientData.canvasFingerprint || '',
      clientData.webglFingerprint || '',
      
      // Additional security factors
      req.headers['sec-ch-ua'] || '',
      req.headers['sec-ch-ua-mobile'] || '',
      req.headers['sec-ch-ua-platform'] || '',
      
      // Connection factors
      req.headers['connection'] || '',
      req.headers['upgrade-insecure-requests'] || '',
      req.headers['sec-fetch-dest'] || '',
      req.headers['sec-fetch-mode'] || '',
      req.headers['sec-fetch-site'] || ''
    ];

    const fingerprintData = factors.filter(f => f).join('|||');
    const salt = process.env.ENHANCED_FINGERPRINT_SALT || 'moviepulse-enhanced-2024';
    
    return crypto.createHash('sha256')
      .update(fingerprintData + salt)
      .digest('hex');
  }

  // Generate multiple fingerprint variants for cross-validation
  static generateFingerprintSet(req, clientData = {}) {
    const baseFingerprint = this.generateEnhancedFingerprint(req, clientData);
    
    // Generate additional fingerprints with different factor combinations
    const deviceFingerprint = this.generateDeviceOnlyFingerprint(req, clientData);
    const networkFingerprint = this.generateNetworkOnlyFingerprint(req);
    const browserFingerprint = this.generateBrowserOnlyFingerprint(req, clientData);
    
    return {
      primary: baseFingerprint,
      device: deviceFingerprint,
      network: networkFingerprint,
      browser: browserFingerprint,
      composite: crypto.createHash('md5')
        .update([baseFingerprint, deviceFingerprint, networkFingerprint].join(''))
        .digest('hex')
    };
  }

  static generateDeviceOnlyFingerprint(req, clientData) {
    const deviceFactors = [
      clientData.screenResolution || '',
      clientData.timezone || '',
      clientData.platform || '',
      clientData.deviceMemory || '',
      clientData.hardwareConcurrency || '',
      clientData.canvasFingerprint || '',
      clientData.webglFingerprint || ''
    ];
    
    return crypto.createHash('sha256')
      .update(deviceFactors.join('|||'))
      .digest('hex');
  }

  static generateNetworkOnlyFingerprint(req) {
    const networkFactors = [
      this.extractClientIP(req),
      req.headers['user-agent'] || '',
      req.headers['accept-language'] || ''
    ];
    
    return crypto.createHash('sha256')
      .update(networkFactors.join('|||'))
      .digest('hex');
  }

  static generateBrowserOnlyFingerprint(req, clientData) {
    const browserFactors = [
      req.headers['user-agent'] || '',
      req.headers['accept'] || '',
      req.headers['accept-encoding'] || '',
      clientData.timezone || '',
      clientData.colorDepth || ''
    ];
    
    return crypto.createHash('sha256')
      .update(browserFactors.join('|||'))
      .digest('hex');
  }

  // Enhanced IP extraction with better proxy support
  static extractClientIP(req) {
    const forwardedFor = req.headers['x-forwarded-for'];
    const realIP = req.headers['x-real-ip'];
    const clientIP = req.headers['x-client-ip'];
    const clusterClientIP = req.headers['x-cluster-client-ip'];
    const cfConnectingIP = req.headers['cf-connecting-ip']; // Cloudflare
    const trueClientIP = req.headers['true-client-ip']; // Akamai
    
    let ip = cfConnectingIP || trueClientIP || forwardedFor || realIP || 
             clientIP || clusterClientIP || 
             req.connection?.remoteAddress || 
             req.socket?.remoteAddress ||
             req.connection?.socket?.remoteAddress ||
             '127.0.0.1';
    
    if (ip.includes(',')) {
      ip = ip.split(',')[0].trim();
    }
    
    if (ip.startsWith('::ffff:')) {
      ip = ip.substring(7);
    }
    
    return ip;
  }

  // Advanced validation with pattern detection
  static validateFingerprintSet(fingerprintSet, req) {
    if (!fingerprintSet || !fingerprintSet.primary) {
      console.log('❌ Invalid fingerprint set');
      return false;
    }

    // Check for suspicious patterns
    if (this.detectSuspiciousPatterns(fingerprintSet)) {
      console.log('❌ Suspicious fingerprint patterns detected');
      return false;
    }

    // Validate consistency between fingerprint variants
    if (!this.validateFingerprintConsistency(fingerprintSet)) {
      console.log('❌ Fingerprint inconsistency detected');
      return false;
    }

    return true;
  }

  static detectSuspiciousPatterns(fingerprintSet) {
    const patterns = [
      // Check for repeated characters
      /(.)\1{20,}/,
      // Check for sequential patterns
      /(012|123|234|345|456|567|678|789|abc|def){3,}/gi,
      // Check for common test patterns
      /(test|fake|bot|spam|000|aaa|111){2,}/gi
    ];

    return Object.values(fingerprintSet).some(fp => 
      patterns.some(pattern => pattern.test(fp))
    );
  }

  static validateFingerprintConsistency(fingerprintSet) {
    // All fingerprints should be valid hex strings
    const isValidHex = (str) => /^[a-f0-9]+$/i.test(str);
    
    return Object.values(fingerprintSet).every(fp => 
      fp && fp.length >= 16 && isValidHex(fp)
    );
  }

  // Enhanced rate limiting with multiple time windows
  static async checkAdvancedRateLimit(VoteRecord, fingerprintSet, options = {}) {
    const {
      veryShortWindow = 30000,    // 30 seconds
      shortWindow = 300000,       // 5 minutes
      mediumWindow = 1800000,     // 30 minutes
      longWindow = 86400000,      // 24 hours
      veryShortLimit = 1,         // 1 vote per 30 seconds
      shortLimit = 3,             // 3 votes per 5 minutes
      mediumLimit = 10,           // 10 votes per 30 minutes
      longLimit = 50              // 50 votes per day
    } = options;

    const now = Date.now();
    
    // Check all fingerprint variants
    const fingerprintsToCheck = Object.values(fingerprintSet);
    
    for (const timeWindow of [
      { window: veryShortWindow, limit: veryShortLimit, name: 'very-short' },
      { window: shortWindow, limit: shortLimit, name: 'short' },
      { window: mediumWindow, limit: mediumLimit, name: 'medium' },
      { window: longWindow, limit: longLimit, name: 'long' }
    ]) {
      const since = new Date(now - timeWindow.window);
      
      const count = await VoteRecord.countDocuments({
        $or: [
          { fingerprint: { $in: fingerprintsToCheck } },
          { serverFingerprint: { $in: fingerprintsToCheck } },
          { 'enhancedFingerprints.primary': { $in: fingerprintsToCheck } },
          { 'enhancedFingerprints.device': { $in: fingerprintsToCheck } },
          { 'enhancedFingerprints.network': { $in: fingerprintsToCheck } }
        ],
        createdAt: { $gte: since },
        status: { $ne: 'deleted' }
      });

      if (count >= timeWindow.limit) {
        console.log(`🚫 ${timeWindow.name}-term rate limit exceeded: ${count}/${timeWindow.limit}`);
        return {
          isLimited: true,
          window: timeWindow.name,
          count,
          limit: timeWindow.limit,
          retryAfter: Math.ceil(timeWindow.window / 1000)
        };
      }
    }

    return { isLimited: false };
  }

  // Generate temporary voting token for additional security
  static generateVotingToken(fingerprintSet, projectType, votingPeriodId) {
    const tokenData = [
      fingerprintSet.primary,
      projectType,
      votingPeriodId,
      Date.now().toString(),
      Math.random().toString(36).substring(2)
    ].join('|||');

    const salt = process.env.VOTING_TOKEN_SALT || 'voting-token-salt-2024';
    
    return crypto.createHash('sha256')
      .update(tokenData + salt)
      .digest('hex');
  }
}

module.exports = EnhancedFingerprinting;
