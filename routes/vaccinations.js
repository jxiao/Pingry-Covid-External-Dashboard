const router = require("express").Router();
let Vaccination = require("../models/vaccination.model");

router.route("/").get((req, res) => {
  Vaccination.find()
    .then((test) => {
      res.json(test);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
