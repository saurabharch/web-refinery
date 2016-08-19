app.directive('elementMenu', function () {
    return {
        transclude:true,
        restrict: 'E',
        templateUrl: 'js/common/directives/element-menu/element-menu.html',
        link: function(scope, element, attr){
          scope.click = function($event){
            var currentElement = $($event.currentTarget)
            if(currentElement.hasClass("activeCategory")){
              console.log("here")
              currentElement.removeClass("activeCategory")
            } else {
            $(".mySideNav").find(".collapse.in").removeClass("activeCategory").collapse('hide')
           currentElement.addClass("activeCategory")
           }
           }
         }
          }
        }
    )
