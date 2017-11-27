//config.js - configuration service

var Config = function () {
};

Config.prototype.version = function () {
    return process.env.APP_VERSION;
};

Config.prototype.secretKey = function () {
    return process.env.JWT_SECRET_KEY;
};

Config.prototype.secureCookie = function () {
    return 'true' == process.env.SECURE_COOKIE;
};

Config.prototype.mongodbUri = function () {
    return `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`;
}

Config.prototype.authentication = function () {
    var dbAuth = `{
		"useMongoClient": false,
		"user": "${process.env.MONGODB_USERNAME}",
		"pass": "${process.env.MONGODB_PASSWORD}",
		"auth":{
			"authdb": "${process.env.MONGODB_AUTH_DB}"
		}
	  }`;
    return JSON.parse(dbAuth);
}

exports.Config = new Config();
