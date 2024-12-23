const watchModel = require("../Models/userWatchedModel");
const userModel = require("../Models/userModel");
const deviceModel = require("../Models/deviceDetails");
const UserLikedModel = require("../Models/UserLiked");
const WatchingModel = require("../Models/WatchingModel");

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
    release_date,
    first_air_date,
    year,
    thumbnail,
    genres,
    embed_url,
    name,
    thumbnail_url,
  } = movie;

  try {
    // Validate incoming data (you can use a validation library like Joi for this)

    const list = await watchModel.create({
      adult,
      id,
      genre_ids: genre_ids || genres,
      overview,
      title: title || name,
      poster_path: poster_path || thumbnail || thumbnail_url,
      backdrop_path: backdrop_path || thumbnail,
      vote_average,
      type,
      release_date: release_date || first_air_date || year,
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
        title: title || name,
        poster_path: poster_path || thumbnail || thumbnail_url,
        backdrop_path: backdrop_path || thumbnail,
        vote_average,
        release_date: release_date || first_air_date || year,
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

const ContinueWatching = async (req, res) => {
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
    release_date,
    first_air_date,
    year,
    thumbnail,
    genres,
    embed_url,
    name,
    thumbnail_url,
  } = movie;

  try {
    const query = id
      ? { id: id } // If `id` is defined, search by `id`
      : { title: title };
    const existingMovie = await WatchingModel.findOne(query);

    if (existingMovie) {
      return res.status(200).json({
        message: "Movie already exists in the Continue Watching list",
        success: true,
        data: existingMovie, // Optionally return the existing data
      });
    }
    // Validate incoming data (you can use a validation library like Joi for this)

    const list = await WatchingModel.create({
      adult,
      id,
      genre_ids: genre_ids || genres,
      overview,
      title: title || name,
      poster_path: poster_path || thumbnail || thumbnail_url,
      backdrop_path: backdrop_path || thumbnail,
      vote_average,
      type,
      release_date: release_date || first_air_date || year,
      embed_url,
      mode,
      original_language: original_language || "Ja",
      user: userId,
    });

    const user = await userModel.findOne({ _id: userId });
    user.continue.push(list._id);

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
        title: title || name,
        poster_path: poster_path || thumbnail || thumbnail_url,
        backdrop_path: backdrop_path || thumbnail,
        vote_average,
        release_date: release_date || first_air_date || year,
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
  const active = true;
  try {
    const { device, userid } = req.body;

    if (!device || !userid) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    let existingDevice = await deviceModel.findOne({
      userId: userid,
    });
    if (!existingDevice) {
      // Create a new device entry if it doesn't exist
      existingDevice = await deviceModel.create({
        users: 1,
        active,
        userId: userid,
      });
    } else {
      existingDevice.users += 1;
      existingDevice.active = active;
      await existingDevice.save();
    }

    // Find the user and populate their device details
    const user = await userModel
      .findOne({ _id: userid })
      .populate("devicedetails");
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

const fetchDeviceDetails = async (req, res) => {
  const { userid } = req.query;

  try {
    const user = await deviceModel.findOne({ userId: userid });
    res.json({
      success: true,
      user: user,
    });
  } catch (error) {
    res.json({
      success: false,
    });
  }
};

const fetchDeviceLogout = async (req, res) => {
  const { userid } = req.query;

  try {
    let existingDevice = await deviceModel.findOne({
      userId: userid,
    });

    if (existingDevice) {
      existingDevice.users -= 1;
      existingDevice.active = false;
      await existingDevice.save();
    }

    res.json({
      success: true,
    });
  } catch (error) {
    res.json({
      success: false,
    });
  }
};
const deleteContinue = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await userModel.findOne({ continue: id });
    await WatchingModel.findOneAndDelete({ _id: id });

    if (user) {
      user.continue = user.continue.filter(
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

module.exports = {
  watch,
  deleteMovieById,
  device,
  like,
  deleteLikeById,
  ContinueWatching,
  deleteContinue,
  fetchDeviceDetails,
  fetchDeviceLogout,
};
