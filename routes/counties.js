const router = require("express").Router();
let County = require("../models/county.model");

router.route("/").get((req, res) => {
  County.find()
    .then((counties) => {
      res.json(counties);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
