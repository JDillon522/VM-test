module.exports.routes = function(app) {
  var index = require('./routes/index');
  var profile = require('./routes/profile');

  app.use('/', index);
  app.use('/profile', profile);


  // catch 404 and forward to error handler
  app.use(function(err, req, res, next) {
      var error = new Error('Not Found');
      error.status = 400;
      error.message = err;
      res.render('error', error);
  });
};
