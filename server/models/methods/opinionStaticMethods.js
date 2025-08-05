
function addStaticMethods(schema) {
  // Static methods for analytics
  schema.statics.getAnalytics = function(filters = {}) {
    const pipeline = [
      { $match: filters },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          byCategory: { $push: '$category' },
          byCountry: { $push: '$country' },
          byProjectType: { $push: '$projectType' },
          bySentiment: { $push: '$sentiment' },
          avgImpact: { $avg: '$impact' }
        }
      }
    ];
    
    return this.aggregate(pipeline);
  };
}

module.exports = addStaticMethods;
