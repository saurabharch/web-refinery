app.controller('DashboardCtrl', function($scope, ProjectFactory, PageFactory, allProjects) {
  $scope.projects = allProjects;
});
