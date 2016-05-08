var express = require('express');
var auth = require('../middlewares/UserAuth');
var adminAuth = require('../middlewares/AdminAuth');
var Hotel = require('../models/Hotels');
var router = express.Router();

/* GET hotel listing. Require user auth */
router.get('/:city_code/:date',auth ,  function(req, res) {
  res.send('respond with a resource');
});

/// Create a new hotel. Requires admin auth
router.route('/:name').post(adminAuth,function(req, res) {
  //Hotel.create({
		res.send('respond with a resource');
	//});
});

module.exports = router;
