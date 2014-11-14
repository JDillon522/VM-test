var express = require('express');
var router = express.Router();
var request = require('request');
var async = require('async');
var apiPath = require('../lib/helpers').apiPath;

router.get('/:name/:id', function(req, res, next) {

  request({
    uri: apiPath + req.params.id
  }, function(error, response, body) {
    var tryFail = true;
    var data;

    if (error) { 
      console.log('ERROR: ', error);
      return res.send(400);
    }
    

    
    async.waterfall([
      function(callback) {
        
        try {
          data = JSON.parse(body);
          tryFail = false;
        } catch (e) {
          // Try catch fails silently. No bueno.
        }

        callback(null, data);
      },
      function(callback) {
        addressRequest(req, res, callback);
      } 
    ], function(err, results) {
      if (err) { console.log(err);}
        
    });
    
      


    if (tryFail) {
      return res.status(400).end();
    } else {
      return res.render('profile', data);
    }
  });
});

function addressRequest(req, res, callback) {
  var address;

  request({
    uri: apiPath + req.params.id + '/address'
  }, function(error, response, body) {
    
    if (error) { 
      console.log('ERROR: ', error);
      return res.send(400);
    }

    address = body;

    callback(null, address);
  });
  
}

module.exports = router;
