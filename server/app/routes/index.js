'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/project', require('./project'));
router.use('/page', require('./page'));
router.use('/templates', require('./template'));
router.use('/image', require('./image'));
router.use('/user', require('./user'));
// router.use('/download', require('./download'));

router.post('/upload', function(req,res,next){
    res.end();
})

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
