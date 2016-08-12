'use strict';
var router = require('express').Router();
var db = require('../../db');
var User = db.model("user");
var Page = db.model("page");
var Project = db.model("project");
var handler = require('../workHorse/');
var path = require('path')

//maybe add a helper function for this route
// router.get('/:id*', helperFunction, fcuntion(req,res,next) .... )

//authentication for serving up hosted-pages
// checks that you are the authorized user for this project
router.get('/:id/*', function(req,res,next){
    console.log(req.originalUrl, 'asdsad')
    Project.findById(req.params.id)
    .then(function(project){
        if (req.user){
            if (req.user.id === project.userId) 
                //change this to a rootPath later
                res.sendFile('/Users/yuriy/Dev/web-refinery/' + req.originalUrl)
            else res.sendStatus(401)
        }
    else 
        res.sendStatus(401)

    })
    .catch(next)
})


module.exports = router;