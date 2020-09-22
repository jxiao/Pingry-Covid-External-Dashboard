const router = require("express").Router();
let PingryInternalTesting = require("../models/pingryInternalTesting.model");

router.route("/").get((req, res) => {
  PingryInternalTesting.find()
    .then((pingryInternals) => {
      res.json(pingryInternals);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
