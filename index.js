// imports - npm
var express = require('express');
var cors = require('cors')

var routesApiv1 = require('./routes/routesApiV1');
var routesApiv2 = require('./routes/routesApiV2');

var app = express();
app.use(cors());

app.set('port', (process.env.PORT || 5000));

app.use('/api/v1', routesApiv1);
app.use('/api/v2', routesApiv2);

app.get('/', function(request, response) {
	response.json({'tracker-server status': 'up'})
});

app.listen(app.get('port'), function() {
	console.log('TrackerTracer Server started and listening at port: ' + app.get('port'));
});

