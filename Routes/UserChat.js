const router = require("express").Router();
const axios = require("axios");
const api_key = process.env.API_KEY;
const mongoose = require("mongoose");

const chatModel = require("../Models/chatModel");
const messageModel = require("../Models/messageModel");
const userModel = require("../Models/userModel");

router.post("/createchat", async (req, res) => {
  const { senderid, recevierid } = req.body;
  console.log(senderid, recevierid);
  try {
    // Validate incoming data (you can use a validation library like Joi for this)

    const userchat = await chatModel.create({
      chatname: "yoo",
      users: [senderid, recevierid],
    });

    const user1 = await userModel.findById(senderid);
    user1.chat.push(userchat._id);
    await user1.save();
    const user2 = await userModel.findById(recevierid);
    user2.chat.push(userchat._id);
    await user2.save();

    // Send a success response
    res
      .status(201)
      .json({ message: "added", success: true, chatId: userchat._id });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
});
router.post("/sendmessage", async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    console.log(senderId, receiverId);
    if (message == "") {
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

    const newMessage = new messageModel({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      convo.messages.push(newMessage._id);
    }

    await Promise.all([convo.save(), newMessage.save()]);

    res.status(200).json({ message, success: true, receiverId, senderId });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",

      success: false,
    });
  }
});

router.get("/getmessage", async (req, res) => {
  const { senderId, receiverId } = req.query;
  try {
    const convo = await chatModel
      .findOne({
        participants: { $all: [senderId, receiverId] },
      })
      .populate("messages");

    if (!convo) return res.status(200).json({ success: true, message: [] });

    const message = convo.messages;
    res.status(200).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
});

router.get("/user", async (req, res) => {
  const { id } = req.query;
  try {
    const user = await userModel.findById(id).select("-password");
    res.status(200).json({ message: "users", success: true, data: user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
});

router.get("/getusers", async (req, res) => {
  const { id } = req.query;
  console.log(id);
  try {
    const user = await userModel.find({ _id: { $ne: id } }).select("-password");

    res.status(200).json({ message: "users", success: true, data: user });
  } catch (error) {
    res.status(500).json({ message: "users", error: error });
  }
});
module.exports = router;
