const userModal = require("../Models/userModel");
const app = require("../FireBase");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");

const storage = getStorage(app);

const userDp = async (req, res) => {
  if (!req.file) {
    return res.redirect(`${process.env.BASE_URL}/myprofile`);
  }
  try {
    const storageRef = ref(
      storage,
      `/avatar/${req.query.email.split("@")[0]}/${
        req.query.userId + "." + req.file?.originalname.split(".")[1]
      }`
    );
    const metadata = {
      contentType: req.file.mimetype,
    };

    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );

    const downloadUrl = await getDownloadURL(snapshot.ref);

    const user = await userModal.findOne({ _id: req.query.userId });
    user.dp = downloadUrl;

    user.name = req.query.name;

    await user.save();

    res.redirect(`${process.env.BASE_URL}/myprofile`);
  } catch (error) {
    console.error("Error deleting data:", error);
    return res.redirect(`${process.env.BASE_URL}/myprofile`);
  }
};

module.exports = userDp;
