app.directive('navbarEditor', function($rootScope, AuthService, AUTH_EVENTS, $state, PageFactory, $stateParams) {

  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'js/common/directives/navbar-editor/navbar-editor.html',
    link: function(scope, elem, attr) {
      scope.items = [
      { label: 'Home', state: 'home' },
      { label: 'Dashboard', state: 'dashboard', auth: true }
      ];

      scope.user = null;

      scope.isLoggedIn = function() {
        return AuthService.isAuthenticated();
      };

      scope.logout = function() {
        AuthService.logout().then(function() {
          $state.go('home');
        });
      };

      var setUser = function() {
        AuthService.getLoggedInUser().then(function(user) {
          scope.user = user;
        });
      };

      var removeUser = function() {
        scope.user = null;
      };

      setUser();

      //parses HTML from iFrame
      scope.parseHtml = function(exportBool) {
        $('#skeleton').contents().find('h1,h2,h3,h4,h5,h6,p,span,button,a').each(function() {
          $(this).removeClass('alreadyEditable changeThis dashedBorder')
        })

        if (exportBool){
        $("#skeleton").contents().find('[data-dragcontext-marker],.drop-marker,[class^="ui-resizable"], dashedBorder').remove();
        }

        var beforeHtml = $('#skeleton').contents().find("html").html();
        var html = "<html>\n" + beforeHtml + "</html>";
        // saves HTML to backend
        PageFactory.savePage({ html: html, title: 'index', projectId: $stateParams.projectId });
      }

      $("iframe").on("load", function() {
        var counter = 0;
        //undo function
        scope.undo = function() {
          if (counter < undoArray.length - 1) {
            counter++;
            $("#skeleton").contents().find("body").html(undoArray[(undoArray.length - 1) - counter]);
            angular.element(document.getElementsByTagName('element-menu')[0]).scope().edit();
          }
        }

        scope.redo = function() {
          if (counter > 0) {
            counter--;
            $("#skeleton").contents().find("body").html(undoArray[(undoArray.length - 1) - counter]);
            angular.element(document.getElementsByTagName('element-menu')[0]).scope().edit();
          }
        }
      });

      scope.download = function() {
        scope.parseHtml(true);
        var url = "api/project/" + $stateParams.projectId + "/download/";
        window.open(url, 'Download');
      }

      $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
      $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
      $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);
    }
  };
});
