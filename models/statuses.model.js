const mongoose = require("mongoose");

const statusesSchema = new mongoose.Schema(
  {
    shortHills: Number,
    baskingRidge: Number,
  },
  { timestamps: true }
);

const Statuses = mongoose.model("Statuses", statusesSchema);
module.exports = Statuses;
