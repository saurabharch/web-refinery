app.factory('ImageFactory', function ($http) {
  var imageFactory = {}

  var getData = function (res){
    return res.data;
  };

//saves page to the backend
  imageFactory.upload = function (obj){
    //object has data = binary data of image, and projectId = currentProject.id
    return $http.post('/api/image', obj)
    .then(getData);
  };

  imageFactory.getAllImages = function (projectId){
    console.log('proj', projectId)
    return $http.get('/api/image/' + projectId)
    .then(getData)
  } 

  return imageFactory

})
