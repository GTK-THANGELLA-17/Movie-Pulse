
function addOpinionMiddleware(schema) {
  // Pre-save middleware to update timestamps and process data
  schema.pre('save', function(next) {
    this.updatedAt = new Date();
    
    // Auto-generate answer if not provided
    if (!this.answer || this.answer.trim() === '') {
      this.answer = this.generateAnswerFromData();
    }
    
    // Auto-detect sentiment from answer and notes
    if (!this.sentiment || this.sentiment === 'neutral') {
      this.sentiment = this.calculateSentiment();
    }
    
    next();
  });
}

module.exports = addOpinionMiddleware;
