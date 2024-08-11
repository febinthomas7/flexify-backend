const router = require("express").Router();
const { signin, login } = require("../Controllers/AuthController");
const { watch, deleteMovieById } = require("../Controllers/WatchController");
const userDp = require("../Controllers/UploadFile");
const multer = require("multer");
const ensureAuthentication = require("../Middlewares/Auth");
const userModal = require("../Models/userModel");
const upload = multer({ storage: multer.memoryStorage() });
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
router.post("/upload", upload.single("avatar"), userDp);

router.get("/avatar", async (req, res) => {
  const user = await userModal.findById(req.query.userId);
  res.send({ userdp: user.dp, name: user.name });
});
router.post("/addwatch", watch);
router.post("/deletewatch", deleteMovieById);

module.exports = router;
