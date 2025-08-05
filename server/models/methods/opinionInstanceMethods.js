
function addInstanceMethods(schema) {
  // Instance methods
  schema.methods.generateAnswerFromData = function() {
    const parts = [];
    if (this.country) parts.push(`Country: ${this.country}`);
    if (this.filmIndustry) parts.push(`Film Industry: ${this.filmIndustry}`);
    if (this.genre) parts.push(`Genre: ${this.genre}`);
    if (this.ottPlatform) parts.push(`OTT Platform: ${this.ottPlatform}`);
    if (this.televisionChannel) parts.push(`TV Channel: ${this.televisionChannel}`);
    if (this.televisionContentType) parts.push(`Content Type: ${this.televisionContentType}`);
    if (this.youtubeContentCategory) parts.push(`YouTube Category: ${this.youtubeContentCategory}`);
    if (this.instagramContentType) parts.push(`Instagram Content: ${this.instagramContentType}`);
    if (this.notes) parts.push(`Notes: ${this.notes}`);
    return parts.join(', ') || `User preference for ${this.projectType}`;
  };

  schema.methods.calculateSentiment = function() {
    const text = [this.answer, this.notes].filter(Boolean).join(' ').toLowerCase();
    const positiveWords = ['love', 'great', 'excellent', 'good', 'amazing', 'fantastic', 'awesome', 'like', 'enjoy', 'prefer', 'best', 'wonderful', 'perfect', 'brilliant'];
    const negativeWords = ['hate', 'terrible', 'bad', 'poor', 'awful', 'horrible', 'disappointing', 'dislike', 'worst', 'boring', 'stupid', 'waste'];
    
    let score = 0;
    positiveWords.forEach(word => { if (text.includes(word)) score++; });
    negativeWords.forEach(word => { if (text.includes(word)) score--; });
    
    return score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral';
  };
}

module.exports = addInstanceMethods;
