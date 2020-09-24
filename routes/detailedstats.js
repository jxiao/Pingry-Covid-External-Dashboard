const router = require("express").Router();
let Detailedstat = require("../models/detailedstat.model");

router.route("/").get((req, res) => {
  Detailedstat.find()
    .then((detailedstats) => {
      res.json(detailedstats);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
