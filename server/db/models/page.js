var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('page', {
    html:{
      type:Sequelize.TEXT
    },
    css:{
      type:Sequelize.TEXT
    }
});
