var express = require('express');
var auth = require('../middlewares/UserAuth');
var adminAuth = require('../middlewares/AdminAuth');
var Booking = require('../models/Bookings');
var router = express.Router();

router.route('/:room/:start_d/:end_d').post(auth,function(req, res) {
	var start_d = new Date(req.params.start_d);
	var end_d = new Date(req.params.end_d);
	Booking.findAll({
		attributes:['id'],
		where : {
		    $and: [
					{
						start: {
						  $le: end_d
						}
					},
					{
						end: {
						  $ge: start_d
						}
					}
				]
	    }
	}).then(function(booking){
		if(!booking){
			// clean. you may book
			Booking.create({
				start : start_d,
				end : end_d,
				room_id : room
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
	})
});
