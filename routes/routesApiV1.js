// route for /receive, v1

var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.json());

router.post('/receive', function(request, response) {
//	console.log(request.body);
	var homepage = request.body.homepage;
	console.log(homepage);
	response.json({'v1.author': request.body.author});
});

module.exports = router;
