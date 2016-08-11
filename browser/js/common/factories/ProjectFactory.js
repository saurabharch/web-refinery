app.factory('ProjectFactory', function ($http) {

var projectFactory = {};

var getData = function (res){
    return res.data;
};

//creates project
projectFactory.create = function (obj){
    return $http.post('/api/project', obj)
    .then(getData);
};

//retrieves project
projectFactory.getAll = function(){
    return $http.get('/api/project')
    .then(getData);
};

return projectFactory;

});
