// route for /receive, v2

var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.json());

router.post('/receive', function(request, response) {
//	console.log(request.body);
	var license = request.body.license;
	console.log(license);
	response.json({'v2.license': license});
});

module.exports = router;
