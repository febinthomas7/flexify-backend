const express = require("express");

const app = express();

const port = 3000;

app.get("/api/movies", async (req, res) => {
  await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=ecc3e9c5cba652d1c2a54be405ebd4d2`
  ).then((data) => res.json(data.json()));
});

app.get("/api/trending", (req, res) => {
  const data = [
    { title: "The Shawshank Redemption", year: 1994, genre: "Drama" },
    { title: "The Godfather", year: 1972, genre: "Crime" },
    { title: "Pulp Fiction", year: 1994, genre: "Crime" },
    { title: "The Dark Knight", year: 2008, genre: "Action" },
    { title: "Inception", year: 2010, genre: "Thriller" },
  ];
  res.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
