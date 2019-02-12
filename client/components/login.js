angular.module('app').component('login', {
  templateUrl:  './views/login.html',

    controller: function($scope,$http,$state,$window, $log, $rootScope) {
    $scope.user = {email: "", password: ""};
    $scope.loginStatus = {error : false};
    

    $scope.postData = function() {
      $log.log('in login postData');
      var successCallback=function(response) {
            // this callback will be called asynchronously
            // when the response is available
            var redirect = response.data.redirect;
            var profile = response.data.profile;
            if(response.data.success) {

              $log.log('redirect ' + redirect);

              //$log.log('token: ' + token);
              $rootScope.loggedIn = true;
              $state.go(redirect,profile);
            }
            else {
              $scope.loginStatus.error=true;
            }
            $state.go(redirect);
          };
       var errorCallback = function(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert( "failure message: " + JSON.stringify(response));
            $scope.loginStatus.error=true;
          };

      $http.post('/doctor/login', $scope.user).then(successCallback, errorCallback);


  }
}
});
