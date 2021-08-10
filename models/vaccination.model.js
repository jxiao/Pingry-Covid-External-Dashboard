const mongoose = require("mongoose");

const vaccinationSchema = new mongoose.Schema(
  {
    data: [
      {
        date: Date,
        students: Number,
        facultyStaff: Number,
      },
    ],
  },
  { timestamps: true }
);

const Vaccination = mongoose.model("Vaccination", vaccinationSchema);
module.exports = Vaccination;
