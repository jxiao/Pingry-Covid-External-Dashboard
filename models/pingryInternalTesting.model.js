const mongoose = require("mongoose");

const pingryInternalTestingSchema = new mongoose.Schema(
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

const PingryInternalTesting = mongoose.model(
  "PingryInternalTesting",
  pingryInternalTestingSchema
);
module.exports = PingryInternalTesting;
