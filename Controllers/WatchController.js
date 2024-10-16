const watchModel = require("../Models/userWatchedModel");
const userModel = require("../Models/userModel");
const deviceModel = require("../Models/deviceDetails");
const UserLikedModel = require("../Models/UserLiked");

const watch = async (req, res) => {
  const { type, mode, movie, userId } = req.body;
  const {
    adult,
    id,
    genre_ids,
    overview,
    title,
    poster_path,
    backdrop_path,
    vote_average,
    original_language,
    thumbnail,
    genres,
    embed_url,
  } = movie;

  try {
    // Validate incoming data (you can use a validation library like Joi for this)

    const list = await watchModel.create({
      adult,
      id,
      genre_ids: genre_ids || genres,
      overview,
      title,
      poster_path: poster_path || thumbnail,
      backdrop_path: backdrop_path || thumbnail,
      vote_average,
      type,
      embed_url,
      mode,
      original_language: original_language || "Ja",
      user: userId,
    });

    const user = await userModel.findOne({ _id: userId });
    user.watchlist.push(list._id);

    await user.save();

    // Send a success response
    res.status(201).json({
      message: "added",
      success: true,
      data: {
        adult,
        id,
        genre_ids: genre_ids || genres,
        overview,
        title,
        poster_path: poster_path || thumbnail,
        backdrop_path: backdrop_path || thumbnail,
        vote_average,
        type,
        embed_url,
        mode,
        original_language: original_language || "Ja",
        user: userId,
      },
    });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const like = async (req, res) => {
  const { type, mode, movie, userId } = req.body;
  const {
    adult,
    id,
    genre_ids,
    overview,
    title,
    poster_path,
    backdrop_path,
    vote_average,
    original_language,
    thumbnail,
    genres,
    embed_url,
  } = movie;

  try {
    // Validate incoming data (you can use a validation library like Joi for this)

    const list = await UserLikedModel.create({
      adult,
      id,
      genre_ids: genre_ids || genres,
      overview,
      title,
      poster_path: poster_path || thumbnail,
      backdrop_path: backdrop_path || thumbnail,
      vote_average,
      type,
      embed_url,
      mode,
      original_language: original_language || "Ja",
      user: userId,
    });

    const user = await userModel.findOne({ _id: userId });
    user.likedlist.push(list._id);

    await user.save();

    // Send a success response
    res.status(201).json({
      message: "liked",
      success: true,
      data: {
        adult,
        id,
        genre_ids: genre_ids || genres,
        overview,
        title,
        poster_path: poster_path || thumbnail,
        backdrop_path: backdrop_path || thumbnail,
        vote_average,
        type,
        embed_url,
        mode,
        original_language: original_language || "Ja",
        user: userId,
      },
    });
    console.log("added");
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
const deleteLikeById = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await userModel.findOne({ likedlist: id });
    if (user) {
      user.likedlist = user.likedlist.filter(
        (movieId) => movieId.toString() !== id
      );
      await user.save();

      res.status(200).json({ message: "deleted", success: true });
    } else {
      console.log("User not found");
    }

    console.log("Movie deleted successfully");
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
const device = async (req, res) => {
  try {
    const { device, uniqueIdentifier, userid } = req.body;

    if (!device || !uniqueIdentifier || !userid) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Check if the device already exists
    let existingDevice = await deviceModel.findOne({
      device,
      uniqueIdentifier,
    });
    if (!existingDevice) {
      // Create a new device entry if it doesn't exist
      existingDevice = await deviceModel.create({ device, uniqueIdentifier });
    }

    // Find the user and populate their device details
    const user = await userModel
      .findOne({ _id: userid })
      .populate("devicedetails");
    // .select("device uniqueIdentifier");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Avoid adding the same device multiple times
    if (!user.devicedetails.some((d) => d._id.equals(existingDevice._id))) {
      user.devicedetails.push(existingDevice._id);
      await user.save();
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error in device function:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const deleteMovieById = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await userModel.findOne({ watchlist: id });
    await watchModel.findOneAndDelete({ _id: id });

    if (user) {
      user.watchlist = user.watchlist.filter(
        (movieId) => movieId.toString() !== id
      );

      await user.save();

      res.status(200).json({ message: "deleted", success: true });
    } else {
      console.log("User not found");
    }

    console.log("Movie deleted successfully");
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = { watch, deleteMovieById, device, like, deleteLikeById };
