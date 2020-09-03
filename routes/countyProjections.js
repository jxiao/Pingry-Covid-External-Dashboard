const router = require('express').Router();
let CountyProjection = require('../models/countyProjection.model');

router.route('/').get((req, res) => {
  CountyProjection.find()
    .then(countyProjections => {
      res.json(countyProjections);
    })
    .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;