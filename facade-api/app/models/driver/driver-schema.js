const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    current_team: {
      type: String,
      trim: true,
      required: is_retired ? true : false,
    },
    car_number: {
      type: String,
      trim: true,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    nationality: {
      type: String,
      trim: true,
      required: true,
    },
    is_retired: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Drivers = mongoose.Schema("Drivers", DriverSchema);
module.exports = Drivers;
