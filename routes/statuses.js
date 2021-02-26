const router = require("express").Router();
let Statuses = require("../models/statuses.model");

router.route("/").get((req, res) => {
  Statuses.find()
    .then((statuses) => {
      res.json(statuses);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
