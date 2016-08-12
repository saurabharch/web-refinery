'use strict';
var router = require('express').Router();
var db = require('../../db');
var handler = require('../workHorse/')
var User = db.model("user");
var Page = db.model("page");
var Project = db.model("project");
var ncp = require('ncp');

//creates HTML and CSS
router.post('/', function (req, res, next){
  // Will either create or update an existing record
  // This gets called when we hit the save button
  Page.createOrUpdate(req.body)
  .then(function(posted){
    return handler.renderHTML(posted.html,req.body.projectId)
  })
  .then(function(created){
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
