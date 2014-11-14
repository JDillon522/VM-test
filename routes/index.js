var express = require('express');
var router = express.Router();
var request = require('request');
var _ = require('lodash');
var apiPath = require('../lib/helpers').apiPath;

var filterInactive = function(data) {
  var newBody = [];
  
  _.each(data, function(value, key) {
    if (value.active === true) {
      newBody.push(value);
    }
  });

  return newBody;
};

router.get('/', function(req, res) {

  request({
    uri: apiPath + 'online'
  }, function(error, response, body) {
    var tryFail = true;

    if (error) { 
      console.log('ERROR: ', error);
      return res.send(400);
    }
    
    try {
      body = JSON.parse(body);
      tryFail = false;
      body = filterInactive(body);
    } catch (e) {
      // Try catch fails silently. No bueno.
    }
    


    if (tryFail) {
      return res.send(400);
    } else {
      return res.render('index', { title: 'Express', data: body});
    }
  });
});

module.exports = router;
