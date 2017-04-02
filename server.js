//server.js
// Aquire env vars from .env file
require('dotenv').config();
// BASE SETUP
// =============================================================================
// Imports
var jwt = require('jsonwebtoken');
var morgan = require('morgan');
var config = require('./config');

//Configure express server
var express    = require('express');
var app        = express();

// Set secret variable
app.set('superSecret', config.secret);

// configure app to use bodyParser()
// this will let us get the data from a POST
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Log all requests to console
app.use(morgan('dev'));

var port = process.env.PORT || 8080;        // set our port

var mongoose = require('mongoose');
mongoose.connect(config.databaseURI);//connect to db



// ROUTES FOR API
// =============================================================================
var apiRouter = require('./app/routes/api');

//Register routes
app.use('/api', apiRouter);

//Start server
var Server = app.listen(port);
console.log('Server listening on port %d in %s mode', port, app.get('env'));

module.exports = Server;
