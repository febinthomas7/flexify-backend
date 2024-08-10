const router = require("express").Router();
const { signin, login } = require("../Controllers/AuthController");
const { watch, deleteMovieById } = require("../Controllers/WatchController");
const ensureAuthentication = require("../Middlewares/Auth");
const UserModel = require("../Models/userWatchedModel");
const userModal = require("../Models/userModel");
const {
  signinValidation,
  logininValidation,
} = require("../Middlewares/AuthValidation");
router.post("/signin", signinValidation, signin);

router.post("/login", logininValidation, login);

router.get("/userlist", ensureAuthentication, async (req, res) => {
  try {
    const movies = await userModal
      .findOne({ _id: req.query.userId })
      .populate("watchlist");
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
});

router.post("/addwatch", watch);
router.post("/deletewatch", deleteMovieById);

module.exports = router;
