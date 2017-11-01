//db.js - logica voor verbinden met MongoDB
var express = require('express'); // express is needed to set config path:
var mongoose = require('mongoose'); 
var config = require('./config').Config;

// Read config yml:
var app = express();

// Build connection string and authentication
var dbURI = config.mongodbUri();
var dbAuth = config.authentication();

// Create the database connection 
var db = mongoose.connect(dbURI, dbAuth); 

// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

module.exports = db;
