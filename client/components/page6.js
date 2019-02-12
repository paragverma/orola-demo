angular.module('app').component('page6', {
  templateUrl:  './views/page6.html',

  controller: function ($timeout, $q, $log, $scope, $http,$stateParams) {
        var self = this;
        $scope.readOnly = $stateParams.obj.readOnly;
    $scope.form={
        description:{
            'Investigation':"",
            'Provisional diagnosis':"",
            'Treatment':""
        },
        systematic_examination:{
            'RS': '',
            'CVS': '',
            'PA': '',
            'CNS': '',
            'Per speculum': '',
            'Per Rectum': '',
        }
    }
    var success=function(response) {
            if(response.data.success) {
                $log.log(response.data);
                $scope.form = response.data.form;
            }
            else {
            }
        };
        var error = function(response) {
            alert( "failure message: " + JSON.stringify(response));
        };
        if($stateParams.obj.apt.form)
            $http.post('/secure/doctor/get_form', {appointment:$stateParams.obj.apt}).then(success, error);

    $scope.postData = function() {
            console.log($scope.form);
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

            $http.post('/secure/doctor/save_form', { form:$scope.form, appointment:$stateParams.obj}).then(successCallback, errorCallback);
        }
        
    }
})


