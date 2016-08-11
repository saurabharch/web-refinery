var fs = require('fs')
var ncp = require('ncp');
var projectPath = "./projects/"

module.exports = {

//saving HTML locally
  renderHTML: function(html, projectId) {
    fs.writeFile(projectPath + projectId + "/index.html", html, function(err) {
      if (err) {
        console.error(err)
        return
      };
    });

  },

//copies entire CSS folder associated with project
  copyCSS: function(destination, projectId) {
    ncp('./browser/freelancer', projectPath + projectId, function(err) {
      if (err) {
        console.error(err)
        return
      };
    });
    console.log("saving CSS")
  }

};
