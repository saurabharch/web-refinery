app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
          allProjects: function(ProjectFactory){
            return ProjectFactory.getAll();
          }
        }

    });
});



