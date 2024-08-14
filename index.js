require("dotenv").config();
const express = require("express");

const app = express();
// const { createServer } = require("node:http");
// const server = createServer(app);

// const { Server } = require("socket.io");

// const io = new Server(server, { cors: { origin: process.env.BASE_URL } });
const cors = require("cors");
const bodyParser = require("body-parser");
const AuthRouter = require("./Routes/AuthRouter");
const MovieSeriesRouter = require("./Routes/MovieSeriesRouter.js");
const UserChat = require("./Routes/UserChat");

require("./Models/db");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var corsOptions = {
  origin: process.env.BASE_URL,
  method: ["GET", "POST"],
};
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use("/auth", AuthRouter);
app.use("/api", MovieSeriesRouter);
app.use("/chat", UserChat);
const port = process.env.PORT;
// io.on("connection", (socket) => {
//   console.log("a user connected", socket.id);

//   socket.on("create-something", (message) => {
//     console.log("got message", message);
//   });

//   socket.on("disconnect", () => {
//     console.log(`User disconnected: ${socket.id}`);
//   });
// });

app.listen(port, () => {
  // Use server.listen instead of app.listen
  console.log(`Server listening on port ${port}`);
});
