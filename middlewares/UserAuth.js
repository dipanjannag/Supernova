var User = require('../models/User');
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
				res.json({ message: 'Unauthorized', code : 403 }); 
				res.end();
			}
			else{
				if(usr.session_key == secret){
					next();
				}
				else{
					res.json({ message: 'Unauthorized', code : 403 }); 
					res.end();
				}
			}
		});
		
	}
	else{
		res.json({ message: 'Unauthorized', code : 403 }); 
		res.end();
	}
}

module.exports = verify_user_authority;
