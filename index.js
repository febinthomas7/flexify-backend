require("dotenv").config();
const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const AuthRouter = require("./Routes/AuthRouter");
const MovieSeriesRouter = require("./Routes/MovieSeriesRouter.js");
const app = express();
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
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
