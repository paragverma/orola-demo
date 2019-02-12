angular.module('app').component('page7', {
  templateUrl:  './views/page7.html',

  controller:     function ($mdEditDialog, $timeout, $q, $log, $scope) {
            // TABLE
             $scope.readOnly = $stateParams.obj.readOnly;
        $scope.form={
            ocular_examination :{
                "Distance":['hello', '', '', ''], // REuA, REA, LEuA, LEA
                "Near" :['', '', '', ''],
                "Lids":['', '', '', ''],
                "Conjuctiva":['', '', '', ''],
                "Cornea":['', '', '', ''],
                "Anterior Chamber":['', '', '', ''],
                "Iris":['', '', '', ''],
                "Pupil":['', '', '', ''],
                "Lens":['', '', '', ''],
            },
            fundus_examination : {
                "Media":['', ''],//REA LEA
                "Disc":['', ''],
                "Macula":['', ''],
                "Blood vessels":['', ''],
                "Periphery":['', ''],
            },
            description:{
                family_history:"",
                immunization_history:"",
                previous_treatment:"",
                provisional_diagnosis:"",
                treatment:""
            },
            general_analysis : {
                'RS': '',
                'CVS': '',
                'P/A': '',
                'CNS': '',
                'P': '',
                'BP': '',
            },
            complaints : [{com:'', duration: 1}],
            patient_history : [{com:'', duration: 1}]
        }
  $scope.editComment = function (event, test) {
    event.stopPropagation(); // in case autoselect is enabled
    var editDialog = {
      //modelValue: test.REuA,
      placeholder: 'Add a comment',
      save: function (input) {
        var id = event.target.id;
        if(id == 'REuA'){
            $scope.form.ocular_examination[test][0] = input.$modelValue;
        }
        else if(id == 'REA'){
            $scope.form.ocular_examination[test][1] = input.$modelValue;
        }
        else if(id == 'LEuA'){
            $scope.form.ocular_examination[test][2] = input.$modelValue;
        }
        else if(id == 'LEA'){
            $scope.form.ocular_examination[test][3] = input.$modelValue;
        }
        else if(id == 'LE'){
            $scope.form.fundus_examination[test][1] = input.$modelValue;
        }
        else if(id == 'RE'){
            $scope.form.fundus_examination[test][0] = input.$modelValue;
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
            var allStates = 'HTN, DM, COPD, Glaucoma, IHD, Thyroid, Br Asthama, Trauma';

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
            console.log($scope.form);
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
