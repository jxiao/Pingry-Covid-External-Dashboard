const mongoose = require("mongoose");

const detailedstatSchema = new mongoose.Schema(
  {
    shortHills7DayIsolationQuarantine: Number,
    baskingRidge7DayIsolationQuarantine: Number,
    averages: [
      {
        date: Date,
        shortHills: Number,
        baskingRidge: Number,
      },
    ],
    shortHillsPercentage14Days: [],
    baskingRidgePercentage14Days: [],
  },
  { timestamps: true }
);

const Detailedstat = mongoose.model("Detailedstat", detailedstatSchema);
module.exports = Detailedstat;
