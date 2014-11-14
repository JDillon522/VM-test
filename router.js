module.exports.routes = function(app) {
  var index = require('./routes/index');
  var profile = require('./routes/profile');

  app.use('/', index);
  app.use('/profile', profile);


  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
  });
};
