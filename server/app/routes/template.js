'use strict';
var router = require('express').Router();
var db = require('../../db');
var workHorse = require('../workHorse/')
var User = db.model("user");
var Page = db.model("page");
var Project = db.model("project");

//get an array of all folders in our template folders
//this is an array of all our templates
router.get('/', function (req,res,next){
  return workHorse.getTemplateList()
  .then(function (templateArray) {
    return res.send(templateArray)
   })
  .catch(next)
})




module.exports = router;
