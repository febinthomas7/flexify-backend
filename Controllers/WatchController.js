const UserModel = require("../Models/userWatchedModel");

const watch = async (req, res) => {
  const { type, mode, movie } = req.body;
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

  console.log(type, mode, id);

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
      type,
      mode,
    });

    // Save the model to the database
    await userModel.save();

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
    res.status(200).json({ message: "deleted", success: true });

    console.log("Movie deleted successfully");
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = { watch, deleteMovieById };
