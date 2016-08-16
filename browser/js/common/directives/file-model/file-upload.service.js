app.service('fileUpload', function ($http, $log) {
    this.upload = function(data, uploadUrl){
        var fd = new FormData()
        for (var key in data)
            fd.append(key,data[key])

        console.log('(*&#($*&(#*&@(*&$(*#&$(fd', fd, data.file)
        return $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(res){
            console.log('here', res)
            return(res)
        })
        .error(function(){
            $log.error('error')
        });
    }
});
