'use strict';
var router = require('express').Router();
var db = require('../../db');
var User = db.model("user");
var Page = db.model("page");
var Project = db.model("project");
var workHorse = require('../workHorse/');
var currentProject;


router.get('/:projectId', function(req, res, next) {
   return workHorse.getImageList(req.params.projectId)
    .then(function(images){
      return  res.send(images)
    })
    .catch(next)
})


module.exports = router;

