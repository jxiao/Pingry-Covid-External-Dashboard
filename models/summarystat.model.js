const mongoose = require("mongoose");

const summarystatSchema = new mongoose.Schema(
  {
    pingryCountiesCaseRate: Number,
    pingryCountiesInfectionRate: Number,
    shortHills7DayIsolationQuarantine: Number,
    baskingRidge7DayIsolationQuarantine: Number,
  },
  { timestamps: true }
);

const Summarystat = mongoose.model("Summarystat", summarystatSchema);
module.exports = Summarystat;
