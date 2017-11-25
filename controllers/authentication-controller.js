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
	//console.log('all cookies: ' + request.cookies)
	
	var token = request.cookies['token'];

	if (!token) {
		console.log("403, Please provide token")
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

	console.log(`username: ${username}, password: ${password}`);

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
				console.log('returning authenticated!')
				response.json({authenticated: true, user: user});
			} else {
				console.log('user found, wrong password')
				response.json({authenticated: false});
			}
		} else {
			console.log('wrong username')
			response.json({authenticated: false});
		}
	});
}

module.exports.upsertUser = function(request, response, next) {
    var user = new User(request.body);

    console.log('user: ' + user);
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


/*
Update all user properties, but NOT password!
 */
module.exports.saveSettings = function(request, response, next) {
    var user = new User(request.body);

    User.find({username: user.username}, function(err, data) {
        if (err) {
            response.json({"error": "computer says no..."});
        }

        if (1 == data.length) {
            var pwd = data[0];
            var pwdhash = data[0].password;
            user.password = pwdhash;

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


        } else {
            response.json({"error": "user not found"});
        }
    });}


