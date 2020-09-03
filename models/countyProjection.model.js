const mongoose = require('mongoose');

const countyProjectionSchema = new mongoose.Schema ({
  averages: Array,
  data: [{fips: String,
    infectionRates: Array}],
  pingryCountiesInfectionRate: Number
}, {timestamps: true});

const CountyProjection = mongoose.model("CountyProjection", countyProjectionSchema);
module.exports = CountyProjection;