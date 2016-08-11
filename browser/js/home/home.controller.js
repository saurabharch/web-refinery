app.controller('HomeCtrl', function($scope, ProjectFactory, PageFactory, allProjects) {

$scope.projects = allProjects;
console.log($scope.projects)


});
