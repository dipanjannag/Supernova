var express = require('express');
var auth = require('../middlewares/UserAuth');
var adminAuth = require('../middlewares/AdminAuth');
var Booking = require('../models/Bookings');
var router = express.Router();
var http = require('http')

router.route('/:room').post(auth,function(req, res) {
	// this should be the body format. https://github.com/moment/moment/issues/1407
	// I think a strict check should be there to check proper date format
	var start_d = req.body.start_d;
	var end_d = req.body.end_d;
	//console.log(start_d);
	//console.log(end_d);
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
					//handle_partner_confirmation('+918158953392', booked.id);
					//var accountSid = 'ACf6eec32361a5ddbf7025d202e4ec3fc6'; 
					//var authToken = '9ff3d3048596aead6751fdd74fb3d55b​'; 
					 
					//require the Twilio module and create a REST client 
					var client = require('twilio');
					client = client('ACf6eec32361a5ddbf7025d202e4ec3fc6', '9ff3d3048596aead6751fdd74fb3d55b​');
					client.calls.create({ 
						to: '+918158953392', 
						from: "+12013654002", 
						url: 'http://shortrip-supernova.herokuapp.com/call_partner/'+ booked.id,           
					}, function(err, call) {
							res.json({ message: 'Success',code : 200, resource_id: booked.id, e: err, c : call }); 
					});
					
					
					
				}
			});
			
		}
		else{
		
			res.json({ message: 'Unavailable for the range',code : 404 });
		}
	});
});


var e2 = '';
var handle_partner_confirmation = function(call_in_number, booking_id){
	var accountSid = 'ACf6eec32361a5ddbf7025d202e4ec3fc6'; 
	var authToken = '9ff3d3048596aead6751fdd74fb3d55b​'; 
	 
	//require the Twilio module and create a REST client 
	var client = require('twilio')(accountSid, authToken);
	client.calls.create({ 
		to: call_in_number, 
		from: "+12013654002", 
		url: 'http://shortrip-supernova.herokuapp.com/call_partner/'+ booking_id,           
	}, function(err, call) {
			e2 = err;
			e2 = call; 
		//console.log(call.sid); 
	});
}
module.exports = router;
