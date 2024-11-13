const router = require("express").Router();

const {
  search,
  anime,
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
  person,
  combinedcredits,
  actors,
} = require("../Controllers/MovieController");

router.get("/search", search);

router.get("/movies", movies);

router.get("/anime", anime);

router.get("/trending", trending);

router.get("/series", series);

router.get("/upcomingseries", upcomingseries);
router.get("/upcomingmovies", upcomingmovies);

router.get("/recommendations", recommendations);

router.get("/similar", similar);

router.get("/topratedmovies", topratedmovies);
router.get("/person", person);
router.get("/combinedcredits", combinedcredits);
router.get("/actors", actors);

router.get("/trailer", trailer);

router.get("/download/movie", download);

router.get("/credits", credits);

module.exports = router;
