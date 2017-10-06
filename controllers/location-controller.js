// db handler for location related documents

var Location = require('../models/location-model');
var ObjectId = require('mongodb').ObjectID;

// find one document by id
module.exports.find = function(request, response) {
	Location.findOne({ "_id" : ObjectId(request.params.id)}, function(err, location) {
		if (err) {
			console.log(err)
			return next(err);
		}
		response.json(location)
	});
}

// return all Location documents
module.exports.findAll = function(request, response) {
	Location.find(function(err, locationList) {
		if (err) {
			console.log(err)
			return next(err);
		}
		response.json(locationList);
	})
}

// new document or edit
module.exports.upsert = function(request, response) {
	var location = new Location(request.body);
	
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
}

// remove document
module.exports.remove = function(request, response) {
	Location.remove({ "_id" : request.params.id
	}, function(err, removed) {
		if (err) {
			return next(err);
		}
		response.status(200).json(removed);
	})
}