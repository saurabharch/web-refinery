app.service('fileUpload', function ($http, $log, ImageFactory) {
    this.upload = function(data, uploadUrl){
        var projectId = data.projectId;
        var fd = new FormData()
        for (var key in data)
            fd.append(key,data[key])

        
        return $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .then(function(res){
            return ImageFactory.getAllImages(projectId);
        })
        .then(function(array){
            return array;
        })
        .catch(function(){
            $log.error('error on fileUpload')
        });
    }
});
