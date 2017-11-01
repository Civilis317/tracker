/**
 * Handler for jsonwebtoken authentication
 */
//var User = require('../models/users');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');

module.exports.verifyToken = function(request, response, next) {
	console.log('token: test');
	next();
}
