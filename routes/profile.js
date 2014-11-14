var express = require('express');
var router = express.Router();
var request = require('request');
var apiPath = require('../lib/helpers').apiPath;

router
  .get('/:name/:id', function(req, res, next) {
    request({
      uri: apiPath + req.params.id
    }, function(error, response, body) {
      var tryFail = true;
      var data;

      if (error || !body) { 
        console.log('ERROR: ', error);
        return res.send(400);
      }
         
      try {
        data = JSON.parse(body);
        tryFail = false;
      } catch (e) {
        // Try catch fails silently. No bueno.
      }

      if (tryFail) {
        return res.status(400).end();
      } else {
        return res.render('profile', data);
      }
    });
  })
  .post('/address/:id', function(req, res, next) {
    request({
      uri: apiPath + req.params.id + '/address'
    }, function(error, response, body) {
      var tryFail = true;
      var data;

      if (error || !body) { 
        console.log('ERROR: ', error);
        return res.send(400);
      }
         
      try {
        data = JSON.parse(body);
        data = JSON.parse(data.address);
        tryFail = false;
      } catch (e) {
        // Try catch fails silently. No bueno.
      }

      if (tryFail) {
        return res.status(400).end();
      } else {
        return res.send(data);
      }      
    });
  });

module.exports = router;
