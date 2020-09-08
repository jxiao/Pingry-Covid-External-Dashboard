const router = require("express").Router();
let PingryInternal = require("../models/pingryInternal.model");

router.route("/").get((req, res) => {
  PingryInternal.find()
    .then((pingryInternals) => {
      res.json(pingryInternals);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
