app.controller('EditorCtrl', function($scope, $state,fileUpload, ProjectFactory, PageFactory, currentProject, ImageFactory, allImages) {


  $scope.createProject = function (obj){
    ProjectFactory.create(obj)
  }

  //parses HTML from iFrame
  $scope.parseHtml = function() {
    // console.log('made it');
    var beforeHtml = $('#skeleton').contents().find("html").html();
    var html = "<html>\n" + beforeHtml + "</html>";
    // saves HTML to backend
    PageFactory.savePage({html: html, title: 'index', projectId:currentProject.id});
  }

  $scope.currentProject = currentProject.title;

  $scope.projectUrl = 'hosted-projects/' + currentProject.id + '/index.html';

  $scope.allImages = allImages;
  console.log($scope.allImages)

  $scope.upload = function() {
    var uploadUrl = '/api/upload';
    var uploadObj = {
      projectId: currentProject.id,
      file: $scope.file
    }

    if($scope.file.type!=="image/png" && $scope.file.type!=="image/jpeg" && $scope.file.type!=="image/jpg"){
      alert("Please upload an image")
    }else {
      return fileUpload.upload(uploadObj, uploadUrl)
      .then(function(imageArray) {
        $scope.allImages = imageArray;
        console.log($scope.allImages)
      })
    }
  }




});
