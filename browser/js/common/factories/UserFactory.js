app.factory('userFactory', function($http) {
  var userFactory ={};

  var getData = function(res) {
    return res.data;
  }
  var baseUrl = '/api/user/';

  
  userFactory.createUser = function(obj) {
      return $http.post(baseUrl, obj)
        .then(getData);
  }

  return userFactory;
})
