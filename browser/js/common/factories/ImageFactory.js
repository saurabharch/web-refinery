app.factory('ImageFactory', function ($http) {
  var imageFactory = {}

  var getData = function (res){
    return res.data;
  };

  //this is the array to store on the scope of editor controller
  //on every upload, we add to this array and force the dom to re-render with the new image
  imageFactory.imageCache = [];


  imageFactory.getAllImages = function (projectId){
    return $http.get('/api/image/' + projectId)
    .then(function(res) {
      imageFactory.imageCache = res.data;
      return res.data
    })
  }

  return imageFactory

})
