'use strict';
var router = require('express').Router();
var db = require('../../db');
var User = db.model("user");
var Page = db.model("page");
var Project = db.model("project");
var handler = require('../workHorse/');
var currentProject;

// creates project
router.post('/', function (req, res, next){
  Project.create(req.body)
  .then(function(result){
    return result.setUser(req.user.id)
  })
  .then(function(result) {
    currentProject = result;
    return handler.copyTemplate(result.id);
  })
  .then(function(){
    res.send(currentProject);
  })
  .catch(next);
});


//fetch all projects for a specific user
router.get('/', function (req, res, next){
  Project.findAll({
  where:{
    userId:req.user.id
  }
})
  .then(function(result){
    res.send(result)
  })
  .catch(next);
});

router.get('/:id', function (req, res, next){
  Project.findById(req.params.id)
  .then(function(result){
    res.send(result);
  })
  .catch(next);
});


module.exports = router;

