app.factory('TemplateFactory', function($http) {

var templateFactory = {};

//called from our new state (new.js) in the resolve
templateFactory.fetchAll = function() { 
    return $http.get('/api/templates/')
        .then(function(templateArray){
            return templateArray.data;
        })
}


return templateFactory;
})