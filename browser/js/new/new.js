app.config(function ($stateProvider) {
    $stateProvider.state('new', {
        url: '/dashboard/new',
        templateUrl: 'js/new/new.html',
        controller: 'NewCtrl'
    });
});
