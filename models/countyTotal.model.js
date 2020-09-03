const mongoose = require('mongoose');

const countyTotalSchema = new mongoose.Schema ({
  name: String,
  totalCases: Number,
  newCases: Number,
  id: Number
}, {timestamps: true});

const CountyTotal = mongoose.model("CountyTotal", countyTotalSchema);
module.exports = CountyTotal;