angular.module('app').component('page8', {
  templateUrl:  './views/page8.html',

  controller: function ($mdEditDialog, $q, $scope, $timeout, $log, $http, $stateParams) {
  'use strict';
  $scope.readOnly = $stateParams.obj.readOnly;
  $scope.selected = [];
  $scope.form = {
    others: '',
    DataList : {
      // "count": 9,
      "Plasma glucose (F)":['', 'mg/dl', '70-100', ''],//value unit range comment
      "Plasma glucose (FF)":['', 'mg/dl', '70-100', ''],
      "Plasma glucose (R)":['', 'mg/dl', '70-100', ''],
      "name":['', 'mg/dl', '70-100', ''],
      "name":['', 'mg/dl', '70-100', ''],
      "name":['', 'mg/dl', '70-100', ''],
      "name":['', 'mg/dl', '70-100', ''],
      "name":['', 'mg/dl', '70-100', ''],
    },
    urls:''
  }
  $scope.add = function(array) {
    
      array.push(
        
          // "name": [$scope.name,$scope.value,$scope.unit,$scope.range,$scope.comment]
          // "value": 
          // "unit": 
          // "range": 
          // "comment": 
          {
          "name": $scope.name,
          "value": $scope.value,
          "unit": $scope.unit,
          "range": $scope.range,
          "comment": $scope.comment
                  
      }
                  
      )
  }
  $scope.remove = function(array, ind) {
      array.splice(ind, 1);
  };

  $scope.editValue = function (event, test) {
    event.stopPropagation(); // in case autoselect is enabled
    
    var editDialog = {
      modelValue: $scope.form.DataList[test][0],
      placeholder: 'Add a value',
      save: function (input) {

        $scope.form.DataList[test][0] = input.$modelValue;
      },
      targetEvent: event,
      title: 'Add a value',
      type: 'number',
      
      validators: {
         
         step: "0.01",
      }
    };
    
    var promise;
    promise = $mdEditDialog.small(editDialog);
    
    promise.then(function (ctrl) {
      var input = ctrl.getInput();
      
      input.$viewChangeListeners.push(function () {
        input.$setValidity('name', input.$modelValue !== 'name');
      });
    });
  };
  
  $scope.editComment = function (event, test) {
    event.stopPropagation(); // in case autoselect is enabled
    
    var editDialog = {
      modelValue: $scope.form.DataList[test][3],
      placeholder: 'Add a comment',
      save: function (input) {

        $scope.form.DataList[test][3] = input.$modelValue;
      },
      targetEvent: event,
      title: 'Add a comment',
      validators: {
        'md-maxlength': 30
      }
    };
    
    var promise;
    
      promise = $mdEditDialog.small(editDialog);
    
    promise.then(function (ctrl) {
      var input = ctrl.getInput();
      
      input.$viewChangeListeners.push(function () {
        input.$setValidity('name', input.$modelValue !== 'name');
      });
    });
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
                // obj.lfFile.name = $scope.files[0].lfFileName;
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

