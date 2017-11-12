// route for /receive, v2

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var jwt = require('jsonwebtoken');

var authenticationController = require('../controllers/authentication-controller');
var locationController = require('../controllers/location-controller');

var secureRoutes = express.Router();
secureRoutes.use(bodyParser.json());
secureRoutes.use(bodyParser.urlencoded({
	extended : true
}));
secureRoutes.use(cookieParser());

// this must appear before the middleware validation call to verifyToken...
secureRoutes.post('/auth/login', authenticationController.authenticate);

//validation middleware:
secureRoutes.use(authenticationController.verifyToken);
secureRoutes.get('/auth/logout', authenticationController.logout);

secureRoutes.post('/admin/user/save', authenticationController.upsertUser);

secureRoutes.get('/location/find/:id', locationController.find);
// secureRoutes.get('/location/list', locationController.findAll);
secureRoutes.get('/location/list', locationController.findByPhoneId);
secureRoutes.put('/location/update', locationController.upsert)
secureRoutes.post('/location/save', locationController.upsert)
secureRoutes.delete('/location/remove/:id', locationController.remove)

module.exports = secureRoutes;
