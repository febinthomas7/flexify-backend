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
