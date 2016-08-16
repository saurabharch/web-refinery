'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/project', require('./project'));
router.use('/page', require('./page'));
router.use('/templates', require('./template'))
router.use('/image', require('./image'))

router.post('/upload', function(req,res,next){
    console.log('------------',req.body)
    res.end();
})

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
