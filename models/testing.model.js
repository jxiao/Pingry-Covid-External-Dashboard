const mongoose = require("mongoose");

const testingSchema = new mongoose.Schema(
  {
    data: [
      {
        date: Date,
        numTests: Number,
        potentiallyPositivePairs: Number,
      }
    ]
  },
  { timestamps: true }
);

const Testing = mongoose.model("Testing", testingSchema);
module.exports = Testing;
