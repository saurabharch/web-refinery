'use strict';
var fs = require('fs');
var router = require('express').Router();
var Archiver = require('archiver');
var baseDir = __dirname + '/../../../hosted-projects/14/';

router.get('/', (req, res, next) => {

  var archive = Archiver('zip');
  archive.on('error', function(err) {
      res.status(500).send({error: err.message});
  });
  //on stream closed we can end the request
  res.on('close', function() {
      console.log('Archive wrote %d bytes', archive.pointer());
      return res.status(200).send('OK').end();
  });
  //set the archive name
  res.attachment('file-txt.zip');
  //this is the streaming magic
  archive.pipe(res);
  //you can add a directory using directory function
  // archive.append(fs.createReadStream(baseDir + 'index.html'), {name:'index.html'});
  archive.directory(baseDir, false);

  archive.finalize();
});



module.exports = router;
