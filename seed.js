/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var fs = require('fs');
var path = require('path');
var Promise = require('sequelize').Promise;

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};

var remakeDir = function(dir) {
    try {
        var list = fs.readdirSync(dir);
        for(var i = 0; i < list.length; i++) {
            var filename = path.join(dir, list[i]);
            var stat = fs.statSync(filename);

            if(filename == "." || filename == "..") {
                // pass these files
            } else if(stat.isDirectory()) {
                // rmdir recursively
                rmdir(filename);
            } else {
                // rm fiilename
                fs.unlinkSync(filename);
            }
        }
        // Remove hosted-projects and sub directories
        fs.rmdirSync(dir);
        // Recreates the hosted-projects directory
        fs.mkdirSync(dir);
        console.log(chalk.green('hosted-projects directory was remade.'))
    } catch(e) {
        if ( e.code != 'ERROR OCCURRED IN REMAKEDIR' ) throw e;
    }
};

var hostedProjectsPath = __dirname + '/hosted-projects/';
var mkdirSync = function (path) {
    try {
        fs.accessSync(path, fs.F_OK);
        remakeDir(path);
    } catch(e) {
        // If user doesn't have the hosted-projects
        // directory, it's made here.
        fs.mkdirSync(path);
        console.log(chalk.green('hosted-projects directory was created.'));
    }
}

mkdirSync(hostedProjectsPath);

db.sync({ force: true })
    .then(function () {
        return seedUsers();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
