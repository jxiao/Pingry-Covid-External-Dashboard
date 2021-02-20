const router = require("express").Router();
let UpdatedTesting = require("../models/updatedTesting.model");

router.route("/").get((req, res) => {
  UpdatedTesting.find()
    .then((test) => {
      res.json(test);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
