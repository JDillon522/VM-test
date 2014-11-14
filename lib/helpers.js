module.exports.registerHandlebarHelpers = function(app) {
  var hbs = require('hbs');

  // HBS uses Handlebars v1.3.0 and hasnt updated to 2.0.0. Ergo, I have to manually add logging
  hbs.registerHelper('log', function(context) { 
    return console.log(context);
  });
};

module.exports.apiPath = 'https://upm-int.militaryfriendly.com/api/schools/';
  