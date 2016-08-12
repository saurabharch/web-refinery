app.config(function ($stateProvider) {
    $stateProvider.state('new', {
        url: '/new',
        templateUrl: 'js/new/new.html',
        controller: 'NewCtrl'
    });
});
