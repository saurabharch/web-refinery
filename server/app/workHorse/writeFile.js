var fs = require('fs')
var ncp = require('ncp');
var projectPath = "hosted-projects/"

module.exports = {

//saving HTML locally
renderHTML: function(html, projectId) {
  fs.mkdir(projectPath + projectId, function(err){
    if (err) {
      return console.error(err)
    }
    else {  
      fs.writeFile(projectPath + projectId + "/index.html", html, function(err) {
        if (err) {
          return console.error(err)
        }
      });
    }

  })
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
