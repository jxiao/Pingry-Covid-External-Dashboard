const mongoose = require("mongoose");

const countySchema = new mongoose.Schema(
  {
    averages: [],
    pingryCountiesCaseRate: Number,
    data: [
      {
        zipCd: String,
        counties: Array,
      },
    ],
  },
  { timestamps: true }
);

const County = mongoose.model("County", countySchema);
module.exports = County;
