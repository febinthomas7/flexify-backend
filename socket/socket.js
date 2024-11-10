const { Server } = require("socket.io");
const { createServer } = require("node:http");
// const { Socket } = require("node:dgram");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.BASE_URL,
    methods: ["GET", "POST"],
  },
});

const getReceiverSocketId = (receiverId) => {
  return userSocketId[receiverId];
};

const userSocketId = {};
io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketId[userId] = socket.id;

  io.emit("getOnlineUser", Object.keys(userSocketId));
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    delete userSocketId[userId];
    io.emit("getOnlineUser", Object.keys(userSocketId));
  });
});

module.exports = { app, io, server, getReceiverSocketId };
