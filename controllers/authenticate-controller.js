/**
 * Handler for jsonwebtoken authentication
 */
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');

module.exports.verifyToken = function(request, response, next) {
	console.log('token: test');
	next();
}

module.exports.upsertUser = function(request, response, next) {
	var payload = request.body;
	var pwdhash = crypto.createHash('md5').update(payload.password).digest("hex");

	var user = new User({
		username    : payload.username,
		displayname : payload.displayname,
		pwdhash     : pwdhash,
		admin       : payload.admin,
		active      : payload.active,
		identities  : payload.identities
	});
	
	user.save(function (err, data) {
		if (err) {
			return next(err);
		}
		console.log('saved user: ' + JSON.stringify(data))
	})

	response.json(user);
}