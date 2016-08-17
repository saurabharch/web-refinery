'use strict';

var router = require('express').Router();
var db = require('../../db');
var User = db.model('user')

//creates a new user
router.post('/', (req, res, next) => {
  User.create(req.body)
  .then(newUser => {
    res.json(newUser);
  })
  .catch(next);
})

module.exports = router;