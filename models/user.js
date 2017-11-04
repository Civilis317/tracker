/**
 * Model for users in mongodb
 */
var db = require('../db');

var User = db.model('User', {
	username    : {type: String,  required: true},
	displayname : {type: String,  required: true},
	password    : {type: String,  required: true},
	admin       : {type: Boolean, required: true},
	active      : {type: Boolean, required: true},
	identities  : [
		{
			id      : {type: Number,  required: true},
			name    : {type: String,  required: true},
			phoneid : {type: String,  required: true},
			interval: {type: Number,  required: true}
		}
	]
});

module.exports = User;
