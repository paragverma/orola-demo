 angular.module('app').component('page9', {
  templateUrl:  './views/page9.html',

  controller:     function ($timeout, $q, $log, $scope, $stateParams, $http) {    
      console.log($stateParams.obj.apt)
      console.log($stateParams.obj.readOnly)
      $scope.readOnly = $stateParams.obj.readOnly;
        $scope.form ={
            test_name: '',
            test_description: '',
            comments: '',
            urls:''
        }        
        
        $scope.add = function(array) {
            array.push('')
        }

        $scope.remove = function(array, ind) {
            array.splice(ind, 1);
        };
        
        var success=function(response) {
            if(response.data.success) {
            $log.log(response.data);
            $scope.form = response.data.form;
            $timeout(
                    function(){
                        console.log($scope.form.urls);
                        console.log($scope.form.urls.split('client/')[1]);
                        $scope.addRemoteFilesApi.addRemoteFile($scope.form.urls.split('client/')[1],'sample.jpg','image');
                        // $scope.addRemoteFilesApi.addRemoteFile('http://shuyu.github.io/angular-material-fileinput/example/resources/sample.mp4','sample.mp4','video');
                        // $scope.addRemoteFilesApi.addRemoteFile('http://shuyu.github.io/angular-material-fileinput/example/resources/sample.mp3','sample.mp3','audio');
                        // $scope.addRemoteFilesApi.addRemoteFile('http://shuyu.github.io/angular-material-fileinput/example/resources/sample.pdf','sample.pdf','other');
                        // $scope.addRemoteFilesApi.addRemoteFile('file:///home/hp/all_projects/Orola_MEAN-8bcdd3c77b4bc1d4ffd1d65684bcc71660d53f41/client/uploads/UPL.jpg','image');                        
                    }
                )
            }
            else {
            }
        };
        var error = function(response) {
            alert( "failure message: " + JSON.stringify(response));
        };
        if($stateParams.obj.apt.form)
            $http.post('/secure/doctor/get_form', {appointment:$stateParams.obj.apt}).then(success, error);
// image upload
              $scope.$watch('files.length',function(newVal,oldVal){
                  console.log("in watch");
                //   $scope.form.urls = $scope.files;
            console.log($scope.files);
        });
                $scope.optoin08 = {
                    "browseIconCls":"myBrowse",
                    "removeIconCls":"myRemove",
                    "captionIconCls":"myCaption",
					"submitIconCls":"mySubmit",
					"unknowIconCls":"myUnknow"
                };
                $scope.onFileClick = function(obj,idx){
                    console.log(obj);
                };

                $scope.onSubmitClick = function(files) {
                    console.log(files);
                }

				$scope.onSubmitFilesChange = function() {
					console.log($scope.submitButtonFiles);
                }

                $scope.onFileRemove = function(obj,idx){
                    console.log(obj);
                };
                

                // $timeout(
                //     function(){
                //         console.log($scope.form.urls);
                //         console.log($scope.form.urls.split('client/')[1]);
                //         $scope.addRemoteFilesApi.addRemoteFile($scope.form.urls.split('client/')[1],'sample.jpg','image');
                //         // $scope.addRemoteFilesApi.addRemoteFile('http://shuyu.github.io/angular-material-fileinput/example/resources/sample.mp4','sample.mp4','video');
                //         // $scope.addRemoteFilesApi.addRemoteFile('http://shuyu.github.io/angular-material-fileinput/example/resources/sample.mp3','sample.mp3','audio');
                //         // $scope.addRemoteFilesApi.addRemoteFile('http://shuyu.github.io/angular-material-fileinput/example/resources/sample.pdf','sample.pdf','other');
                //         // $scope.addRemoteFilesApi.addRemoteFile('file:///home/hp/all_projects/Orola_MEAN-8bcdd3c77b4bc1d4ffd1d65684bcc71660d53f41/client/uploads/UPL.jpg','image');                        
                //     }
                // )
                var remote;
        // end of image upload 
        $scope.postData = function() {
            // console.log($scope.form)
            
            var successCallback=function(response) {
                if(response.data.success) {
                $log.log(response.data);
                alert('form saved successfully');
                }
                else {
                }
            };
            var errorCallback = function(response) {
                alert( "failure message: " + JSON.stringify(response));
            };
            
            var formData = new FormData();
        angular.forEach($scope.files,function(obj){
            if(!obj.isRemote){
                remote=false;
                obj.lfFile.name = $scope.files[0].lfFileName;
                formData.append('files[]', obj.lfFile);
            }
            else{
                remote=true;
            }
            
        });
        // console.log(formData);
        $http.post('/secure/upload', formData
        ,{
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }
        ).then(function(result){
            console.log("in upload");
            if(!remote){
                $scope.form.urls = result.data.url;
            }
            $http.post('/secure/doctor/save_form', { form:$scope.form, appointment:$stateParams.obj.apt}).then(successCallback, errorCallback);
            // do sometingh                    
        },function(err){
          alert(err);
            // do sometingh 
        });
                    
        
        }
    }
})