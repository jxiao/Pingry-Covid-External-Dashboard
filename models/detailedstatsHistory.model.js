const mongoose = require("mongoose");

const detailedstatsHistorySchema = new mongoose.Schema(
  {
    // shortHills7DayIsolationQuarantine: Number,
    // baskingRidge7DayIsolationQuarantine: Number,
    averages: [
      {
        date: Date,
        shortHills: Number,
        baskingRidge: Number,
      },
    ],
    data: [],
  },
  { timestamps: true }
);

const DetailedstatsHistory = mongoose.model(
  "DetailedstatsHistory",
  detailedstatsHistorySchema
);
module.exports = DetailedstatsHistory;
