const axios = require("axios");
const api_key = process.env.API_KEY;

const search = (req, res) => {
  const query = req.query.search;
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=true&language=en-US&page=1&api_key=${api_key}`,
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data.results);
    })
    .catch(function (error) {
      console.error(error);
    });
};

const movies = (req, res) => {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${
      req.query.page || "1"
    }&sort_by=popularity.desc&api_key=${api_key}`,
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

const trending = (req, res) => {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/trending/all/day?language=en-US&include_adult=true&api_key=${api_key}`,
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data.results);
    })
    .catch(function (error) {
      console.error(error);
    });
};

const series = (req, res) => {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${
      req.query.page || "1"
    }&sort_by=popularity.desc&api_key=${api_key}`,
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

const upcomingseries = (req, res) => {
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
};

const upcomingmovies = (req, res) => {
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
};

const recommendations = (req, res) => {
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
};

const similar = (req, res) => {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/${req.query.mode || req.query.mode2}/${
      req.query.id
    }/similar?language=en-US&page=1&sort_by=popularity.desc&api_key=${api_key}`,
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data.results);
    })
    .catch(function (error) {
      console.error("error");
    });
};

const topratedmovies = (req, res) => {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${api_key}`,
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data.results);
    })
    .catch(function (error) {
      console.error("error");
    });
};

const trailer = (req, res) => {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/${
      req.query.mode || req.query.mode2 || "movie"
    }/${req.query.id}/videos?language=en-US&api_key=${api_key}`,
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data.results);
    })
    .catch(function (error) {
      console.error("error");
    });
};
const download = async (req, res) => {
  const id = req.query.id;

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
    console.error("Error download:", error);
  }
};

const credits = (req, res) => {
  const { id, mode } = req.query;

  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/${mode}/${id}/credits?language=en-US&api_key=${api_key}`,
  };

  try {
    axios.request(options).then((response) => {
      res.json(response.data);
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = {
  search,
  movies,
  trending,
  series,
  upcomingseries,
  upcomingmovies,
  recommendations,
  topratedmovies,
  similar,
  trailer,
  download,
  credits,
};
