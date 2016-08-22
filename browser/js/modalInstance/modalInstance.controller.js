app.controller('ModalInstanceCtrl', function($scope, $uibModalInstance, textSelected) {

  $scope.textSelected = textSelected;

  $scope.ok = function() {
    $uibModalInstance.close($scope.textSelected);
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
  
});