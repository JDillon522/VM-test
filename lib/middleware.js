module.exports.middleware = function(app) {
  var express = require('express');
  var path = require('path');
  var logger = require('morgan');
  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');
  var sassMiddleware = require('node-sass-middleware');
  
  // uncomment after placing your favicon in /public
  // var favicon = require('serve-favicon');
  //app.use(favicon(__dirname + '/public/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(sassMiddleware({
    src: __dirname + './../public', 
    dest: __dirname + './../public', 
    // uncomment to see folder paths
    // debug: true, 
    outputStyle: 'compressed', 
    prefix:  '/prefix',
    force: true
  }));
  app.use(express.static(path.join(__dirname, 'public')));

  // Error Handlers
  // DEV
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // PROD
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

};