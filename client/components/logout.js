angular.module('app').component('logout', {
//   templateUrl:  './views/login.html',

    controller: function($scope,$http,$state, $log, $rootScope, $mdToast) {
    // $scope.user = {email: "", password: ""};
    // $scope.loginStatus = {error : false};
    
    $log.log('in logout.js')
      var successCallback=function(response) {
            var redirect = response.data.redirect;
            // var profile = response.data.profile;
            if(response.data.success) {

              $log.log('redirect ' + redirect);

              //$log.log('token: ' + token);
              $rootScope.loggedIn = false;
              $state.go(redirect);
              var toast = $mdToast.simple().content('You have ' + response.data.extras.msg).position('bottom right');
              $mdToast.show(toast);
            }
            else {
              $scope.loginStatus.error=true;
            }
            // $state.go(redirect);
          };
       var errorCallback = function(response) {
            alert( "failure message: " + JSON.stringify(response));
            // $scope.loginStatus.error=true;
          };

      $http.post('/doctor/logout').then(successCallback, errorCallback);
}
});
