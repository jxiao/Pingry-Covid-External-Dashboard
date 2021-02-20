const mongoose = require("mongoose");

const updatedTestingSchema = new mongoose.Schema(
  {
    data: [
      {
        date: Date,
        numTests: Number,
        totalPositiveCases: Number,
        shortHillsStudents: Number,
        shortHillsFacultyStaff: Number,
        baskingRidgeStudents: Number,
        baskingRidgeFacultyStaff: Number,
      },
    ],
  },
  { timestamps: true }
);

const UpdatedTesting = mongoose.model("UpdatedTesting", updatedTestingSchema);
module.exports = UpdatedTesting;
