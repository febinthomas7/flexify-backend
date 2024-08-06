const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    id: {
      type: Number,
    },
    overview: {
      type: String,
    },
    poster_path: {
      type: String,
    },
    backdrop_path: {
      type: String,
    },
    adult: {
      type: Boolean,
    },
    poster_path: {
      type: String,
    },
    genre_ids: {
      type: Array,
    },
    title: {
      type: String,
    },
    vote_average: {
      type: Number,
    },
    type: {
      type: String,
    },
    mode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const UserModel = mongoose.model("usersWatchingList", userSchema);

module.exports = UserModel;