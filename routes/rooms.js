var express = require('express');
var auth = require('../middlewares/UserAuth');
var adminAuth = require('../middlewares/AdminAuth');
var Hotel = require('../models/Hotels');
var router = express.Router();


router.get('/:hotel_id', auth, function(req, res) {
	var hotel = req.params.hotel_id;
	Hotel.findOne({
		where :{
			id : hotel
		}
	}).then(function(htl){
		if(!htl){
			// invalid hotel
			res.json({message: "Invalid hotel id", code : 404});
		}
		else{
			
			htl.getAvailable_rooms().then(function(rms){
				console.log(rms.length);
				var ret = {
					id : htl.id,
					name: htl.name,
					address: htl.address,
					star_rating : htl.star_rating,
					user_rating : htl.user_rating,
					amenities : htl.amenities,
					location_lat : htl.location_lat,
					location_lon : htl.location_lon,
					city_code : htl.city_code,
					rooms : []
				};
				//var ret_rooms = [];
				for(var i = 0; i < rms.length ; i++){
					ret.rooms.push({
						type : rms[i].type,
						count : rms[i].count
					});
				}
				//ret.rooms = ret_rooms;
				res.json(ret);
			});
			
		}
	})
});

module.exports = router;
