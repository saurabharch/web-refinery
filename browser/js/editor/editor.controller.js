app.controller('EditorCtrl', function($scope, ProjectFactory, PageFactory, currentProject) {

//makes all elements in body editable
  $scope.edit = function () {
    $('#skeleton').contents().find('body').each(function() {
      // var self = $(this);
      $(this).attr('contenteditable', 'true');

      var handlerIn = function() {
        // self.addClass("hoverHandler");
        self.css('border', '2px dashed rgb(189, 195, 199)');
        self.dblclick(function() {
          self.css('border', '2px dashed #18BC9C');
          self.attr('contenteditable', 'true');
        });
      };

      var handlerOut = function() {
        // self.removeClass("hover-handler");
        self.css('border', '');
        self.attr('contenteditable', 'false');
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
    var html = "<html>\n" + beforeHtml + "</html>"
    // saves HTML to backend
    PageFactory.savePage({html: html, title: 'index', projectId:currentProject.id})
  }

  $scope.currentProject = currentProject.title
  

  $scope.projectUrl = 'hosted-projects/' + currentProject.id + '/index.html'
  
});
