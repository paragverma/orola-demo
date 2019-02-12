(function() {
    'use strict';
    angular
        .module('MyApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
        .controller('DemoCtrl', DemoCtrl);

    function DemoCtrl($timeout, $q, $log, $scope) {
        var self = this;
        $scope.description={
            previous_treatment:"",
            developmental_history:"",
            immunization_history:"",
            dietary_history:"",
            local_examintaion:""
        }
        $scope.body_ratio = [
            {
                label: 'height',
                value: ''
            },
            {
                label: 'weight',
                value: ''
            },
            {
                label: 'head',
                value: ''
            },
            {
                label: 'something1',
                value: ''
            },
            {
                label: 'somethin2',
                value: ''
            },
 
        ]
        $scope.vital_signs = [

                {
                    label: 'Temperature',
                    value: ''
                },
                {
                    label: 'Pulse',
                    value: ''
                },
                {
                    label: 'RR',
                    value: ''
                },
                {
                    label: 'BP',
                    value: ''
                }
    ]
        $scope.gpe = {
            col1:[
            {
                label: 'label1',
                value: ''
            },
            {
                label: 'label1',
                value: ''
            },
            {
                label: 'label1',
                value: ''
            },
            {
                label: 'label1',
                value: ''
            }

            ],
            col2:[
                {
                    label: 'label2',
                    value: ''
                },
                {
                    label: 'label2',
                    value: ''
                },
                {
                    label: 'label2',
                    value: ''
                },
                {
                    label: 'label2',
                    value: ''
                }

            ]


    }
    $scope.systematic_examination=[
            {
                label: 'RS',
                value: ''
            },
            {
                label: 'CUS',
                value: ''
            },
            {
                label: 'PA',
                value: ''
            },
            {
                label: 'CNS',
                value: ''
            }
    ]

        $scope.complaints = [{}];
        $scope.patient_history = [{}];

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
    }
})();
