app.controller('NewCtrl', function($scope, ProjectFactory, PageFactory) {
    $scope.error = null;

    $scope.newProject = function (newProjectInfo) {
        $scope.error = null;

        ProjectFactory.create(newProjectInfo)
        .then(function(newProject) {
          // Return newly created project: id, title, template info
          // Use $state to redirect to editor for the given id
        })
        .catch(function() {
          $scope.error = 'Invalid login credentials.';
        })
    };
});
