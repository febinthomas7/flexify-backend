const UserModel = require("../Models/userWatchedModel");
const userModel = require("../Models/userModel");

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
  } = movie;

  try {
    // Validate incoming data (you can use a validation library like Joi for this)

    const list = await UserModel.create({
      adult,
      id,
      genre_ids,
      overview,
      title,
      poster_path,
      backdrop_path,
      vote_average,
      type,
      mode,
      user: userId,
    });

    const user = await userModel.findOne({ _id: userId });
    user.watchlist.push(list._id);

    await user.save();

    // Send a success response
    res.status(201).json({ message: "added", success: true });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const deleteMovieById = async (req, res) => {
  const { id } = req.body;

  try {
    await UserModel.findByIdAndDelete(id);
    // res.status(200).json({ message: "deleted", success: true });

    // Also, remove the movie from the user's watchlist if it exists
    const user = await userModel.findOne({ watchlist: id });
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

module.exports = { watch, deleteMovieById };
