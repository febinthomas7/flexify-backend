const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    watchlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "usersWatchingList",
      },
    ],
    likedlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "usersLikedList",
      },
    ],
    devicedetails: [
      {
        type: Schema.Types.ObjectId,
        ref: "deviceDetails",
      },
    ],
    dp: {
      type: String,
    },

    backgroundImg: {
      type: String,
    },
    resetOtp: {
      type: Number,
    },
    resetOtpExpiry: {
      type: Number,
    },

    password: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);
const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
