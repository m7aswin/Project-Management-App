const mongoose = require("mongoose");

const labourSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    jobType: {
      type: String,
      required: [true, "Job type is required"],
    },
    salary: {
      type: Number,
      required: [true, "Salary is required"],
    }
  },
  { timestamps: true }
);

const labourModel = mongoose.model("labour", labourSchema);
module.exports = labourModel;
