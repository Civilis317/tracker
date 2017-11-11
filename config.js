//config.js - configuration service that reads the application.yml

// import
var readYaml = require('read-yaml');

//Read config yml:
var configFile = process.env.CONFIG_PATH || 'application.yml';
var config = readYaml.sync(configFile);

var Config = function() {};

refresh = function() {
	config = readYaml.sync(configFile);
}

Config.prototype.version = function() {
	refresh();
	return config.application.version;
};

Config.prototype.secretKey = function() {
	refresh();
	return config.application.key;
};

Config.prototype.secureCookie = function() {
	refresh();
	return config.application.secureCookie;
};

Config.prototype.mongodbUri = function() {
	refresh();
	return `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.db}`;
}

Config.prototype.authentication = function() {
	refresh();
	var dbAuth = `{
					"useMongoClient": false,
					"user": "${config.mongodb.username}",
					"pass": "${config.mongodb.password}",
					"auth":{
						"authdb": "${config.mongodb.authdb}"
				    }
	}`;
	return JSON.parse(dbAuth);
}

exports.Config = new Config();
