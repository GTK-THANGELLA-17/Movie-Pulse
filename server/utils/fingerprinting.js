
const crypto = require('crypto');

class FingerprintingUtils {
  // Enhanced server-side fingerprinting with multiple factors
  static generateServerFingerprint(req) {
    const userAgent = req.headers['user-agent'] || '';
    const acceptLanguage = req.headers['accept-language'] || '';
    const acceptEncoding = req.headers['accept-encoding'] || '';
    const connection = req.headers['connection'] || '';
    const dnt = req.headers['dnt'] || '';
    const upgrade = req.headers['upgrade-insecure-requests'] || '';
    
    // Enhanced IP detection
    const ip = this.extractClientIP(req);
    
    // Create composite fingerprint with more factors
    const fingerprintData = [
      userAgent.substring(0, 200), // Limit length to prevent abuse
      acceptLanguage,
      acceptEncoding,
      connection,
      dnt,
      upgrade,
      ip
    ].join('|||');

    // Generate hash with salt
    const salt = process.env.FINGERPRINT_SALT || 'Audience-Pulse-salt-2024';
    return crypto.createHash('sha256')
      .update(fingerprintData + salt)
      .digest('hex');
  }

  // Enhanced IP extraction with better proxy support
  static extractClientIP(req) {
    const forwardedFor = req.headers['x-forwarded-for'];
    const realIP = req.headers['x-real-ip'];
    const clientIP = req.headers['x-client-ip'];
    const clusterClientIP = req.headers['x-cluster-client-ip'];
    
    // Try different headers in order of preference
    let ip = forwardedFor || realIP || clientIP || clusterClientIP || 
             req.connection?.remoteAddress || 
             req.socket?.remoteAddress ||
             req.connection?.socket?.remoteAddress ||
             '127.0.0.1';
    
    // Handle comma-separated IPs (take the first one)
    if (ip.includes(',')) {
      ip = ip.split(',')[0].trim();
    }
    
    // Remove IPv6 prefix if present
    if (ip.startsWith('::ffff:')) {
      ip = ip.substring(7);
    }
    
    return ip;
  }

  // Enhanced fingerprint validation with multiple checks
  static validateFingerprint(clientFingerprint, serverFingerprint, req) {
    // Basic validation
    if (!clientFingerprint || clientFingerprint.length < 10) {
      console.log('❌ Invalid client fingerprint length');
      return false;
    }
    
    // Check for suspicious patterns
    if (this.isSuspiciousFingerprint(clientFingerprint)) {
      console.log('❌ Suspicious fingerprint pattern detected');
      return false;
    }
    
    // Additional validation based on request headers
    if (this.isInconsistentRequest(req)) {
      console.log('❌ Inconsistent request headers detected');
      return false;
    }
    
    return true;
  }

  // Detect suspicious fingerprint patterns
  static isSuspiciousFingerprint(fingerprint) {
    // Check for repeated characters (potential bot)
    const repeatedPattern = /(.)\1{10,}/;
    if (repeatedPattern.test(fingerprint)) return true;
    
    // Check for sequential patterns
    const sequentialPattern = /(012|123|234|345|456|567|678|789|abc|def)/gi;
    if (sequentialPattern.test(fingerprint)) return true;
    
    // Check for common test patterns
    const testPatterns = ['test', 'fake', 'bot', 'spam', '000', 'aaa'];
    return testPatterns.some(pattern => fingerprint.toLowerCase().includes(pattern));
  }

  // Detect inconsistent request headers
  static isInconsistentRequest(req) {
    const userAgent = req.headers['user-agent'] || '';
    const acceptLanguage = req.headers['accept-language'] || '';
    
    // Check for missing essential headers
    if (!userAgent || userAgent.length < 10) return true;
    if (!acceptLanguage) return true;
    
    // Check for bot patterns in user agent
    const botPatterns = [
      'bot', 'crawler', 'spider', 'scraper', 'automated',
      'phantom', 'headless', 'selenium', 'puppeteer'
    ];
    const isBot = botPatterns.some(pattern => 
      userAgent.toLowerCase().includes(pattern)
    );
    
    return isBot;
  }

  // Enhanced rate limiting with multiple time windows
  static async isRateLimited(VoteRecord, fingerprint, options = {}) {
    const {
      shortWindow = 60000,      // 1 minute
      mediumWindow = 300000,    // 5 minutes
      longWindow = 3600000,     // 1 hour
      shortLimit = 3,           // 3 votes per minute
      mediumLimit = 10,         // 10 votes per 5 minutes
      longLimit = 50            // 50 votes per hour
    } = options;

    const now = Date.now();
    
    const [shortWindowCount, mediumWindowCount, longWindowCount] = await Promise.all([
      this.getVoteCount(VoteRecord, fingerprint, new Date(now - shortWindow)),
      this.getVoteCount(VoteRecord, fingerprint, new Date(now - mediumWindow)),
      this.getVoteCount(VoteRecord, fingerprint, new Date(now - longWindow))
    ]);

    if (shortWindowCount >= shortLimit) {
      console.log(`🚫 Short-term rate limit exceeded: ${shortWindowCount}/${shortLimit}`);
      return true;
    }
    
    if (mediumWindowCount >= mediumLimit) {
      console.log(`🚫 Medium-term rate limit exceeded: ${mediumWindowCount}/${mediumLimit}`);
      return true;
    }
    
    if (longWindowCount >= longLimit) {
      console.log(`🚫 Long-term rate limit exceeded: ${longWindowCount}/${longLimit}`);
      return true;
    }

    return false;
  }

  // Helper to get vote count for a time window
  static async getVoteCount(VoteRecord, fingerprint, since) {
    return await VoteRecord.countDocuments({
      $or: [
        { fingerprint },
        { serverFingerprint: fingerprint }
      ],
      createdAt: { $gte: since },
      status: { $ne: 'deleted' }
    });
  }

  // Generate session-based tracking ID
  static generateSessionFingerprint(req) {
    const sessionData = [
      req.headers['user-agent'] || '',
      req.headers['accept-language'] || '',
      this.extractClientIP(req),
      Date.now().toString()
    ].join('|||');
    
    return crypto.createHash('md5').update(sessionData).digest('hex');
  }

  // Validate voting period
  static isValidVotingPeriod(votingPeriodId) {
    if (!votingPeriodId) return true; // Allow if not specified
    
    const periodDate = new Date(votingPeriodId);
    const now = new Date();
    const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
    
    return (now - periodDate) <= maxAge;
  }
}

module.exports = FingerprintingUtils;
