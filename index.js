require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();

const port = 3000;
const api_key = process.env.API_KEY;
console.log(process.env.API_KEY);
app.get("/api/movies", (req, res) => {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${api_key}`,
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data.results);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.get("/api/trending", (req, res) => {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${api_key}`,
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data.results);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.get("/api/series", (req, res) => {
  const options = {
    method: "GET",
    url: ` https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${api_key}`,
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data.results);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.get("/api/upcomingseries", (req, res) => {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1&api_key=${api_key}`,
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data.results);
    })
    .catch(function (error) {
      console.error(error);
    });
});
app.get("/api/upcomingmovies", (req, res) => {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=${api_key}`,
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data.results);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.get("/api/recommendations", (req, res) => {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/${req.query.mode || req.query.mode2}/${
      req.query.id
    }/recommendations?language=en-US&page=1&sort_by=popularity.desc&api_key=${api_key}`,
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data.results);
    })
    .catch(function (error) {
      console.error("error");
    });
});

app.get("/api/download/movie", async (req, res) => {
  const id = req.query.id;
  console.log("download id", id);
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${api_key}`,
  };

  try {
    const firstResponse = await axios.request(options);
    const firstData = firstResponse.data?.imdb_id;

    const secondResponse = await axios.request(
      `https://yts.mx/api/v2/movie_details.json?imdb_id=${firstData}`
    );
    const secondData = secondResponse.data.data.movie?.torrents;

    res.json(secondData);
  } catch (error) {
    console.error("Error:", error);
  }
  await axios.request(options).then((response) => {
    const data = response.data;
    return response.data;
  });

  await axios.request(options).then((response) => {
    const data = response.data;
    return response.data;
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
