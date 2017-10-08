// route for /receive, v2

var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var locationController = require('../controllers/location-controller');

router.use(bodyParser.json());

router.get('/location/find/:id', locationController.find);
router.get('/location/list', locationController.findAll);
router.put('/location/update', locationController.upsert)
router.post('/location/save', locationController.upsert)
router.delete('/location/remove/:id', locationController.remove)

module.exports = router;
