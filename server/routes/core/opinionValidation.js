
const { validateProjectSpecificFields } = require('../helpers/validationHelpers');
const { validateFingerprint, isRateLimited } = require('../../utils/fingerprinting');
const VoteRecord = require('../../models/VoteRecord');

class OpinionValidation {
  static validateRequiredFields(body) {
    const errors = [];
    
    if (!body.userId) {
      errors.push("User ID (fingerprint) is required");
    }
    
    if (!body.projectType) {
      errors.push("Project type is required");
    }
    
    return errors;
  }

  static async validateFingerprints(clientFingerprint, serverFingerprint) {
    if (!validateFingerprint(clientFingerprint, serverFingerprint)) {
      throw new Error("Invalid fingerprint detected");
    }
  }

  static async checkRateLimit(clientFingerprint) {
    if (await isRateLimited(VoteRecord, clientFingerprint)) {
      console.log(`🚫 Rate limit exceeded for ${clientFingerprint}`);
      throw new Error("Too many votes submitted. Please wait a moment before voting again.");
    }
  }

  static validateProjectFields(body) {
    const validationErrors = validateProjectSpecificFields(body);
    if (validationErrors.length > 0) {
      throw new Error(`Validation errors: ${validationErrors.join(', ')}`);
    }
  }
}

module.exports = OpinionValidation;
