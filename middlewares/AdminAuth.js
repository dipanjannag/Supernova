var AdminUser = require('../models/AdminUser');
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
module.exports = verify_admin_authority;
