const router = require("express").Router();
let Testing = require("../models/testing.model");

router.route("/").get((req, res) => {
  Testing.find()
    .then((test) => {
      res.json(test);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
