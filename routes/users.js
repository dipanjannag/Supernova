var express = require('express');
var User = require('../models/User')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

/// user login. would create and return session key
router.route('/login').post(function(req, res) {
	var u_email = req.body.email;
	var u_password = req.body.password;
	User.findOne({
		//attributes: ['hash'],
		where : {
			email : u_email
		}
	}).then(function(usr){
		if(!usr){
			res.json({ message: 'User does not exists',code : 404 });
		}
		else{
			console.log(usr.hash);
			
			if(usr.hash == u_password){
				// auth successful. Create session and return
				User.update({
					session_key: '5678',
				}, {
					where: {
						email: u_email
					}
				}).then(function(ussr){
					if(!ussr){
						
						res.json({ message: 'Internal error',code : 500 });
					}
					else{
						res.json({ message: 'Success', session_key : "5678", name : usr.name, mobile: usr.mobile ,email: usr.email, code : 200 });
					}
				});
			}
			else{
				res.json({ message: 'Fail' , code : 403 });
			}
		}
	});
});


/// user signup. requires no auth
router.route('/signup').post(function(req, res) {
  // name, email, mobile, password
	var u_name = req.body.full_name;
	var u_email = req.body.email;
	var u_mobile = req.body.mobile;
	var u_password = req.body.password;
	User.findOne({
		attributes: ['mobile','email'],
	    where: {
		    $or: [
					{
						email: {
						  $eq: u_email
						}
					},
					{
						mobile: {
						  $eq: u_mobile
						}
					}
				]
	    }
	}).then(function(usr){
		if(!usr){
			// cleane user create a new one
			User.create({
				name: u_name,
				email: u_email,
				mobile : u_mobile,
				hash : u_password,
				verified_email : false,
				verified_mobile : false
			}).then(function(ussr){
				if(!ussr){
					res.json({ message: 'Internal error',code : 500 });
				}
				else{
					send_signup_mail(u_name,u_email);
					send_sign_up_confirm('+91'+u_mobile, u_name, 5678);
					res.json({ message: 'Success',code : 200, email: u_email, mobile: u_mobile, name : u_name, session_key: u_password });
				}
			});
		}
		else{
			if(usr.mobile==u_mobile){
				res.json({ message: 'mobile number already registered',code : 405 });
			}
			else{
				res.json({ message: 'email already registered',code : 405 });
			}
		}
	})
});

var sendgrid  = require('sendgrid')('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');


var send_signup_mail = function(name, email){
	var body_html = "Thank you for signing up. Please click the following link to confirm your email id <a href=\"#\">activation link</a>";
	var cardEmail = new sendgrid.Email({
		to: email,
		from: "admin@shortrip.com",
		subject: "Thank You for signing up for Shortrip",
		html: body_html, // This fills out the <%body%> tag inside your SendGrid template
	});

	// Tell SendGrid which template to use, and what to substitute. You can use as many substitutions as you want.
	cardEmail.setFilters({"templates": {"settings": {"enabled": 1, "template_id": "86127c4b-726c-4c30-b108-a645e11d7a38"}}}); // Just replace this with the ID of the template you want to use
	cardEmail.addSubstitution('%name%', name); // You don't need to have a subsitution, but if you want it, here's how you do that :)

	// Everything is set up, let's send the email!
	sendgrid.send(cardEmail, function(err, json){
		if (err) {
		  //console.log(err);
		} else {
		  //console.log('Email sent!');
		}
	});
}

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


module.exports = router;
