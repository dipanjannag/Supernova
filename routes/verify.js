var express = require('express');
var User = require('../models/User')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

/// user login. would create and return session key
router.route('/verify/:email/:code').get(function(req,res){
	var u_email = req.params.email;
	var code = req.params.code;
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
			if(code == usr.email_code){
				res.json({ message: 'User verified',code : 200 });
			}
			else{
				res.json({ message: 'User could not be verified',code : 203 });
			}
		}
		
	});

});
router.route('/verify_mobile/:mobile/:code').get(function(req,res){
	var mobile = req.params.mobile;
	var code = req.params.code;
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
			if(code == usr.email_code){
				res.json({ message: 'User verified',code : 200 });
			}
			else{
				res.json({ message: 'User could not be verified',code : 203 });
			}
		}
		
	});

})
