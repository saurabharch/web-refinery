'use strict';

var multer = require('multer');

var storage = multer.diskStorage({

    destination: function (req,file,cb) {
        cb(null, './hosted-projects/'+req.body.projectId +"/img")
    },
    filename:function(req,file,cb){
        var newName = file.originalname.replace(/\s/g, '_');
        cb(null, newName)
    },
 });



module.exports = function (app, db) {

    // setValue and getValue are merely alias
    // for app.set and app.get used in the less
    // common way of setting application variables.
    app.setValue = app.set.bind(app);

    app.getValue = function (path) {
        return app.get(path);
    };

    require('./app-variables')(app);
    require('./static-middleware')(app);
    require('./parsing-middleware')(app);

    // Logging middleware, set as application
    // variable inside of server/app/configure/app-variables.js
    app.use(app.getValue('log'));

    app.use(multer({storage:storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg') {
          req.fileError = "please enter png"
          cb(req.fileError)
        } else {
        cb(null, true)
}
    },
    onError: function (err, next){
        console.log("error", err)
        next(err)
    }
    }).any())

    require('./authentication')(app, db);

};
