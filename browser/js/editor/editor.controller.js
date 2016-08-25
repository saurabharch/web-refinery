app.controller('EditorCtrl', function($scope, $timeout, fileUpload, ProjectFactory, PageFactory, currentProject, ImageFactory, GalleryFactory, allImages, $uibModal, $log) {

  //gets assigned in our onload function below
  var nav;

  $('#skeleton').on('load', function() {
    //gets the entire htmt of ur <nav> tag
    $scope.edit();
    
  })

  console.log(currentProject)

  $scope.sides = [
  'top',
  'right',
  'left',
  'bottom'
  ]

  $scope.showTextbox = false;

  $scope.clickAddLink = function() {
    $scope.showTextbox = true;

  }

  $scope.toggleInverse = function() {
   if ($('#skeleton').contents().find('nav').hasClass('navbar-inverse'))
    $('#skeleton').contents().find('nav').removeClass('navbar-inverse')

  else $('#skeleton').contents().find('nav').addClass('navbar-inverse')
}

$scope.updateSide = function(){
  nav.align($scope.side)
}

$scope.animationsEnabled = false;
$scope.open = function(size) {

  var modalInstance = $uibModal.open({
    animation: false,
    templateUrl: 'js/modalInstance/editor.modal.html',
    controller: 'ModalInstanceCtrl',
    size: size,
    resolve: {
      textSelected: function() {
        return $scope.textSelected;
      }
    }
  });

  modalInstance.result.then(function(editedModalText) {
    $scope.textSelected = editedModalText;

    // $scope.textSelected.removeClass('alreadyEditable');
    $($scope.textTag)[0].outerHTML =  $scope.textSelected;
    $('#skeleton').contents().find('*').each(function () {
      $(this).removeClass('alreadyEditable')
      $(this).removeClass('dashedBorder')
      $(this).off('dblclick');
    })

    $scope.edit();
    
  }, function() {
    $log.info('Modal dismissed at: ' + new Date());
  });
};

$scope.toggleAnimation = function() {
  $scope.animationsEnabled = !$scope.animationsEnabled;
};

  //makes all elements in body editable
  $scope.edit = function() {
    $('#skeleton').contents().find('h1,h2,h3,h4,h5,h6,p,span,button,a').each(function() {
      var self = $(this);
      var handlerIn = function() {
        self.addClass('dashedBorder')
      };

      var handlerOut = function() {
          self.removeClass('dashedBorder')
      };

      // Function to give the element that you
      // are hovering over some style and remove it
      // Only works with find('h1,h2,h3,h4,h5,h6,p,span,button,a')
      if (self.text() != '') self.hover(handlerIn, handlerOut);
      if (!self.hasClass('alreadyEditable')) {

        self.addClass('alreadyEditable')
        self.dblclick(function() {
          $scope.textSelected = $(this)[0].outerHTML;

          $scope.textTag = $(this);
          $scope.open();
        })

      }



    });
  }

  $scope.createProject = function(obj) {
    ProjectFactory.create(obj)
  }

  //will make a hardcoded request to backend and use the archiver to zip up the project
  $scope.currentProject = currentProject;


  $scope.projectUrl = 'hosted-projects/' + currentProject.id + '/index.html';

  $scope.allImages = allImages;


  $scope.upload = function() {
    var uploadUrl = '/api/upload';
    var uploadObj = {
      projectId: currentProject.id,
      file: $scope.file
    }

    if ($scope.file.type !== "image/png" && $scope.file.type !== "image/jpeg" && $scope.file.type !== "image/jpg") {
      alert("Please upload an image")
    } else {
      return fileUpload.upload(uploadObj, uploadUrl)
      .then(function(imageArray) {
        $scope.allImages = imageArray;
          // console.log($scope.allImages)
        })
    }
  }



  $scope.toggleClass = function(classString){
    nav.toggleClass(classString);
    console.log(nav)
  }

  $scope.colorBool = false;
  $scope.toggleColor = function() {
    $scope.colorBool = !$scope.colorBool;
  }

  $scope.addLink = function () {

    var newLink = nav.createLink($scope.linkName)
    $('#skeleton').contents().find('#navUl').append(newLink)
    $scope.showTextbox= false;
    $scope.edit();
  }

  $scope.removeLink = function(text){
    console.log($scope.links)
    var textParsed = text.replace(' ', '_')
    $('#skeleton').contents().find('a:contains(' + text + ')').parent().remove();
    _.remove($scope.links, function(link){
      return link.name === text;
    })
    $('#skeleton').contents().find('#'+textParsed).remove();
    $scope.edit();
    console.log($scope.links)
  }

  $scope.addGalleryRow = GalleryFactory.addGalleryRow;
  $scope.removeLastRow = GalleryFactory.removeLastRow;





});
