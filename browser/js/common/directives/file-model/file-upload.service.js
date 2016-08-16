app.service('fileUpload', ['$http', function ($http) {
    this.upload = function(data, uploadUrl){
        var fd = new FormData()
        for (var key in data)
            fd.append(key,data[key])
       
        console.log('fd', fd, data)
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(res){
            console.log('here', res)
            return(res)
        })
        .error(function(){
            console.log('error')
        });
    }
}]);