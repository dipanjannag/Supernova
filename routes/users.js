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
		attributes: ['hash'],
		where : {
			email : u_email
		}
	}).then(function(usr){
		if(!usr){
			res.json({ message: 'User does not exists',code : 404 });
		}
		else{
			if(usr.hash = u_password){
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
						res.json({ message: 'Success', session_key : "chvkjkjh" , code : 200 });
					}
				});
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
				passowrd : u_password,
				verified_email : false,
				verified_mobile : false
			}).then(function(ussr){
				if(!ussr){
					res.json({ message: 'Internal error',code : 500 });
				}
				else{
					res.json({ message: 'Success',code : 200, resource_id : ussr.email });
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





module.exports = router;
