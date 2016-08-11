app.controller('HomeCtrl', function($scope) {


  $scope.edit = function () {
    $('#skeleton').contents().find('body').each(function() {
      $(this).attr('contenteditable', 'true');
    });
  }

  $scope.parseHtml = function() {
    // console.log('made it');
    var html = $('#skeleton').contents().find("html").html();

    console.log(typeof html);


  }

});
