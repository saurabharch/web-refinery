var fs = require('fs')
var ncp = require('ncp');
var projectPath = "hosted-projects/"
var path = require('path')
var Promise = require('bluebird')

//fs.readdir is not a promise so we use bluebird to promisify it
//this way it can work with out template route as a promise 
var readDir = Promise.promisify(fs.readdir);

var templatePath = path.join(__dirname, '../../../templates/');

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
// we pass the template and id from the project route so that we can
//use the template to find the right directory to copy
copyTemplate: function(template, projectId) {
  ncp(templatePath + template, projectPath + projectId, function(err) {
    if (err) {
      console.error(err)
      return
  };
});
  console.log("saving CSS")
},


//checks our templates directory for folders and puts titles in an array
//also omits any folder that starts with '.' because those are usually hiddne folders
//for example there is a .DSstore folder hidden in directory, we ignore that 
getTemplateList: function() {
  return readDir(templatePath)
    
    .then(function(items) {
        //filter out an .something folders that are supposed to be hidden 
     items = items.filter(item => item[0] !== '.');
     
     //return this array as an array of objects with a title key and a location key
     items = items.map(item => {
        return {
            title: item,
            location: templatePath + item
        }
    })
     return items;  
 })


}

}
