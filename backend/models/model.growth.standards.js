const mongoose = require('mongoose');

const growthStandardsSchema = new mongoose.Schema({
  ageRange: {
    type: String,
    enum: ['0-1', '1-3', '3-6', '6-9', '9-12', '12-18', '18-24'],
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  heightPercentiles: {    type: Map,
    of: Number
  },
  weightPercentiles: {
    type: Map,
    of: Number
  },
  
});

module.exports = mongoose.model('GrowthStandards', growthStandardsSchema);
