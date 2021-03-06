// imports - npm
var express = require('express');
var cors = require('cors')

// config
var config = require('./config').Config;

// routes
var routesApiv1 = require('./routes/routesApiV1');
var routesApiv2 = require('./routes/routesApiV2');

var app = express();

var corsSettings = {
		  origin: true,
		  methods: ['GET','POST'],
		  credentials: true
		};

app.use(cors(corsSettings));

app.set('port', (process.env.PORT || 5000));

app.use('/api/v1', routesApiv1);
app.use('/api/v2', routesApiv2);

app.get('/', function(request, response) {
	response.json({'tracker-server status': 'up', 'version': config.version()})
});

app.listen(app.get('port'), function() {
	console.log('TrackerTracer Server started and listening at port: ' + app.get('port'));
});

