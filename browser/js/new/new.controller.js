app.controller('NewCtrl', function($scope, ProjectFactory, PageFactory,$state, allTemplates) {
    $scope.error = null;
    $scope.templates = allTemplates;

    $scope.newProject = function (newProjectInfo) {
      if (!newProjectInfo.template) newProjectInfo.template = $scope.templates[0].title;
      $scope.error = null;

      ProjectFactory.create(newProjectInfo)
      .then(function(newProject) {
        // Return newly created project: id, title, template info
        // Use $state to redirect to editor for the given id
        $state.go('editor', {projectId: newProject.id})
      })
      .catch(function() {
        $scope.error = 'Please fill out everything.';
      })
    };

    $scope.new = {
      template: $scope.templates[0].title
    }
});
