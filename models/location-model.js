// a db model ("schema") for Location documents

var db = require('../db');

var Location = db.model('Location', {
	username : {type: String, required: true},
	phoneid : {
		type : String,
		required : true
	},
	model : {
		type : String,
		required : true
	},
	name : {
		type : String,
		required : true
	},
	provider : {
		type : String,
		required : true
	},
	long : {
		type : String,
		required : true
	},
	lat : {
		type : String,
		required : true
	},
	ele : {
		type : String,
		required : true
	},
	heading : {
		type : String,
		required : true
	},
	speed : {
		type : String,
		required : true
	},
	date : {
		type : Date,
		required : true,
		default : Date.now
	}
});

module.exports = Location;