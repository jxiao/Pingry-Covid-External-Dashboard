const router = require('express').Router();
let Summarystat = require('../models/summarystat.model'); 
 
router.route('/').get((req, res) => {
  Summarystat.find()
    .then(summarystats => {
      res.json(summarystats);
    })
    .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;