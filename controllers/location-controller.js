// db handler for location related documents
var User = require('../models/user');
var Location = require('../models/location-model');
var ObjectId = require('mongodb').ObjectID;

//find one document by id
module.exports.find = function(request, response) {
	Location.findOne({ "_id" : ObjectId(request.params.id)}, function(err, location) {
		if (err) {
			console.log(err)
			return next(err);
		}
		response.json(location)
	});
}

// find list of documents by phoneid
module.exports.findByPhoneId = function(request, response) {
	Location.find({ "phoneid" : request.query.phoneid}).sort({'date': -1}).limit(100).exec(function(err, locationList) {
		if (err) {
			console.log(err)
			return next(err);
		}
		response.json(locationList)		
	});
	/*
	Location.find({ "phoneid" : request.query.phoneid}, function(err, locationList) {
		if (err) {
			console.log(err)
			return next(err);
		}
		response.json(locationList)
	}).sort('-date');
	*/
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

    // update off for testing

	var phoneid = location.phoneid;
    User.find({"identities.phoneid": phoneid}, function(err, users) {
        if (err) {
            return next(err);
        }

        if (1 == users.length) {
            var user = users[0];

            var identity = user.identities.filter(function (i) {
            	return i.phoneid == phoneid;
            });

            if (identity) {
                Location.findOneAndUpdate (
                    { "_id": location._id },       //your condition for check
                    { $set: location },       //new values you want to set
                    { upsert: true, 'new': true }).exec(function (err, data){
                    if (err) {
                        console.error(err);
                        return next(err);
                    }
                    var interval = identity[0].interval;
                    response.json({posted: true, interval: interval});
                });
			} else {
                console.log("phoneid: " + phoneid + " not coupled to identity?")
            	response.json({posted: false})
			}

        } else {
            console.log('cannot find user by phoneid: ' + phoneid)
            response.json({posted: false});
        }
    });
}

// new document or edit
module.exports.upsert_orig = function(request, response) {
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