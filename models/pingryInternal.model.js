const mongoose = require("mongoose");

const pingryInternalSchema = new mongoose.Schema(
  {
    shortHills7DayIsolationQuarantine: Number,
    baskingRidge7DayIsolationQuarantine: Number,
    averages: [],
    data: [
      {
        percentShortHillsActiveIsolationOrQuarantine: Number,
        percentBaskingRidgeActiveIsolationOrQuarantine: Number,
        percentPingryActiveIsolationOrQuarantine: Number,
      },
    ],
  },
  { timestamps: true }
);

const PingryInternal = mongoose.model("PingryInternal", pingryInternalSchema);
module.exports = PingryInternal;
