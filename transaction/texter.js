var sid = 'ACf6eec32361a5ddbf7025d202e4ec3fc6'
var secret = '9ff3d3048596aead6751fdd74fb3d55b​'
var twilio_no = '+12013654002'

var client = require('twilio')(sid, secret)




var send_sign_up_confirm = function(mobile, name, code){
	client.messages.create({
		to: mobile,
		from: twilio_no,
		body : 'Thank You '+ name +' for signing up for shortrip. Please use the following code to verify: ' + code
	}, function(err, message){
		//console.log(err);
		//console.log(message);
	});
};

var send_booking_confirmation = function(mobile, dateString, duration, hotelName, bookingId){

	txt = 'Your booking number '+bookingId+' has been confirmed for ' + hotelName + ' from '+ dateString + ' for '+ duration + ' hours.'+
				' Enjoy your shortrip.';
	client.messages.create({
		to: mobile,
		from: twilio_no,
		body : txt
	}, function(err, message){
		//console.log(err);
		//console.log(message);
	});
};

send_sign_up_confirm('+918158953392', 'Dipanjan', 3758);
//send_booking_confirmation('+918348300601', '29-Jun-16', 8, 'Radison Blue', '3458975');


