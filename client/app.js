var myApp = angular.module('app', ['ui.router', 'ui.router.visualizer','ngMaterial','ngMessages', 'material.svgAssetsCache', 'md.data.table', 'ngAnimate','ngAria', 'lfNgMdFileInput', 'jkAngularCarousel', 'ngPrint']);
myApp.service('Map', function($q) {
    
    this.init = function() {
        var options = {
            center: new google.maps.LatLng(40.7127837, -74.00594130000002),
            zoom: 13,
            disableDefaultUI: true    
        }
        this.map = new google.maps.Map(
            document.getElementById("map"), options
        );
        this.places = new google.maps.places.PlacesService(this.map);
    }
    
    this.search = function(str) {
        var d = $q.defer();
        this.places.textSearch({query: str}, function(results, status) {
            if (status == 'OK') {
                d.resolve(results[0]);
            }
            else d.reject(status);
        });
        return d.promise;
    }
    
    this.addMarker = function(res) {
        if(this.marker) this.marker.setMap(null);
        this.marker = new google.maps.Marker({
            map: this.map,
            position: res.geometry.location,
            animation: google.maps.Animation.DROP
        });
        this.map.setCenter(res.geometry.location);
    }
    
});

myApp.config(function($stateProvider, $locationProvider) {
  // An array of state definitions
  var states = [
    {
      name: 'signup',
      url: '/signup',
      // Using component: instead of template:
      component: 'signup'
    },

    {
      name: 'doctor_restricted',
      url: '/doctor_restricted',
      // Using component: instead of template:
      component: 'doctor_restricted'
    },

    {
      name: 'login',
      url: '/login',
      // Using component: instead of template:
      component: 'login'
    },
    {
      name: 'logout',
      url: '/logout',
      // Using component: instead of template:
      component: 'logout'
    },
    {
      name: 'page2',
      url: '/page2',
      params: {
        obj: {}
      },
      // Using component: instead of template:
      component: 'page2'
    },
    {
      name: 'page3',
      url: '/page3',
      // Using component: instead of template:
      params: {
        obj: {}
      },
      component: 'page3'
    },
    {
      name: 'page4',
      url: '/page4',
      params: {
        obj: {}
      },
      // Using component: instead of template:
      component: 'page4'
    },
    {
      name: 'page5',
      url: '/page5',
      params: {
        obj: {}
      },
      // Using component: instead of template:
      component: 'page5'
    },
    {
      name: 'page6',
      url: '/page6',
      params: {
        obj: {}
      },
      // Using component: instead of template:
      component: 'page6'
    },
    {
      name: 'page7',
      url: '/page7',
      params: {
        obj: {}
      },
      // Using component: instead of template:
      component: 'page7'
    },
    {
      name: 'page8',
      url: '/page8',
      params: {
        obj: {}
      },
      // Using component: instead of template:
      component: 'page8'
    },
    {
      name: 'page9',
      url: '/page9',
      // Using component: instead of template:
       params: {
        obj: {}
      },
      component: 'page9'
    },
    {
      name: 'page10',
      url: '/page10',
      // Using component: instead of template:
       params: {
        obj: {}
      },
      component: 'page10'
    },
    {
      name: 'home',
      url: '/',
      // Using component: instead of template:
      component: 'home'
    },
    {
      name: 'signup2',
      url: '/signup2',
      // Using component: instead of template:
      component: 'signup2'
    },
    {
      name: 'dashboard',
      url: '/dashboard',
      params: {
        obj: null
      },
      // Using component: instead of template:
      component: 'dashboard'
    }


  ]
  $locationProvider.html5Mode(true).hashPrefix('!')

  // Loop over the state definitions and register them
  states.forEach(function(state) {
    $stateProvider.state(state);
  });
}).controller('MyCtrl',function($rootScope, $log, $http){

    $log.log('in app.js');
    var successCallback=function(response) {
        if(response.data.success) {
          $rootScope.loggedIn = response.data.isLoggedIn;
          $log.log(response.data.isLoggedIn);
        }
        else {
        }
      };
      var errorCallback = function(response) {
            alert( "failure message: " + JSON.stringify(response));
      };
      $http.post('/secure/doctor/check_login').then(successCallback, errorCallback);
})
