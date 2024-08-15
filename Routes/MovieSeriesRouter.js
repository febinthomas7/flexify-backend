const router = require("express").Router();

const {
  search,
  movies,
  trending,
  series,
  upcomingseries,
  upcomingmovies,
  recommendations,
  similar,
  topratedmovies,
  trailer,
  download,
  credits,
} = require("../Controllers/MovieController");

router.get("/search", search);

router.get("/movies", movies);

router.get("/trending", trending);

router.get("/series", series);

router.get("/upcomingseries", upcomingseries);
router.get("/upcomingmovies", upcomingmovies);

router.get("/recommendations", recommendations);

router.get("/similar", similar);

router.get("/topratedmovies", topratedmovies);

router.get("/trailer", trailer);

router.get("/download/movie", download);

router.get("/credits", credits);

module.exports = router;
