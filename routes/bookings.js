var express = require('express');
var auth = require('../middlewares/UserAuth');
var adminAuth = require('../middlewares/AdminAuth');
var Booking = require('../models/Bookings');
var router = express.Router();

router.route('/:room').post(auth,function(req, res) {
	// this should be the body format. https://github.com/moment/moment/issues/1407
	var start_d = req.body.start_d;
	var end_d = req.body.end_d;
	console.log(start_d);
	console.log(end_d);
	Booking.findOne({
		attributes:['id'],
		where : {
		    $and: [
					{
						start: {
						  $lte: end_d
						}
					},
					{
						end: {
						  $gte: start_d
						}
					},
					{
						room_id : req.params.room
					}
				]
	    }
	}).then(function(booking){
		if(!booking){
			// clean. you may book
			Booking.create({
				start : start_d,
				end : end_d,
				room_id : req.params.room
			}).then(function(booked){
				if(!booked){
					res.json({ message: 'Internal error',code : 500 });
				}
				else{
					res.json({ message: 'Success',code : 200, resource_id: booked.id });
				}
			});
			
		}
		else{
		
			res.json({ message: 'Unavailable for the range',code : 404 });
		}
	});
});

module.exports = router;
