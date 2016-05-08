var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/',  function(req, res) {
  res.json({title: 'shorTrip core api', codeName: 'Supernova', version : '0.0.1-alpha'});
});

module.exports = router;
