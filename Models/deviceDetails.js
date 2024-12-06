const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    users: {
      type: Number,
      min: [0, "Users count cannot be less than 0"],
    },
    active: {
      type: Boolean,
    },
    userId: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);
const DeviceDetails = mongoose.model("deviceDetails", userSchema);

module.exports = DeviceDetails;
