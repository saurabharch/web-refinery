app.config(function ($stateProvider) {
    $stateProvider.state('new', {
        url: '/dashboard/new',
        templateUrl: 'js/new/new.html',
        controller: 'NewCtrl',
        resolve: {
            //get all the templates in an array we can then use it in our scope
            allTemplates: function(TemplateFactory){
                return TemplateFactory.fetchAll();
            }
        }
    });
});
