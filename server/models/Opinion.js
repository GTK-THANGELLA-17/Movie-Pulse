
const mongoose = require('mongoose');
const OpinionSchema = require('./schemas/opinionSchema');
const createOpinionIndexes = require('./schemas/opinionIndexes');
const addInstanceMethods = require('./methods/opinionInstanceMethods');
const addStaticMethods = require('./methods/opinionStaticMethods');
const addOpinionMiddleware = require('./middleware/opinionMiddleware');

// Apply indexes
createOpinionIndexes(OpinionSchema);

// Add instance methods
addInstanceMethods(OpinionSchema);

// Add static methods
addStaticMethods(OpinionSchema);

// Add middleware
addOpinionMiddleware(OpinionSchema);

module.exports = mongoose.model('Opinion', OpinionSchema);
