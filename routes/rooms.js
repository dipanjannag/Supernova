var express = require('express');
var auth = require('../middlewares/UserAuth');
var adminAuth = require('../middlewares/AdminAuth');
var Hotel = require('../models/Hotels');
var Room = require('../models/Room');
var router = express.Router();


router.route('/:hotel_id/:typ/:count/:price').post(adminAuth,function(req, res) {
	var hotel = req.params.hotel_id;
	var need_update = false;
	Hotel.findOne({
		where :{
			id : hotel
		}
	}).then(function(htl){
		if(!htl){
			res.json({message: "Invalid hotel id", code : 404});
		}
		else{
			if(htl.min_price > req.params.price){
				// updtae min price of hotel
				need_update = true;
			}
			// find if there is a room type already. then update count
			Room.findOne({
				where: {
					HotelId: htl.id,
					type : req.params.typ
				}
			}).then(function(rm){
				if(!rm){
					// create a new room
					Room.create({type : req.params.typ, count : req.params.count, HotelId : htl.id, price_per_hour : req.params.price}).then(function(rms){
						if(!rms){
							res.json({message: "Internal Error", code : 500});
						}
						else{
							//res.json({message: "Success", code : 200, resource_id : rms.id});
							if(need_update){
								Hotel.update({
									min_price : req.params.price,
								}, {
									where: {
										id : hotel
									}
								}).then(function(hh){
									// here the request ends
								});
							}
							res.json({message: "Success", code : 200, resource_id : rms.id});
						}
					});
				}
				else{
					// update count
					Room.update({
						count: req.params.count,
						price_per_hour : req.params.price
					}, {
						where: {
							HotelId: htl.id,
							type : req.params.typ
						}
					}).then(function(uRoom){
						if(!uRoom){
							res.json({message: "Internal Error", code : 500});
						}
						else{
							if(need_update){
								Hotel.update({
									min_price : req.params.price,
								}, {
									where: {
										id : hotel
									}
								}).then(function(hh){
									//res.json({message: "Success", code : 200, resource_id : rms.id});
								});
							}
							res.json({message: "Success", code : 200, resource_id : uRoom.id});
						}
					});
				}
			});
			
		}
	});

});

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
						id : rms[i].id,
						type : rms[i].type,
						count : rms[i].count,
						price : rms[i].price_per_hour,
						price_4_hour : rms[i].price_4_hour,
						price_12_hour : rms[i].price_12_hour,
						price_24_hour : rms[i].price_24_hour,
						price_48_hour : rms[i].price_48_hour,
						price_72_hour : rms[i].price_72_hour
					});
				}
				//ret.rooms = ret_rooms;
				res.json(ret);
			});
			
		}
	})
});

module.exports = router;
