var express = require('express');
var User = require('../models/User')
var router = express.Router();

/// user verify. No auth
router.route('/:email/:code').get(function(req,res){
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
				usr.updateAttributes({
				  verified_email: true
				}).then(function(){
					res.json({ message: 'User verified',code : 200 });
				})
			}
			else{
				res.json({ message: 'User could not be verified',code : 203 });
			}
		}
		
	});

});
router.route('/mobile/:mobile/:code').get(function(req,res){
	var u_mobile = req.params.mobile;
	var code = req.params.code;
	User.findOne({
		//attributes: ['hash'],
		where : {
			mobile : u_mobile
		}
	}).then(function(usr){
		if(!usr){
			res.json({ message: 'User does not exists',code : 404 });
		}
		else{
			if(code == usr.sms_code){
				usr.updateAttributes({
				  verified_mobile: true
				}).then(function(){
					res.json({ message: 'User verified',code : 200 });
				})
				
			}
			else{
				res.json({ message: 'User could not be verified',code : 203 });
			}
		}
		
	});

});

module.exports = router;
