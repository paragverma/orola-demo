angular.module('app').component('page4', {
  templateUrl:  './views/page4.html',

  controller:    function ($timeout, $q, $log, $scope, $stateParams, $http) {
       console.log($stateParams.obj)
       $scope.readOnly = $stateParams.obj.readOnly;
        var self = this;
     $scope.form ={
        description:{
            previous_treatment:"",
            developmental_history:"",
            immunization_history:"",
            dietary_history:"",
            local_examintaion:"",
            investigation:"",
            provisional_diagnosis:"",
            treatment:""
        },
        anthropometry : {
            'height': '',
            'weight': '',
            'head circumference': '',
            'chest circumference': '',
            'mid arm circumference': '',
        },
        vital_signs :{
            'Temperature': '',
            'Pulse': '',
            'Respiratory rate': '',
            'Blood pressure': ''
        }, 
        gpe : {
            'Edema': '',
            'Cyanosis': '',
            'Joints': '',
            'Lymph node': '',
            'Pallor': '',
            'Clubbing': '',
            'Skin': '',
            'Spine': '',
            'Icterus': ''
        },
    systematic_examination:{
        'RS': '',
        'CVS': '',
        'PA': '',
        'CNS': '',
    },
    complaints : [{com:'', duration: 1}],
    patient_history : [{com:'', duration: 1}]
}
        $scope.add = function(array) {
            array.push({
                com: '',
                duration: ''
            })
        }

        $scope.remove = function(array, ind) {
            array.splice(ind, 1);
        };

        self.simulateQuery = false;
        self.isDisabled = false;

        // list of `state` value/display objects
        self.states = loadAll();
        self.querySearch = querySearch;
        self.selectedItemChange = selectedItemChange;
        self.searchTextChange = searchTextChange;

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
        function querySearch(query) {
            var results = query ? self.states.filter(createFilterFor(query)) : self.states,
                deferred;
            if (self.simulateQuery) {
                deferred = $q.defer();
                $timeout(function() {
                    deferred.resolve(results);
                }, Math.random() * 1000, false);
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

            return allStates.split(/, +/g).map(function(state) {
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
            $scope.form.activated = true;
            console.log($scope.form)
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

            $http.post('/secure/doctor/save_form', { form:$scope.form, appointment:$stateParams.obj.apt}).then(successCallback, errorCallback);
        }
    }
})
