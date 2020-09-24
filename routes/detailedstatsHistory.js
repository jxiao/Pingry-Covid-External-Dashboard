const router = require("express").Router();
let DetailedstatsHistory = require("../models/detailedstatsHistory.model");

router.route("/").get((req, res) => {
  DetailedstatsHistory.find()
    .then((detailedstats) => {
      res.json(detailedstats);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
