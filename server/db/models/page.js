var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('page', {
    title: {
      type:Sequelize.STRING
    },
    html:{
      type:Sequelize.TEXT
    },
    css:{
      type:Sequelize.TEXT
    }
}, {
  classMethods: {
    // Edits the html page instead of always creating new records
    createOrUpdate: function(obj) {
      return db.model('page').findOrCreate({
      where: {
        title: obj.title,
        projectId: obj.projectId
      }
      })
      .then(function(result) {
        // findOrCreate returns an array
        return result[0].update({ html: obj.html })
      })
    }
  }
});
