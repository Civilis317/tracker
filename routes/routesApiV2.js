// route for /receive, v2

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var jwt = require('jsonwebtoken');

var authenticateController = require('../controllers/authenticate-controller');
var locationController = require('../controllers/location-controller');
var administrationController = require('../controllers/administration-controller');

var secureRoutes = express.Router();
secureRoutes.use(bodyParser.json());
secureRoutes.use(bodyParser.urlencoded({
	extended : true
}));
secureRoutes.use(cookieParser());

//validation middleware:
secureRoutes.use(authenticateController.verifyToken);

secureRoutes.post('/admin/user', administrationController.upsertUser);

secureRoutes.get('/location/find/:id', locationController.find);
secureRoutes.get('/location/list', locationController.findAll);
secureRoutes.put('/location/update', locationController.upsert)
secureRoutes.post('/location/save', locationController.upsert)
secureRoutes.delete('/location/remove/:id', locationController.remove)

module.exports = secureRoutes;
