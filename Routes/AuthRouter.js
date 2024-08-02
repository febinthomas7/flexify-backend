const router = require("express").Router();
const { signin, login } = require("../Controllers/AuthController");
const ensureAuthentication = require("../Middlewares/Auth");
const {
  signinValidation,
  logininValidation,
} = require("../Middlewares/AuthValidation");
router.post("/signin", signinValidation, signin);

router.post("/login", logininValidation, login);

router.get("/userlist", ensureAuthentication, (req, res) => {
  res.status(200).json([
    { id: 1, title: "Inception", thumbnail: "p3.webp" },
    { id: 2, title: "The Matrix", thumbnail: "p2.webp" },
    { id: 3, title: "Interstellar", thumbnail: "p1.webp" },
  ]);
});
module.exports = router;
