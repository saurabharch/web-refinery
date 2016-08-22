app.directive('projectCard', function (ProjectFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/project-card/project-card.html',
        scope: {
            projects: '='
        },
        link: function(scope, element, attr) {
          scope.deleteProject = function(projectId) {
            ProjectFactory.deleteProject(projectId)
            .then(function() {
              // deleteProject will remove directory files and db records

              // update projects data so that deleted item will disappear
              ProjectFactory.getAll()
              .then(function(projects) {
                scope.projects = projects;
              });
            });
          }

        }
    }
})
