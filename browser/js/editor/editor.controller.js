
app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, textSelected) {

  $scope.textSelected = textSelected;

  $scope.ok = function () {
    $uibModalInstance.close($scope.textSelected);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

app.controller('EditorCtrl', function($scope, fileUpload, ProjectFactory, PageFactory, currentProject, ImageFactory, allImages, $uibModal, $log) {

  $scope.animationsEnabled = false;
  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'editor.modal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        textSelected: function () {
          return $scope.textSelected;
        }
      }
    });

    modalInstance.result.then(function (editedModalText) {
      $scope.textSelected = editedModalText;

      $($scope.textTag).html($scope.textSelected);

    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

  //makes all elements in body editable
  $scope.edit = function () {
    $('#skeleton').contents().find('h1,h2,h3,h4,h5,h6,p,span,button,a').each(function() {
      var self = $(this);
      // $(this).attr('contenteditable', 'true');
      // $(this).addClass('editable');
      var handlerIn = function() {
        // self.addClass("hoverHandler");
        self.css('border', '2px dashed rgb(189, 195, 199)');
      };

      var handlerOut = function() {
        // self.removeClass("hover-handler");
        if (!self.hasClass('changeThis')){
          self.css('border', '');
        // self.attr('contenteditable', 'false');
        self.removeClass('editable');
      }
    };

      // Function to give the element that you
      // are hovering over some style and remove it
      // Only works with find('h1,h2,h3,h4,h5,h6,p,span,button,a')
      if (self.text() != '') self.hover(handlerIn, handlerOut);
      self.dblclick(function() {

        // console.log('=============');
        // console.log($(this)[0].outerHTML);
        // console.log($(this));
        // console.log('=============');
        $scope.textSelected = $(this)[0].outerHTML;
        $scope.textTag = $(this);
        $scope.open();
      })


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

  $scope.allImages = allImages;
  // console.log($scope.allImages)

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
        // console.log($scope.allImages)
      })
    }
  }

  $scope.colorBool = false;
  $scope.toggleColor = function() {
    $scope.colorBool = !$scope.colorBool;
  }

  $('#skeleton').on('load',function() {
    $scope.edit();
    $('#skeleton').find('img').on('click', function(event){
      $(event.target).attr('draggable', 'true')
    })
  })

});
