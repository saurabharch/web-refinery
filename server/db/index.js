'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user');
var Project = require('./models/project');
var Page = require('./models/page');

// Cascade feature is to delete entries in the pages
// tables if an item is deleted from the projects table.

User.hasMany(Project);
Project.belongsTo(User);
Project.hasMany(Page, { onDelete: 'cascade' });
Page.belongsTo(Project);
