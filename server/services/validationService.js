class ValidationService {
  // Enhanced opinion data validation
  static validateOpinionData(data) {
    const errors = [];
    const warnings = [];

    // Required fields validation
    if (!data.category) errors.push("Category is required");
    if (!data.projectType) errors.push("Project type is required");
    if (!data.userId) errors.push("User ID is required");
    if (!data.country) errors.push("Country is required");

    // Category-specific validation
    this.validateCategorySpecificFields(data, errors, warnings);

    // Data consistency validation
    this.validateDataConsistency(data, errors, warnings);

    // Content validation
    this.validateContent(data, errors, warnings);

    return { errors, warnings, isValid: errors.length === 0 };
  }

  static validateCategorySpecificFields(data, errors, warnings) {
    switch (data.projectType) {
      case 'Television':
        if (!data.televisionChannel) errors.push("Television channel is required for TV opinions");
        if (!data.televisionContentType) errors.push("Television content type is required for TV opinions");
        break;
        
      case 'OTTPlatform':
        if (!data.ottPlatform) errors.push("OTT platform is required for streaming opinions");
        if (!data.genre) warnings.push("Genre is recommended for OTT opinions");
        break;
        
      case 'YouTubeContent':
        if (!data.youtubeContentCategory) errors.push("YouTube content category is required");
        break;
        
      case 'InstagramContent':
        if (!data.instagramContentType) errors.push("Instagram content type is required");
        break;
        
      case 'HighBudgetFilm':
      case 'LowBudgetFilm':
      case 'ShortFilm':
      case 'YouTubeFilm':
        if (!data.filmIndustry) errors.push("Film industry is required for film opinions");
        if (!data.genre) warnings.push("Genre is recommended for film opinions");
        break;
    }
  }

  static validateDataConsistency(data, errors, warnings) {
    // Check category consistency
    const categoryMappings = {
      'Television': 'television',
      'OTTPlatform': 'streaming',
      'YouTubeContent': 'youtube',
      'YouTubeFilm': 'film',
      'InstagramContent': 'instagram',
      'HighBudgetFilm': 'film',
      'LowBudgetFilm': 'film',
      'ShortFilm': 'film'
    };

    const expectedCategory = categoryMappings[data.projectType];
    if (expectedCategory && data.category !== expectedCategory) {
      warnings.push(`Category '${data.category}' may not match project type '${data.projectType}'`);
    }

    // Validate demographic data consistency
    if (data.demographics?.age && !this.isValidAgeRange(data.demographics.age)) {
      errors.push("Invalid age range format");
    }

    if (data.demographics?.gender && !this.isValidGender(data.demographics.gender)) {
      errors.push("Invalid gender value");
    }
  }

  static validateContent(data, errors, warnings) {
    // Validate notes length
    if (data.notes && data.notes.length > 1000) {
      errors.push("Notes cannot exceed 1000 characters");
    }

    // Check for potentially harmful content
    if (data.notes && this.containsInappropriateContent(data.notes)) {
      warnings.push("Content may contain inappropriate language");
    }

    if (data.answer && this.containsInappropriateContent(data.answer)) {
      warnings.push("Answer may contain inappropriate language");
    }

    // Validate answer format
    if (data.answer && data.answer.length > 2000) {
      errors.push("Answer cannot exceed 2000 characters");
    }
  }

  static isValidAgeRange(age) {
    const validAgeRanges = ['Under 18', '18-24', '25-34', '35-44', '45-54', '55-64', '65+'];
    return validAgeRanges.includes(age);
  }

  static isValidGender(gender) {
    const validGenders = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
    return validGenders.includes(gender);
  }

  static containsInappropriateContent(text) {
    const inappropriateWords = [
      'spam', 'hate', 'offensive', 'inappropriate'
      // Add more as needed, but keep this basic for now
    ];
    
    const lowercaseText = text.toLowerCase();
    return inappropriateWords.some(word => lowercaseText.includes(word));
  }

  // Validate device info
  static validateDeviceInfo(deviceInfo) {
    const warnings = [];
    
    if (!deviceInfo) {
      warnings.push("Device information not provided");
      return { warnings, isValid: true };
    }

    if (!deviceInfo.browser || deviceInfo.browser.length < 3) {
      warnings.push("Browser information incomplete");
    }

    if (!deviceInfo.device || !['mobile', 'desktop', 'tablet'].includes(deviceInfo.device)) {
      warnings.push("Device type not recognized");
    }

    return { warnings, isValid: true };
  }

  // Validate geographic consistency
  static validateGeographicConsistency(country, region, demographics) {
    const warnings = [];
    
    // Basic geographic validation
    if (demographics?.region && country) {
      // This could be enhanced with actual geographic data validation
      if (demographics.region.toLowerCase().includes('test')) {
        warnings.push("Geographic data appears to be test data");
      }
    }

    return { warnings, isValid: true };
  }
}

module.exports = ValidationService;
