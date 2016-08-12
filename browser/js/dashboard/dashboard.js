app.config(function ($stateProvider) {
    $stateProvider.state('dashboard', {
        url: '/dashboard',
        templateUrl: 'js/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        resolve: {
          allProjects: function(ProjectFactory){
            return ProjectFactory.getAll();
          }
        }

    });
});



