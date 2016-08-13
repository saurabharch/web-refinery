app.controller('NewCtrl', function($scope, ProjectFactory, PageFactory,$state, allTemplates) {
    $scope.error = null;
    $scope.templates = allTemplates;
    console.log('-------', $scope.templates)
    
    $scope.newProject = function (newProjectInfo) {
      console.log(newProjectInfogit )
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
});
