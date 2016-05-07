var User = require('../path_to_user')
var AdminUser = require('../path')
// this middleware will be used to verify all user authorization
var verify_user_authority = function(req,res,next){
	if ("user" in req.headers){
		// try authenticating as user
		var user = req.get('user');
		var secret = req.get('secret');
		// at this point search database to verify authorization
		User.findOne({
			attributes: ['session_key'],
		    where: {
			    email : user
		    }
		}).then(function(usr){
			// check this statement
			if(!usr){
				res.end();
			}
			else{
				if(usr.session_key == secret){
					next();
				}
				else{
					res.end();
				}
			}
		});
		else{
			res.end();
		}
	}
	else{
		res.end();
	}
}

var verify_admin_authority = function(req,res,next){
	if ("admin-user" in req.headers){
		// try authenticating as user
		var user = req.get('admin-user');
		var secret = req.get('secret');
		// at this point search database to verify authorization
		AdminUser.findOne({
			attributes : ['session_key'],
			where : {
				email : user
			}
		}).then(function(usr){
			if(!user){
				// check this logic
				res.end();
			}
			else{
				if(usr.session_key == secret){
					next();
				}
				else{
					res.end();
				}
			}
		});
	}
	else{
		res.end();
	}
}

var verify_super_admin_authority = function(req,res,next){
	if ("super-admin" in req.headers){
		// try authenticating as user
		var user = req.get('super-admin');
		var secret = req.get('secret');
		if(user == "acdh3546"){
			if(secret == "i12u522p74a#"){
				next();
			}
			else{
				res.end();
			}
		}
		else{
			res.end();
		}
	}
	else{
		res.end();
	}
}