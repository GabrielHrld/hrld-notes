const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("index.hbs");
});

router.get("/About", (req, res) => {
  res.render("about.hbs");
});

module.exports = router;
