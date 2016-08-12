app.directive('projectCard', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/project-card/project-card.html',
        scope: {
            projects: '='
        }
    }
})
