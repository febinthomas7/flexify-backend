const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
const data = [
  { title: "The Shawshank Redemption", year: 1994, genre: "Drama" },
  { title: "The Godfather", year: 1972, genre: "Crime" },
  { title: "Pulp Fiction", year: 1994, genre: "Crime" },
  { title: "The Dark Knight", year: 2008, genre: "Action" },
  { title: "Inception", year: 2010, genre: "Thriller" },
];

app.get("/home", (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
