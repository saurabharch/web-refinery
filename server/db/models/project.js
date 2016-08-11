var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('project', {
    title:{
      type:Sequelize.STRING
    },
    template:{
        type: Sequelize.ENUM('gallery', 'store', 'blog', 'portfilio')
    }
});
