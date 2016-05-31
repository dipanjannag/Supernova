var express = require('express');
var router = express.Router();
var Booking = require('../models/Bookings')

router.get('/:booking_id', function(req, res) {
	Booking.findOne({
		where : {
			id : req.params.booking_id
		}
	}).then(function(booking){
		if(!booking){
		}
		else{
			strt_dt = booking.start;
			end_dt = booking.end;
			milisec = Math.abs(end_dt - strt_dt);
			hour = milisec/(1000*60*60);
			hour = Math.round(hour * 100) / 100
			var o2x = require('object-to-xml');
			res.set('Content-Type', 'text/xml');
			res.send(o2x({
					'?xml version="1.0" encoding="utf-8"?' : null,
					Response : {
						  '#' : {
								Gather : {
									'@': {
										action : '/partner_response?bookingid='+ booking.id ,
										method : 'POST'
									},
									'#' : {
										Say : 'You have a booking on '+  strt_dt.toDateString() + ' for ' + hour + ' hour. Press 1 to reject'
									}
								},
								Say : 'Thank you.'
							}
					}
			}));
		}
	})
});
router.post('/:booking_id', function(req, res) {
	Booking.findOne({
		where : {
			id : req.params.booking_id
		}
	}).then(function(booking){
		if(!booking){
		}
		else{
			strt_dt = booking.start;
			end_dt = booking.end;
			milisec = Math.abs(end_dt - strt_dt);
			hour = milisec/(1000*60*60);
			hour = Math.round(hour * 100) / 100
			var o2x = require('object-to-xml');
			res.set('Content-Type', 'text/xml');
			res.send(o2x({
					'?xml version="1.0" encoding="utf-8"?' : null,
					Response : {
						  '#' : {
								Gather : {
									'@': {
										action : '/partner_response?bookingid='+ booking.id ,
										method : 'POST'
									},
									'#' : {
										Say : 'You have a booking on '+  strt_dt.toDateString() + ' for ' + hour + ' hour. Press 1 to reject'
									}
								},
								Say : 'Thank you.'
							}
					}
			}));
		}
	})
});

module.exports = router;
