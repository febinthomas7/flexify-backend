const chatModel = require("../Models/chatModel");
const userModel = require("../Models/userModel");
const messageModel = require("../Models/messageModel");
const app = require("../FireBase");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const { v4: uuidv4 } = require("uuid");
const { getReceiverSocketId, io } = require("../socket/socket");
const storage = getStorage(app);

const sendmessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    // console.log(req.query.image);
    const image = req.files?.image?.[0];
    console.log(image);
    if (message == "" && !image) {
      return res
        .status(400)
        .json({ message: "Message cannot be empty", success: false });
    }

    let convo = await chatModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!convo) {
      convo = await chatModel.create({
        participants: [senderId, receiverId],
      });
    }
    let imageUrl;
    if (image) {
      const imageRef = ref(
        storage,
        `/chatImages/${uuidv4() + "." + imageRef.originalname.split(".")[1]}`
      );

      const avatarSnapshot = await uploadBytesResumable(
        imageRef,
        imageRef.buffer,
        {
          contentType: imageRef.mimetype,
        }
      );

      imageUrl = await getDownloadURL(avatarSnapshot.ref);

      // imageUrl = await getDownloadURL(avatarSnapshot.ref);
      // user.imageUrl = imageUrl;
    }

    const newMessage = new messageModel({
      senderId,
      receiverId,
      message,
      imageUrl,
    });

    if (newMessage) {
      convo.messages.push(newMessage._id);
    }

    await Promise.all([convo.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json({ newMessage, success: true, receiverId, senderId });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",

      success: false,
    });
  }
};

const getmessage = async (req, res) => {
  const { senderId, receiverId } = req.query;
  try {
    const convo = await chatModel
      .findOne({
        participants: { $all: [senderId, receiverId] },
      })
      .populate("messages");

    if (!convo) return res.status(200).json({ success: true, message: [] });

    const message = convo.messages;
    res
      .status(200)
      .json({ success: true, message, chatId: convo.participants });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const user = async (req, res) => {
  const { id } = req.query;
  try {
    const user = await userModel.findById(id).select("-password");
    res.status(200).json({ message: "users", success: true, data: user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const getusers = async (req, res) => {
  const { id } = req.query;
  try {
    const user = await userModel.find({ _id: { $ne: id } }).select("-password");

    res.status(200).json({ message: "users", success: true, data: user });
  } catch (error) {
    res.status(500).json({ message: "users", error: error });
  }
};
module.exports = { sendmessage, getmessage, user, getusers };