app.directive('navbarEditor', function ($rootScope, AuthService, AUTH_EVENTS, $state,PageFactory, $stateParams) {

    return {
        restrict: 'EA',
        scope: {},
        templateUrl: 'js/common/directives/navbar-editor/navbar-editor.html',
        link: function (scope,elem,attr) {
            scope.items = [
                { label: 'Home', state: 'home' },
                { label: 'Dashboard', state: 'dashboard', auth:true }
                ];


scope.user = null;

scope.isLoggedIn = function () {
    return AuthService.isAuthenticated();
};

scope.logout = function () {
    AuthService.logout().then(function () {
       $state.go('home');
   });
};

var setUser = function () {
    AuthService.getLoggedInUser().then(function (user) {
        scope.user = user;
    });
};

var removeUser = function () {
    scope.user = null;
};

setUser();

//parses HTML from iFrame
  scope.parseHtml = function() {
    var beforeHtml = $('#skeleton').contents().find("html").html();
    var html = "<html>\n" + beforeHtml + "</html>";
    // saves HTML to backend
    PageFactory.savePage({html: html, title: 'index', projectId:$stateParams.projectId});
  }


scope.download = function() { 
    scope.parseHtml();
    var url = "http://localhost:1337/api/project/" + $stateParams.projectId + "/download/";
    window.open(url, 'Download');
  }


$rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
$rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
$rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

}

};

});
