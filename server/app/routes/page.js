'use strict';
var router = require('express').Router();
var db = require('../../db');
var handler = require('../workHorse/')
var User = db.model("user");
var Page = db.model("page");
var Project = db.model("project");
var webshot = require('webshot');
var path = require('path');
var Promise = require('bluebird');

var rootPath = path.join(__dirname, '../../../');

//creates HTML and CSS
router.post('/', function (req, res, next){
  // Will either create or update an existing record
  // This gets called when we hit the save button
  var postedData;

  Page.createOrUpdate(req.body)
  .then(function(posted){
    // posted.projectId
    var fullUrl = req.protocol + '://' + req.get('host') + '/hosted-projects/' +  posted.projectId + '/';
    var picUrl = rootPath + 'screenshots/';
    var options = {
      shotSize : {
        width: 'all',
        height: '800px'
      },
      quality: 75
    };

    console.log('=======');
    console.log(fullUrl);
    console.log(picUrl + posted.projectId + '.png');
    console.log('=======');

    postedData = posted;
    return webshot(fullUrl, picUrl + posted.projectId + '.png', function() {

    });

    // webshotPromise(fullUrl, picUrl + posted.projectId + '.png', options, function(err) {
    //   console.log(err);
    // });
  })
  .then(function(posted){
     return handler.renderHTML(postedData.html,req.body.projectId);
  })
  .then(function(){
    return res.sendStatus(201)
  })
  .catch(next)
});

//retrieves pages
router.get('/', function (req, res, next){
  Page.findAll({
    where:{
      userId:req.user.id
    }
  })
  .then(function(result){
    res.send(result)
  })
  .catch(next)
});


module.exports = router;
