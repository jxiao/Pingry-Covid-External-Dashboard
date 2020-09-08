const mongoose = require("mongoose");

const statewideSchema = new mongoose.Schema(
  {
    stateName: String,
    stateCode: String,
    historicData: Array,
  },
  { timestamps: true }
);

const Statewide = mongoose.model("Statewide", statewideSchema);
module.exports = Statewide;
