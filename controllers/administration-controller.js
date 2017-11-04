var User = require('../models/user');
var crypto = require('crypto');

//new document or edit
module.exports.upsert = function(request, response) {
	var location = new Location(request.body);
	
	if (allowedPhoneIds.indexOf(location.phoneid) > -1) {
		Location.findOneAndUpdate (
				  { "_id": location._id },       //your condition for check
				  { $set: location },       //new values you want to set
				  { upsert: true, 'new': true }).exec(function (err, data){
						if (err) {
							console.error(err);
							return next(err);
						}
						response.status(201).json(data);
				  });
		
	} else {
		console.log("forbidden phoneid")
		response.status(405).send("not allowed");
	}
	
}

module.exports.upsertUser = function(request, response, next) {
	var payload = request.body;
	var pwdhash = crypto.createHash('md5').update(payload.password).digest("hex");

	var user = new User({
		_id         : payload._id,
		username    : payload.username,
		displayname : payload.displayname,
		pwdhash     : pwdhash,
		admin       : payload.admin,
		active      : payload.active,
		identities  : payload.identities
	});
	
	User.findOneAndUpdate (
			  { "_id": payload._id },       //your condition for check
			  { $set: user },       //new values you want to set
			  { upsert: true, 'new': true }).exec(function (err, data){
					if (err) {
						console.error(err);
						return next(err);
					}
					response.status(201).json(data);
			  });
}