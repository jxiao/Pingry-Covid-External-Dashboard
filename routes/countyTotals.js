const router = require("express").Router();
let CountyTotal = require("../models/countyTotal.model");

router.route("/").get((req, res) => {
  CountyTotal.find()
    .then((countyTotals) => {
      res.json(countyTotals);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
