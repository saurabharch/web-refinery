// app.directive('dataInsertHtml', ['$parse', function ($parse,$compile) {
//     return {
//         scope: {allImages: '='},
//         restrict: 'A',
//         link: function(scope, element, attrs) {
//             var model = $parse(attrs.dataInsertHtml);
//             var modelSetter = model.assign;
//             scope.$watch(allImages, function(){
//                 console.log('heahrhaerhae')
//                 scope.$apply(function(){
//                     modelSetter(scope, element[0].files[0]);
//                 });
//             });
//         }
//     };
// }]);