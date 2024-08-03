const UserModel = require("../Models/userWatchedModel");

const watch = async (req, res) => {
  const {
    adult,
    id,
    genre_ids,
    overview,
    title,
    poster_path,
    backdrop_path,
    vote_average,
  } = req.body;

  try {
    // Validate incoming data (you can use a validation library like Joi for this)

    // Create a new instance of the userModel with the provided data
    const userModel = new UserModel({
      adult,
      id,
      genre_ids,
      overview,
      title,
      poster_path,
      backdrop_path,
      vote_average,
    });

    // Save the model to the database
    await userModel.save();

    // Send a success response
    res.status(201).json({ message: "Watching" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteMovieById = async (req, res) => {
  const { id } = req.body;

  res.status(201).json({ message: "Watching" });
  try {
    const result = await UserModel.findByIdAndDelete(id);

    if (result.deletedCount > 0) {
      console.log("Movie deleted successfully");
    } else {
      console.log("Movie not found");
    }
  } catch (error) {
    console.error("Error deleting movie:", error);
  }
};

module.exports = { watch, deleteMovieById };
