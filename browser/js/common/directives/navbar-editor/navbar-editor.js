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
    $('#skeleton').contents().find('h1,h2,h3,h4,h5,h6,p,span,button,a').each(function() {
        if ($(this).hasClass('alreadyEditable')) $(this).removeClass('alreadyEditable')
    })
    var beforeHtml = $('#skeleton').contents().find("html").html();
    var html = "<html>\n" + beforeHtml + "</html>";
    // saves HTML to backend
    PageFactory.savePage({html: html, title: 'index', projectId:$stateParams.projectId});
  }

$("iframe").on("load", function(){
var counter = 0
//undo function
scope.undo = function(){
    counter ++
console.log("undo arraylength", undoArray.length)
console.log("undo current", counter)
$("#skeleton").contents().find("body").html(undoArray[(undoArray.length-1)-counter])
if(undoArray.length-counter ===0){
    counter = 1
} else {
return
}
}

scope.redo = function(){
    console.log("redo beginning counter", counter)
    counter --
console.log("redo array", undoArray.length)
console.log("redo current", counter)
    $("#skeleton").contents().find("body").html(undoArray[(undoArray.length-1)-counter])
console.log("diff", undoArray.length-counter)
if((undoArray.length-counter) === undoArray.length+1){
    counter = undoArray.length-1
} else {
return
}
}
})

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
