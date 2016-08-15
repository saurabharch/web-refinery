'use strict';
var router = require('express').Router();
var db = require('../../db');
var User = db.model("user");
var Page = db.model("page");
var Project = db.model("project");
var workHorse = require('../workHorse/');
var currentProject;

// creates project
router.post('/', function (req, res, next){
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", req.body, req.files)
  workHorse.copyImage(req.files)
  .catch(next);
});


module.exports = router;

