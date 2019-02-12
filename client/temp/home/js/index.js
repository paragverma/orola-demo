(function(app) {
  'use strict';

  angular
    .module('BlankApp', [ 'ngAnimate', 'ngMessages', 'ngAria', 'ngMaterial'])
    // .config(routeConfig)
    .controller('BlankAppCtrl', BlankAppCtrl);
    
  // routeConfig.$inject = ['$routeProvider'];

  // function routeConfig($routeProvider, $locationProvider) {
  //   $routeProvider
  //     .when('/details', {
  //       templateUrl: 'details.html',
  //       controller: 'BlankAppCtrl',
  //       controllerAs: 'ctrl'
  //     })
  //    .otherwise({redirectTo: '/details'});;
  // }

  
  BlankAppCtrl.$inject = ['$scope', '$mdDialog', '$mdToast', '$location', '$log'];

// contoller
  function BlankAppCtrl($scope, $mdDialog, $mdToast, $location, $log) {
    $log.log('in blankapp controller');
    // $scope.isFullScreen = false;
    // $scope.toggleFullScreen = toggleFullScreen;

    // function toggleFullScreen() {
    //   $scope.isFullScreen = !$scope.isFullScreen;
    // }

   

    // autocomplete buttons search inputs
        var self = this;

    self.simulateQuery = false;
    self.isDisabled    = false;

    // list of `state` value/display objects
    self.states        = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;

    self.newState = newState;

    function newState(state) {
      alert("Sorry! You'll need to create a Constitution for " + state + " first!");
    }

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }

    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }

    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
      var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';

      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };

    }
// end of md-autocomplete button search inputs

// section specialities menu 
 var originatorEv;

    this.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    this.closeMenu = function($mdCloseMenu, ev) {
        originatorEv = ev;
        $mdCloseMenu(ev);
    }
    // end of section specialities menu

    // customer review section
         self.hovering= false;
    // end of customer review section
    
    // fab button 
      this.isOpen = false;
      this.selectedMode = 'md-fling';
      this.selectedDirection = 'right';
      // end of fab button
  }
}());