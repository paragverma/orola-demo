angular.module('app').component('signup', {
  templateUrl:  './views/signup.html',

  controller: function($scope,$state,$http,$window, $log) {
    $log.log("in signup controller");
    $scope.user = {firstname:"", lastname:"", email: "", password: "", sex :"M",mobile: ""};
    $scope.signUpError = false;

    var redirect = "";
    /*
    var sucessLogin=function(response) {
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
              $scope.loginStatus.error=true;
              // $state.go('login');
            }
            $log.log('redirect after login successs ' + redirect);
            $log.log($scope.user);
            $state.go(redirect, {obj: $scope.user});
          };

       var errorLogin = function(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert( "failure message: " + JSON.stringify(response));
            $scope.loginStatus.error=true;
          };

      // $http.post('/doctor/login', $scope.user).then(sucessLogin, errorLogin);
      */



    $scope.postData = function() {
          var successCallback=function(response) {
            // this callback will be called asynchronously
            // when the response is available
            redirect = response.data.redirect;
            if(response.data.success) {
              $log.log('redirect ' + redirect);

              $log.log(response.data);
              $state.go('signup2');

            }
            else {
              $scope.signUpError=true;
            }
            // $log.log('redirect after login successs ' + redirect);
            //  $state.go(redirect);
          };
       var errorCallback = function(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert( "failure message: " + JSON.stringify(response));
            console.log(response.data.extras.msg)
            $scope.signUpError=true;
          };

      $http.post('/doctor/signup', $scope.user).then(successCallback, errorCallback);
    }
  }
})
