app.config(function ($stateProvider) {
    $stateProvider.state('editor', {
        url: '/editor/:projectId',
        templateUrl: 'js/editor/editor.html',
        controller: 'EditorCtrl',
        resolve: {
            currentProject: function(ProjectFactory,$stateParams) {
                return ProjectFactory.getOne($stateParams.projectId)
            },
            allImages: function(ImageFactory,$stateParams){
                return ImageFactory.getAllImages($stateParams.projectId)
            }
        }
    });
});
