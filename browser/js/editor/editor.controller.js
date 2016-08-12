app.controller('EditorCtrl', function($scope, ProjectFactory, PageFactory, currentProject) {

//makes all elements in body editable
  $scope.edit = function () {
    $('#skeleton').contents().find('body').each(function() {
      $(this).attr('contenteditable', 'true');
    });
  }

  $scope.createProject = function (obj){
    ProjectFactory.create(obj)
  }

//parses HTML from iFrame
  $scope.parseHtml = function() {
    // console.log('made it');
    var beforeHtml = $('#skeleton').contents().find("html").html();
    var html = "<html>\n" + beforeHtml + "</html>"
    // saves HTML to backend
    PageFactory.savePage({html: html, title: 'index', projectId:currentProject.id})
  }

  $scope.displayCurrentProject = function() {
    console.log(currentProject)
  }

  $scope.projectUrl = '/' + currentProject.id + '/index.html'
  console.log($scope.projectId,'asdsa', currentProject)

});
