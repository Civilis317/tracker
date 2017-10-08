// imports - npm
var express = require('express');

var routesApiv1 = require('./routes/routesApiV1');
var routesApiv2 = require('./routes/routesApiV2');

var app = express();

app.use('/api/v1', routesApiv1);
app.use('/api/v2', routesApiv2);

app.get('/', function(request, response) {
	response.json({'tracker-server status': 'up'})
});

app.listen(5000);

console.log('server started: http://localhost:5000');


