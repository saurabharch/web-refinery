app.factory('ImageFactory', function ($http) {
  var imageFactory = {}

  var getData = function (res){
    return res.data;
  };


  imageFactory.imageCache = [];

//saves page to the backend
  // imageFactory.upload = function (obj){
  //   //object has data = binary data of image, and projectId = currentProject.id
  //   return $http.post('/api/image', obj)
  //   .then(getData);
  // };

  imageFactory.getAllImages = function (projectId){
    return $http.get('/api/image/' + projectId)
    .then(function(res) {
      imageFactory.imageCache = res.data;
      return res.data
    })
  }

  return imageFactory

})
