'use strict';
var router = require('express').Router();
var db = require('../../db');
var User = db.model("user");
var Page = db.model("page");
var Project = db.model("project");
var workHorse = require('../workHorse/');
var Archiver = require('archiver');
var baseDir = __dirname + '/../../../hosted-projects/';
var currentProject;

// creates project
router.post('/', function (req, res, next){
  var template = req.body.template;  // save this for the copytemplate function
  Project.create(req.body)
  .then(function(result){
    return result.setUser(req.user.id)
  })
  .then(function(result) {
    currentProject = result; //save this so we can use it in our res.send below
    return workHorse.copyTemplate(template,result.id);
  })
  .then(function(){
    res.send(currentProject);
  })
  .catch(next);
});

// deletes a project
router.delete('/:id', function (req, res, next){
  console.log('===============');
  console.log('route beginning');
  console.log('===============');
  Project.findById(req.params.id)
  .then(function(product){
    return product.destroy()
  })
  .then(function() {
    res.status(200).send("deleted")
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


router.get('/:id/download', (req, res, next) => {
  var id = req.params.id;
  Project.findById(id)
    .then(function(project) {
        var archive = Archiver('zip');
        archive.on('error', function(err) {
          res.status(500).send({ error: err.message });
        });

        archive.on('end', function() {
            console.log('Archive wrote %d bytes', archive.pointer())
          })
          //on stream closed we can end the request
          // res.on('close', function() {
          //     console.log('Archive wrote %d bytes', archive.pointer());
          //     return res.status(200).send('OK').end();
          // });
          //set the archive name
        res.attachment('file-txt.zip');
        //this is the streaming magic
        archive.pipe(res);
        //you can add a directory using directory function
        // archive.append(fs.createReadStream(baseDir + 'index.html'), {name:'index.html'});
        archive.directory(baseDir + id + '/', false);

        archive.finalize();
    })
    .catch(next);
});

module.exports = router;

