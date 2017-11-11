/**
 * Handler for jsonwebtoken authentication
 */
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var config = require('../config').Config;

module.exports.logout = function(request, response) {
	response.clearCookie('token');
	response.json({authenticated: false});
}

module.exports.verifyToken = function(request, response, next) {
	console.log('all cookies: ' + request.cookies)
	
	var token = request.cookies['token'];
	console.log('token: ' + token)

	if (!token) {
		console.log(request.path)
		response.status(403).send("please provide a token");
	} else {
		jwt.verify(token, config.secretKey(), function(err, decode) {
			if (err) {
				response.status(500).send("Invalid Token");
			} else {
				// refersh cookie
				response.cookie('token',token,{ httpOnly: true, maxAge: 30 * 60 * 1000 });
				console.log("token verified")
				next();
			}
		});
	}
}

module.exports.authenticate = function (request, response) {
	var username = request.body.username;
	var password = request.body.password;
	
	User.find({username: username}, function(err, data) {
		if (err) {
			return next(err);
		}
		
		if (1 == data.length) {
			var user = data[0];
			var pwdhash = crypto.createHash('md5').update(password).digest("hex");
			
			if (user.active && pwdhash === user.password) {
				var token = jwt.sign(user.toObject(), config.secretKey() , {expiresIn: 4000});
				response.cookie('token',token,{ httpOnly: true, secure: config.secureCookie(), maxAge: 30 * 60 * 1000 });
				user.password = null;
				response.json({authenticated: true, user: user});
			} else {
				response.status(403).json({authenticated: false});
			}
		} else {
			response.status(403).json({authenticated: false});
		}
	});
}


module.exports.upsertUser = function(request, response, next) {
	var user = new User(request.body);
	if (user.password && user.password != null) {
		var pwdhash = crypto.createHash('md5').update(user.password).digest("hex");
		user.password = pwdhash;
	}
	
	User.findOneAndUpdate (
		{ "_id": user._id },
		{ $set: user },
		{ upsert: true, 'new': true }).exec(function (err, data){
			if (err) {
				console.error(err);
				return next(err);
			}
			response.status(201).json(data);
		});
}
