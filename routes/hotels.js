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
router.route('/:nm/:c_code').post(adminAuth,function(req, res) {
  Hotel.create({
		name : req.params.nm,
		city_code : req.params.c_code
	}).then(function(hotel){
		if(!hotel){
			res.json({ message: 'Internal error', code : 500 });
		}
		else{
			res.json({ message: 'Success',resource_id : hotel.id, code : 200 });
		}
	});
});

module.exports = router;
