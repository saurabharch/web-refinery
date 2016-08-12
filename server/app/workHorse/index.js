var fs = require('fs')
var ncp = require('ncp');
var projectPath = "hosted-projects/"

module.exports = {

//saving HTML locally
renderHTML: function(html, projectId) {
  
  fs.writeFile(projectPath + projectId + "/index.html", html, function(err) {
    if (err) {
      return console.error(err)
    }
  });

},

//copies entire CSS folder associated with project
copyTemplate: function(projectId) {
  ncp('./browser/freelancer', projectPath + projectId, function(err) {
    if (err) {
      console.error(err)
      return
    };
  });
  console.log("saving CSS")
}

};
