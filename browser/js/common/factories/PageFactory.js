app.factory('PageFactory', function ($http) {
  var pageFactory = {}

  var getData = function (res){
    return res.data;
  };

//saves page to the backend
  pageFactory.savePage = function (obj){
    return $http.post('/api/page', obj)
    .then(getData);
  };

//fetch pages for a specific project
  pageFactory.getPage = function (projectId){
    return $http.get('/api/page')
    .then(getData);
  };
  return pageFactory

})
