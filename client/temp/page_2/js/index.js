(function() {
    'use strict';
    angular
        .module('MyApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
        .controller('DemoCtrl', DemoCtrl);

    function DemoCtrl($timeout, $q, $log, $scope) {
        var self = this;
        $scope.general_examination = {
            radiogroup: [{
                heading: 'Temperature',
                value: '',
                values: [{
                    value: 'feb',
                    content: 'Feb'
                }, {
                    value: 'afeb',
                    content: 'AFeb'
                }]
            }, {
                heading: 'Pripheral pulses',
                value: '',
                values: [{
                    value: 'palpable',
                    content: 'Palpable'
                }, {
                    value: 'no',
                    content: 'No'
                }]
            }, {
                heading: 'Dehydration',
                value: '',
                values: [{
                    value: 'yes',
                    content: 'Yes'
                }, {
                    value: 'no',
                    content: 'No'
                }]
            }],
            input: [{
                value: '',
                label: 'Pulse'
            }, {
                value: '',
                label: 'BP'
            }, {
                value: '',
                label: 'RR'
            }, {
                value: '',
                label: 'Built'
            }, {
                value: '',
                label: 'Yauosis'
            }, {
                value: '',
                label: 'Pallor'
            }, {
                value: '',
                label: 'Yauosis'
            }, {
                value: '',
                label: 'Oedane'
            }, {
                value: '',
                label: 'Ieteus'
            }, {
                value: '',
                label: 'blah blah blah'
            }, {
                value: '',
                label: 'Clubbing'
            }, ]
        }

        $scope.personal_history = [{
            heading: 'Apetite',
            value: '',
            values: [{
                value: 'up',
                img: true,
                content: 'ic_trending_up_black_24px.svg'
            }, {
                value: 'down',
                img: true,
                content: 'ic_trending_down_black_24px.svg'
            }, {
                value: 'flat',
                img: true,
                content: 'ic_trending_flat_black_24px.svg'
            }]

        }, {
            heading: 'Sleep',
            value: '',
            values: [{
                value: 'up',
                img: true,
                content: 'ic_trending_up_black_24px.svg'
            }, {
                value: 'down',
                img: true,
                content: 'ic_trending_down_black_24px.svg'
            }, {
                value: 'flat',
                img: true,
                content: 'ic_trending_flat_black_24px.svg'
            }]

        }, {
            heading: 'Bowel',
            value: '',
            values: [{
                value: 'normal',
                img: false,
                content: 'Normal'
            }, {
                value: 'abnormal',
                img: false,
                content: 'Abnormal'
            }],

        }, {
            heading: 'Bladder',
            value: '',
            values: [{
                value: 'normal',
                img: false,
                content: 'Normal'
            }, {
                value: 'abnormal',
                img: false,
                content: 'Abnormal'
            }],

        }, {
            heading: 'Tobacco',
            value: '',
            values: [{
                value: 'yes',
                img: false,
                content: 'Yes'
            }, {
                value: 'no',
                img: false,
                content: 'No'
            }],

        }, {
            heading: 'Alcohol',
            value: '',
            values: [{
                value: 'yes',
                img: false,
                content: 'Yes'
            }, {
                value: 'no',
                img: false,
                content: 'No'
            }],

        }];
        $scope.symptoms = [{}];
        $scope.patient_history = [{}];

        $scope.add = function(array) {
            array.push({
                sym: '',
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


/**
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
**/
