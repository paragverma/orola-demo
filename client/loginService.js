(function () {
    'use strict';
 
    angular
        .module('app')
        .factory('loginService', Service);
 
    function Service($scope,$http,$state,$window, $log) {
        var service = {};
        
        service.successLogin = successLogin;
        service.errorLogin = errorLogin;
        service.demo = function(){
            console.log('hello from service');
        };
        return service;
        
        function successLogin (response) {
            var redirect = "";
            // this callback will be called asynchronously
            // when the response is available
            redirect = response.data.redirect;
            if(response.data.success) {
              var token = response.data.token;
              
$log.log('redirect ' + redirect);
              $window.sessionStorage.id_token = token;
              $http.defaults.headers.common.Authorization = 'Bearer ' + token;
              
$log.log('token: ' + token);
              $state.go('doctor_restricted');
                             
            }
            else {
              delete $window.sessionStorage.id_token;
              $http.defaults.headers.common.Authorization = '';
            
            }
            $state.go(redirect, {obj: $scope.user});
          };
        function errorLogin(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert( "failure message: " + JSON.stringify(response));
            // $scope.loginStatus.error=true;
          };

      // $http.post('/doctor/login', $scope.user).then(sucessLogin, errorLogin);


 
    }
 
})();