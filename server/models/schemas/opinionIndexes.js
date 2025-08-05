
function createOpinionIndexes(schema) {
  // Enhanced indexes for better performance
  schema.index({ category: 1, createdAt: -1 });
  schema.index({ userId: 1, projectType: 1 }, { unique: true });
  schema.index({ 'demographics.region': 1, category: 1 });
  schema.index({ 'demographics.gender': 1, 'demographics.age': 1 });
  schema.index({ country: 1, filmIndustry: 1 });
  schema.index({ televisionChannel: 1, televisionContentType: 1 });
  schema.index({ ottPlatform: 1, genre: 1 });
  schema.index({ youtubeContentCategory: 1, country: 1 });
  schema.index({ sentiment: 1, impact: 1 });
  schema.index({ votingPeriodId: 1, projectType: 1 });
  schema.index({ createdAt: 1, category: 1, country: 1 });
}

module.exports = createOpinionIndexes;
