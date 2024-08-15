const router = require("express").Router();

const {
  sendmessage,
  getmessage,
  user,
  getusers,
} = require("../Controllers/ChatController");
router.post("/sendmessage", sendmessage);

router.get("/getmessage", getmessage);

router.get("/user", user);

router.get("/getusers", getusers);
module.exports = router;
