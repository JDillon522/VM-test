var express = require('express');
var router = express.Router();
var request = require('request');
var _ = require('lodash');
var apiPath = require('../lib/helpers').apiPath;

router.get('/', function(req, res, next) {
  request({
    uri: apiPath + 'online'
  }, function(error, response, body) {
    var tryFail = true;
    var data;

    if (error) { 
      console.log('ERROR: ', error);
      return res.send(400);
    }
    
    try {
      body = JSON.parse(body);      
      data = formatData(body, req.query.offset);
      tryFail = false;
    } catch (e) {
      // Try catch fails silently. No bueno.
    }

    if (tryFail) {
      return next();
    } else {
      return res.render('index', data);
    }
  });
});

function formatData(data, offset) {
  var activeBody = [];
  var finalBody = [];
  var page = 1;
  var pageOffset = 0;
  var finalData = {};

  finalData.pagination = [];

  if (!offset) {
    offset = 0;
  } else {
    offset = parseInt(offset, 10);
  }

  // Filter out non active schools
  _.each(data, function(value, key) {
    if (value.active === true) {
      activeBody.push(value);
    }
  });
  
  // Sort alphabetically 
  activeBody = activeBody.sort(function(a, b){
    if (a.school_name < b.school_name) { return -1; }
    if (a.school_name > b.school_name) { return 1; }
    return 0;
  });

  // Total schools
  finalData.count = activeBody.length;

  // Return correct paginated data
  for (var i = offset; i <= offset + 10; i++) {
    finalBody.push(activeBody[i]);
  }

  // Add offset to each school to populate profile page back button
  _.each(finalBody, function(value, key) {
    if (finalBody[key]) {
      finalBody[key].back_button = offset;
    }    
  });

  // add offsets and pagination 
  _.each(activeBody, function(value, key) {
    var set = {};
    if (key % 10 === 0) {
      set.page = page;
      set.offset = pageOffset;
      
      // Set active class
      if (set.offset === offset) {
        set.active = true;
      } else {
        set.active = false;
      }
    
      finalData.pagination.push(set);

      // Increment counters
      page ++;
      pageOffset += 10;
    }
  });

  finalData.schools = finalBody;

  return finalData;
}

module.exports = router;
