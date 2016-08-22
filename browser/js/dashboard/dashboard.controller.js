app.controller('DashboardCtrl', function($scope, ProjectFactory, PageFactory, allProjects) {
  $scope.projects = allProjects;

  $scope.deleteProject = function(projectId) {
    ProjectFactory.deleteProject(projectId)
    .then(function() {
      console.log('project deleted');
    })
  }

});
