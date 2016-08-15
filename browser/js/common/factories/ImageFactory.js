app.factory('ImageFactory', function ($http) {
  var imageFactory = {}

  var getData = function (res){
    return res.data;
  };

//saves page to the backend
  imageFactory.upload = function (obj){
    //object has data = binary data of image, and projectId = currentProject.id
    console.log("WEUIQWORIUOQIWUROQIUWER)(!@*$_()*@#_)($*@_#)($*_@)#($", obj)
    return $http.post('/api/image', obj)
    .then(getData);
  };

  return imageFactory

})
