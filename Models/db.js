const mongoose = require("mongoose");

const mongo_url = process.env.MONGO_CONNECTION_URL;

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });