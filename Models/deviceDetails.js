const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    device: {
      type: String,
    },

    address: {
      type: String,
    },
    active: {
      type: Boolean,
    },
  },

  {
    timestamps: true,
  }
);
const DeviceDetails = mongoose.model("deviceDetails", userSchema);

module.exports = DeviceDetails;
