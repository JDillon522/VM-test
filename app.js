var express = require('express');
var path = require('path');

var registerMiddleware = require('./lib/middleware').middleware;
var registerRoutes = require('./router').routes;
var registerHandlebarHelpers = require('./lib/helpers').registerHandlebarHelpers;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

registerMiddleware(app);
registerRoutes(app);
registerHandlebarHelpers();

module.exports = app;