const router = require("express").Router();
let Statewide = require("../models/statewide.model");

router.route("/").get((req, res) => {
  Statewide.find()
    .then((statewides) => {
      res.json(statewides);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
