const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    device: {
      type: String,
    },

    uniqueIdentifier: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);
const DeviceDetails = mongoose.model("deviceDetails", userSchema);

module.exports = DeviceDetails;
