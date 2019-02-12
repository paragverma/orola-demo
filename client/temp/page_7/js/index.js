(function() {
    'use strict';
    angular
        .module('MyApp', ['ngMaterial', 'md.data.table','ngMessages', 'material.svgAssetsCache'])
        .controller('DemoCtrl', DemoCtrl);

    function DemoCtrl($mdEditDialog, $timeout, $q, $log, $scope) {

            // TABLE
    $scope.eyeCheckup ={
        data:[
            {
                "activity": "Distance",
                "REuA": "323",
                "REA": "323",
                "LEuA": "54545",
                "LEA": "",
                "LE":"",
                "RE":""
            },
            {
                "activity": "Near",
                "REuA": "",
                "REA": "",
                "LEuA": "",
                "LEA": "",
                "LE":"",
                "RE":""
            },
            {
                "activity": "Lids",
                "REuA": "",
                "REA": "",
                "LEuA": "",
                "LEA": "",
                "LE":"",
                "RE":""
            },
                        {
                "activity": "Communication",
                "REuA": "",
                "REA": "",
                "LEuA": "",
                "LEA": "",
                "LE":"",
                "RE":""
            },
            {
                "activity": "Cornea",
                "REuA": "",
                "REA": "",
                "LEuA": "",
                "LEA": "",
                "LE":"",
                "RE":""
            },
            {
                "activity": "Ant. something",
                "REuA": "",
                "REA": "",
                "LEuA": "",
                "LEA": "",
                "LE":"",
                "RE":""
            },
            {
                "activity": "Iris",
                "REuA": "",
                "REA": "",
                "LEuA": "",
                "LEA": "",
                "LE":"",
                "RE":""
            },
            {
                "activity": "Pupil",
                "REuA": "",
                "REA": "",
                "LEuA": "",
                "LEA": "",
                "LE":"",
                "RE":""
            },
            {
                "activity": "Lens",
                "REuA": "",
                "REA": "",
                "LEuA": "",
                "LEA": "",
                "LE":"",
                "RE":""
            },
            

            
        ]
    }
//       $scope.DataList = {
//     "count": 9,
    
//     "data": [
//       {
//         "name": "Plasma glucose (F)",
//         "value": "",
//         "unit": "mg/dl",
//         "range": "70-100",
//         "comment": ""
//       },
//       {
//         "name": "Plasma glucose (FF)",
//         "value": "",
//         "unit": "mg/dl",
//         "range": "< 140",
//         "comment": ""
//       },
//       {
//         "name": "Plasma glucose (R)",
//         "value": "",
//         "unit": "mg/dl",
//         "range": "",
//         "comment": ""
//       },
//       {
//         "name": "name",
//         "value": "",
//         "unit": "mg/dl",
//         "range": "",
//         "comment": ""
//       },
//       {
//         "name": "name",
//         "value": "",
//         "unit": "mg/dl",
//         "range": "0-100",
//         "comment": ""
//       },
//       {
//         "name": "name",
//         "value": "",
//         "unit": "mg/dl",
//         "range": "0-100",
//         "comment": ""
//       },
//       {
//         "name": "name",
//         "value": "",
//         "unit": "mg/dl",
//         "range": "0-100",
//         "comment": ""
//       },
//       {
//         "name": "name",
//         "value": "",
//         "unit": "mg/dl",
//         "range": "0-100",
//         "comment": ""
//       },
      
//     ]
//   };
//   $scope.addRow = function(array) {
//       array.push(
//         {
//           "name": $scope.name,
//           "value": $scope.value,
//           "unit": $scope.unit,
//           "range": $scope.range,
//           "comment": $scope.comment
                  
//       })
//   }
//   $scope.remove = function(array, ind) {
//       array.splice(ind, 1);
//   };

//   $scope.editValue = function (event, dessert) {
//     event.stopPropagation(); // in case autoselect is enabled
    
//     var editDialog = {
//       modelValue: dessert.value,
//       placeholder: 'Add a value',
//       save: function (input) {

//         dessert.value = input.$modelValue;
//       },
//       targetEvent: event,
//       title: 'Add a value',
//       type: 'number',
      
//       validators: {
         
//          step: "0.01",
//       }
//     };
    
//     var promise;
//     promise = $mdEditDialog.small(editDialog);
    
//     promise.then(function (ctrl) {
//       var input = ctrl.getInput();
      
//       input.$viewChangeListeners.push(function () {
//         input.$setValidity('name', input.$modelValue !== 'name');
//       });
//     });
//   };
  
  $scope.editComment = function (event, test) {
    event.stopPropagation(); // in case autoselect is enabled
    var editDialog = {
      //modelValue: test.REuA,
      placeholder: 'Add a comment',
      save: function (input) {
        var id = event.target.id;
        if(id == 'REuA'){
            test.REuA = input.$modelValue;
        }
        else if(id == 'REA'){
            test.REA = input.$modelValue;
        }
        else if(id == 'LEuA'){
            test.LEuA = input.$modelValue;
        }
        else if(id == 'LEA'){
            test.LEA = input.$modelValue;
        }
        else if(id == 'LE'){
            test.LE = input.$modelValue;
        }
        else if(id == 'RE'){
            test.RE = input.$modelValue;
        }
       
        //console.log( "hie"+ event.target.id);

        
      },
      targetEvent: event,
      title: 'Add a comment',
      validators: {
        'md-maxlength': 30
      }
    };
    
    var promise;
    
      promise = $mdEditDialog.small(editDialog);
    
    promise.then(function (ctrl) {
      var input = ctrl.getInput();
      
      input.$viewChangeListeners.push(function () {
        input.$setValidity('name', input.$modelValue !== 'name');
      });
    });

    };

        var self = this;
        $scope.description={
            family_history:"",
            immunization_history:"",
            previous_treatment:""
        }
        $scope.general_analysis = {
            col1:[ {
                label: 'RS',
                value: ''
            },
            {
                label: 'PA',
                value: ''
            },
            {
                label: 'CUS',
                value: ''
            }],
           col2:[
               {
                label: 'P',
                value: ''
            },
            {
                label: 'CNS',
                value: ''
            },
            {
                label: 'BP',
                value: ''
            }
           ]
 
        }
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
    };
})();