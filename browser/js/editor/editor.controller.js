app.controller('EditorCtrl', function($scope, fileUpload, ProjectFactory, PageFactory, currentProject, ImageFactory) {

//makes all elements in body editable
  $scope.edit = function () {
    $('#skeleton').contents().find('h1,h2,h3,h4,h5,h6,p,span,button,a').each(function() {
      // var self = $(this);
      // $(this).attr('contenteditable', 'true');
      $(this).addClass('editable');
      var handlerIn = function() {
        // self.addClass("hoverHandler");
        self.css('border', '2px dashed rgb(189, 195, 199)');
        self.dblclick(function() {
          self.css('border', '2px dashed #18BC9C');
          // self.attr('contenteditable', 'true');
          self.addClass('editable');
        });
      };

      var handlerOut = function() {
        // self.removeClass("hover-handler");
        self.css('border', '');
        // self.attr('contenteditable', 'false');
        self.removeClass('editable');
      };

      // Function to give the element that you
      // are hovering over some style and remove it
      // Only works with find('h1,h2,h3,h4,h5,h6,p,span,button,a')
      // self.hover(handlerIn, handlerOut);

    });
  }

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



$scope.upload = function() {
  var uploadUrl = '/api/upload';
  var uploadObj = {
    projectId: currentProject.id,
    file: $scope.file
  }
  if($scope.file.type!=="image/png" && $scope.file.type!=="image/jpeg" && $scope.file.type!=="image/jpg"){
    alert("Please upload an image")
  }else {
  fileUpload.upload(uploadObj, uploadUrl)
  }
}



$scope.imageFactory = ImageFactory


});
