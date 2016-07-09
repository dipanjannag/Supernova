var express = require('express');
var auth = require('../middlewares/UserAuth');
var adminAuth = require('../middlewares/AdminAuth');
var Halls = require('../models/Halls');
var Room = require('../models/Room');
var router = express.Router();

/* GET hotel listing. Require user auth */
router.get('/:city_code', auth ,  function(req, res) {
	var i = 0;
	var star_rat = req.query.star || 3;
	var budget_min = req.query.min_price || 0;
	var budget_max = req.query.max_price || 1000;
  Halls.findAll({
		where : {
			city_code : req.params.city_code,
			star_rating : star_rat,
			min_price : {
				$lte: budget_max,
				$gte: budget_min
			},
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

module.exports = router;
