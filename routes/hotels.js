var express = require('express');
var auth = require('../middlewares/UserAuth');
var adminAuth = require('../middlewares/AdminAuth');
var Hotel = require('../models/Hotels');
var Room = require('../models/Room');
var router = express.Router();

/* GET hotel listing. Require user auth */
router.get('/:city_code', auth ,  function(req, res) {
	var i = 0;
	var star_rat = req.query.star || 3;
	var budget_min = req.query.min_price || 0;
	var budget_max = req.query.max_price || 1000;
  Hotel.findAll({
		where : {
			city_code : req.params.city_code,
			star_rating : star_rat
		}
	}).then(function(htl){
		htl = htl || [];
		var ret = [];
		for(i = 0; i < htl.length; i++){
			//console.log(htl[i].name);
			
			ret.push({
				id : htl[i].id,
				name: htl[i].name,
				address: htl[i].address,
				star_rating : htl[i].star_rating,
				user_rating : htl[i].user_rating,
				amenities : htl[i].amenities,
				location_lat : htl[i].location_lat,
				location_lon : htl[i].location_lon,
				city_code : htl[i].city_code,
				image_uri : htl[i].image_uri1,
				min_price : htl[i].min_price
			});
		}
		res.json(ret);
		
	});
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


router.route('/:id').put(adminAuth,function(req, res) {
	var updateObj = {};
	for (var key in req.body) {
		if (req.body.hasOwnProperty(key)) {
			//console.log(key);
			updateObj[key] = req.body[key];
		}
	}
	Hotel.update(updateObj, {
		where: {
		  id: req.params.id
		}
	}).then(function(htl){
		if(!htl){
			res.json({ message: 'Internal error', code : 500 });
		}
		else{
			res.json({ message: 'Success',resource_id : req.params.id, code : 200 });
		}
		
		
	});
});

module.exports = router;
