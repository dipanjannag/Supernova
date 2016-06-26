var Room = require('../models/Room');
var Hotel = require('../models/Hotels');
var express = require('express');
var auth = require('../middlewares/UserAuth');
var adminAuth = require('../middlewares/AdminAuth');
var Booking = require('../models/Bookings');
var router = express.Router();
var http = require('http')

router.route('/').get(auth,function(req, res) {
	var user = req.get('user');
	Booking.findAll({
		where : {
			customerEmail : user
		}
	}).then(function(bookings){
		var bookings = bookings || [];
		var ret = [];
		for(var i = 0; i < bookings.length ; i++){
			ret.push({
				id : bookings[i].id,
				start : bookings[i].start,
				end : bookings[i].end,
				rejected : bookings[i].rejected,
				room_id : bookings[i].room_id
			})
		}
		res.json(ret);
	})
});

router.route('/:id').get(auth,function(req, res) {
	Booking.findOne({
		where : {
			id : req.params.id
		}
	}).then(function(booking){
		if(booking == null){
			res.json({code : 404, message : 'no booking found'});
			return;		
		}
		Room.findOne({
			where : {
				id : booking.room_id
			}		
		}).then(function(room){
			Hotel.findOne({ 
				where : {
					id : room.HotelId
				}
			}).then(function(htl){
				res.json({ id: booking.id, start : booking.start, end : booking.end, hotel_id : htl.id, hotel_name: htl.name, hotel_address: htl.address,
				hotel_image : htl.image_uri1 });
			})
			
		})
	})
})


var isDate = function(date) {
    return ( (new Date(date) !== "Invalid Date" && !isNaN(new Date(date)) ));
}
router.route('/:room').post(auth,function(req, res) {
	// this should be the body format. https://github.com/moment/moment/issues/1407
	// I think a strict check should be there to check proper date format
	var start_d = req.body.start_d;
	var end_d = req.body.end_d;
	console.log(start_d)
	console.log(end_d)
	console.log(isDate(start_d))
	console.log(isDate(end_d))
	if(isDate(start_d)&&isDate(end_d)){
	}
	else{
		res.json({ message: 'Invalid date range passed',code : 500 });
		return;
	}
	if(new Date(start_d) > new Date(end_d)){
		res.json({ message: 'End date should be higher than start date',code : 500 });
		return;
	}
	//console.log(start_d);
	//console.log(end_d);
	Booking.findAll({
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
		//console.log(booking)
		booking = booking || [];
		var count = booking.length;
		Room.findOne({
			attributes:['count'],
			where: {
				id: req.params.room
			}
		}).then(function(room){
			//console.log(room.count)
			//console.log(count)
			if(room.count > count){
				
				// clean. you may book

				Booking.create({
					start : start_d,
					end : end_d,
					room_id : req.params.room,
					customerEmail : req.get('user')
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
						client = client('ACf6eec32361a5ddbf7025d202e4ec3fc6', '9ff3d3048596aead6751fdd74fb3d55b');
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
		})
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
