'use strict';

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, './hosted-projects/')
    }
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

    app.use(multer({storage:storage}).any())

    require('./authentication')(app, db);

};
