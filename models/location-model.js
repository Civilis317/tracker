// a db model ("schema") for Location documents

var db = require('../db');

var Location = db.model('Location', {
	name : {
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
	date : {
		type : Date,
		required : true,
		default : Date.now
	}
});

module.exports = Location;