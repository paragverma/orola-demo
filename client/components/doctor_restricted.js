angular.module('app').component('doctor_restricted', {
  templateUrl:  './views/restricted.html',
  controller: function($scope,$http,$state,$window,jwtHelper) {
    $rootScope.$on('$viewContentLoading', function(event, viewConfig)
    {
  // code that will be executed ...
  // before the view begins loading
    $http({url: '/secure/doctor/restricted', method: 'GET'})
    .success(function (data, status, headers, config) {
      $scope.message = data.name; // Should log 'foo'
    })
    .error(function (data, status, headers, config) {
      alert(data);
    });

  });
}
});
