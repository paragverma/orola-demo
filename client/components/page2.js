angular.module('app').component('page2', {
  templateUrl:  './views/page2.html',
  
  controller: function ($timeout, $q, $log, $scope, $http, $stateParams) {
      $scope.readOnly = $stateParams.obj.readOnly;
    $log.log('in page2 controller');
        var self = this;
                $scope.personal_history = [{
            heading: 'Apetite',
            value: '',
            values: [{
                value: 'up',
                img: true,
                content: './img/ic_trending_up_black_24px.svg'
            }, {
                value: 'down',
                img: true,
                content: './img/ic_trending_down_black_24px.svg'
            }, {
                value: 'flat',
                img: true,
                content: './img/ic_trending_flat_black_24px.svg'
            }]

        }, {
            heading: 'Sleep',
            value: '',
            values: [{
                value: 'up',
                img: true,
                content: './img/ic_trending_up_black_24px.svg'
            }, {
                value: 'down',
                img: true,
                content: './img/ic_trending_down_black_24px.svg'
            }, {
                value: 'flat',
                img: true,
                content: './img/ic_trending_flat_black_24px.svg'
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
                label: 'Cyanosis'
            }, {
                value: '',
                label: 'Pallor'
            }, {
                value: '',
                label: 'Clubbing'
            }, {
                value: '',
                label: 'Edema'
            }, {
                value: '',
                label: 'Icterus'
            }, {
                value: '',
                label: 'Lymphadenopathy'
            }, {
                value: '',
                label: 'Others'
            }, ]
        }
        
        $scope.cvs = {
            radiogroup: [{
                heading: 'Murmur',
                value: '',
                values: [{
                    value: 'present',
                    content: 'present'
                }, {
                    value: 'absent',
                    content: 'absent'
                }]
            }],
            checkbox: [{
                heading: 'Heart sounds',
                values: [{
                    value: 'false',
                    content: 's1'
                }, {
                    value: 'false',
                    content: 's2'
                }]
            }],
            input: [{
                heading: 'Added sounds',
                value: ''
            },
            {
                heading: 'Other',
                value: ''
            }]
        };
        $scope.add = function(array) {
            array.push({
                sym: '',
                duration: ''
            })
        }

        $scope.remove = function(array, ind) {
            array.splice(ind, 1);
        };

    $scope.form={
        description:{
            previous_treatment:"",
            family_history:"",
            local_examintaion:"",
            investigation:"",
            provisional_diagnosis:""
        },

        cns:{
            "Higher functions": '',
            "Speech": '',
            "Motor system": '',
            "Sensorium": '',
            "Meningeal signs": '',
            "Cranial nerves": '',
            "Sensory system": '',
            "Cerebellar signs": '',
            "Signs of raised IST": '',
            "Gait": '',
            "Reflexes": ''
        },        
        rs:{
            'Breath sound':['',''],//[0]: right, [1]:left
            'Vocal resonance':['', ''],
            'Crepitation':['', ''],
            'Rhonchi':['', '']
        },
        abdomen:{
            "Liver": '',
            "Spleen": '',
            "Kidney": '',
            "Lump": '',
            "Distension": '',
            "Others": '',               
            "Guarding": '',
            "Rigidity": '',
            "Tenderness": '',
            "Genitals": '',
            "Hemial sites": '',
            "PR": '',
            "Bowel sounds": '',
            "Ascites": '',
            "Abdomenal girth": ''          
        },
        symptoms:[{sym:'', duration: 1}],
        patient_history:[{sym:'', duration: 1}]
    }// --!/forms
        

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
                    $scope.form = response.data.form;
                    $scope.personal_history[0].value=response.data.form.personal_history.Apetite
                    $scope.personal_history[1].value=response.data.form.personal_history.Sleep
                    $scope.personal_history[2].value=response.data.form.personal_history.Bowel
                    $scope.personal_history[3].value=response.data.form.personal_history.Bladder
                    $scope.personal_history[4].value=response.data.form.personal_history.Tobacco
                    $scope.personal_history[5].value=response.data.form.personal_history.Alcohol

                    $scope.general_examination.radiogroup[0].value = response.data.form.general_examination.Temperature
                    $scope.general_examination.radiogroup[1].value = response.data.form.general_examination.Peripheral_pulses         
                    $scope.general_examination.radiogroup[2].value = response.data.form.general_examination.Dehydration          
                    $scope.general_examination.input[0].value = response.data.form.general_examination.Pulse
                    $scope.general_examination.input[1].value = response.data.form.general_examination.BP
                    $scope.general_examination.input[2].value = response.data.form.general_examination.RR
                    $scope.general_examination.input[3].value = response.data.form.general_examination.Built
                    $scope.general_examination.input[4].value = response.data.form.general_examination.Cyanosis
                    $scope.general_examination.input[5].value = response.data.form.general_examination.Pallor
                    $scope.general_examination.input[6].value = response.data.form.general_examination.Clubbing
                    $scope.general_examination.input[7].value = response.data.form.general_examination.Edema
                    $scope.general_examination.input[8].value = response.data.form.general_examination.Icterus
                    $scope.general_examination.input[9].value = response.data.form.general_examination.Lymphadenopathy
                    $scope.general_examination.input[10].value = response.data.form.general_examination.Others

                    $scope.cvs.radiogroup[0].value = response.data.form.cvs.Murmur
                    $scope.cvs.checkbox[0].values[0].value = response.data.form.cvs.Heart_sounds[0]
                    $scope.cvs.checkbox[0].values[1].value = response.data.form.cvs.Heart_sounds[1]
                    $scope.cvs.input[0].value = response.data.form.cvs.Added_sounds
                    $scope.cvs.input[1].value = response.data.form.cvs.Other
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
        $scope.form.personal_history={
            Apetite:$scope.personal_history[0].value,
            Sleep:$scope.personal_history[1].value,
            Bowel:$scope.personal_history[2].value,
            Bladder:$scope.personal_history[3].value,
            Tobacco:$scope.personal_history[4].value,
            Alcohol:$scope.personal_history[5].value,
        }
        $scope.form.general_examination={
            Temperature: $scope.general_examination.radiogroup[0].value,
            Peripheral_pulses: $scope.general_examination.radiogroup[1].value,
            Dehydration: $scope.general_examination.radiogroup[2].value,
            Pulse: $scope.general_examination.input[0].value,           
            BP: $scope.general_examination.input[1].value ,
            RR: $scope.general_examination.input[2].value ,
            Built: $scope.general_examination.input[3].value ,
            Cyanosis: $scope.general_examination.input[4].value ,
            Pallor: $scope.general_examination.input[5].value ,
            Clubbing: $scope.general_examination.input[6].value ,
            Edema: $scope.general_examination.input[7].value ,
            Icterus: $scope.general_examination.input[8].value ,
            Lymphadenopathy: $scope.general_examination.input[9].value ,
            Others: $scope.general_examination.input[10].value 
        }
        $scope.form.cvs={
            Murmur: $scope.cvs.radiogroup[0].value,
            Heart_sounds: [$scope.cvs.checkbox[0].values[0].value, $scope.cvs.checkbox[0].values[1].value],// [s1, s2]
            Added_sounds: $scope.cvs.input[0].value,
            Other: $scope.cvs.input[1].value,
        }
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
