angular.module('app').component('page5', {
  templateUrl:  './views/page5.html',

  controller:function ($timeout, $q, $http, $log, $scope, $stateParams) {
      $scope.readOnly = $stateParams.obj.readOnly;
        $scope.menstrual_history={
            edd_by_usg1:"", edd_by_usg2:"", edd_by_usg3:"", edd_by_usg4:"",
            radiogroup: [{ heading: 'ANC', value: '', values: [{ value: 'registered', content: 'Registered' }, { value: 'unregistered', content: 'Unregistered' }] }],
            checkbox: [{ heading: 'Tetanus Immunization', values: [{ value: 'false', content: '1' }, { value: 'false', content: '2' }] }],
            input: [{ heading: 'Hematinics', value: '' }],
            // lmp: new Date(), edd: new Date()
        };
        $scope.general_examination = {
            radiogroup: [{ heading: 'Temperature', value: '', values: [{ value: 'feb', content: 'Feb' }, { value: 'afeb', content: 'AFeb' }]}, { heading: 'Pripheral pulses', value: '', values: [{ value: 'palpable', content: 'Palpable' }, { value: 'no', content: 'No' }]}, { heading: 'Dehydration', value: '', values: [{ value: 'yes', content: 'Yes' }, { value: 'no', content: 'No' }] }],
            input: [{ value: '', label: 'Pulse'}, { value: '', label: 'BP'}, { value: '', label: 'RR'}, { value: '', label: 'Built'}, { value: '', label: 'Cyanosis'}, { value: '', label: 'Pallor'}, { value: '', label: 'Clubbing'}, { value: '', label: 'Edema'}, { value: '', label: 'Icterus'}, { value: '', label: 'Lymphadenopathy'}, { value: '', label: 'Others'}, ]
        }

        $scope.personal_history = [{
            heading: 'Apetite',
            value: '',
            values: [{ value: 'up', img: true, content: './img/ic_trending_up_black_24px.svg' }, { value: 'down', img: true, content: './img/ic_trending_down_black_24px.svg' }, { value: 'flat', img: true, content: './img/ic_trending_flat_black_24px.svg' }]
            }, {
            heading: 'Sleep',
            value: '',
            values: [{ value: 'up', img: true, content: './img/ic_trending_up_black_24px.svg'}, { value: 'down', img: true, content: './img/ic_trending_down_black_24px.svg'}, { value: 'flat', img: true, content: './img/ic_trending_flat_black_24px.svg'}]
        }, {
            heading: 'Bowel',
            value: '',
            values: [{ value: 'normal', img: false, content: 'Normal' }, { value: 'abnormal', img: false, content: 'Abnormal' }],

        }, {
            heading: 'Bladder',
            value: '',
            values: [{ value: 'normal', img: false, content: 'Normal' }, { value: 'abnormal', img: false, content: 'Abnormal' }],

        }, {
            heading: 'Tobacco',
            value: '',
            values: [{ value: 'yes', img: false, content: 'Yes' }, { value: 'no', img: false, content: 'No' }],

        }, {
            heading: 'Alcohol',
            value: '',
            values: [{ value: 'yes', img: false, content: 'Yes' }, { value: 'no', img: false, content: 'No' }],

        }];

        var self = this;
        $scope.myDate = new Date();
        // $scope.minDate = new Date(
        //     $scope.myDate.getFullYear() -10,
        //     $scope.myDate.getMonth(),
        //     $scope.myDate.getDate() 
        // );

        // $scope.maxDate = new Date(
        //     $scope.myDate.getFullYear() +10,
        //     $scope.myDate.getMonth()  ,
        //     $scope.myDate.getDate()
        // );
$scope.form={
        description:{ associated_complaints:"", surgical_history:"", family_history:"", investigation:"", provisional_diagnosis:"", treatment:"" },
        systematic_examination:{ 'RS': '', 'CVS': '', 'PA': '', 'CNS': '', 'Per speculum': '', 'Per Rectum': '' },    
        menstrual_history:{ obstetric:{     'G':'',     'P':'',     'L':'',     'D':'',     'A':'' } },
          /*for date */
        myDate : new Date(),     
        complaints : [{com:'', duration: 1}],
        past_medical_history : [{com:'', duration: 1}]
        }
        $scope.add = function(array) {
            array.push({ com: '', duration: '' })
        }
        $scope.add_history = function(array) {
            array.push({ name:'' ``})
        }

        $scope.remove = function(array, ind) {
            array.splice(ind, 1);
        };
        $scope.minDate = new Date(
            $scope.form.myDate.getFullYear() -10,
            $scope.form.myDate.getMonth(),
            $scope.form.myDate.getDate() 
        );

        $scope.maxDate = new Date(
            $scope.form.myDate.getFullYear() +10,
            $scope.form.myDate.getMonth()  ,
            $scope.form.myDate.getDate()
        );

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
         this.myDate = new Date();

  this.minDate = new Date(
    this.myDate.getFullYear(),
    this.myDate.getMonth() - 2,
    this.myDate.getDate()
  );

  this.maxDate = new Date(
    this.myDate.getFullYear(),
    this.myDate.getMonth() + 2,
    this.myDate.getDate()
  );

  this.onlyWeekendsPredicate = function(date) {
    var day = date.getDay();
    return day === 0 || day === 6;
  };
        var success=function(response) {
            if(response.data.success) {
                $log.log(response.data);
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

                $scope.menstrual_history.edd_by_usg1 = response.data.form.menstrual_history.edd_by_usg1
                $scope.menstrual_history.edd_by_usg2 = response.data.form.menstrual_history.edd_by_usg2
                $scope.menstrual_history.edd_by_usg3 = response.data.form.menstrual_history.edd_by_usg3
                $scope.menstrual_history.edd_by_usg4 = response.data.form.menstrual_history.edd_by_usg4
                $scope.menstrual_history.radiogroup[0].value = response.data.form.menstrual_history.ANC
                $scope.menstrual_history.checkbox[0].values[0].value = response.data.form.menstrual_history.Tetanus_Immunization[0]
                $scope.menstrual_history.checkbox[0].values[1].value = response.data.form.menstrual_history.Tetanus_Immunization[1]
                $scope.menstrual_history.input[0].value = response.data.form.menstrual_history.Hematinics
                $scope.menstrual_history.lmp = response.data.form.menstrual_history.lmp
                $scope.menstrual_history.edd = response.data.form.menstrual_history.edd
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
        $scope.form.personal_history = {
            'Apetite':$scope.personal_history[0].value,
            'Sleep':$scope.personal_history[1].value,
            'Bowel':$scope.personal_history[2].value,
            'Bladder':$scope.personal_history[3].value,
            'Tobacco':$scope.personal_history[4].value,
            'Alcohol':$scope.personal_history[5].value,
        }
        $scope.form.general_examination = {
            'Temperature': $scope.general_examination.radiogroup[0].value,
            'Peripheral pulses': $scope.general_examination.radiogroup[1].value,
            'Dehydration': $scope.general_examination.radiogroup[2].value,
            'Pulse': $scope.general_examination.input[0].value,           
            'BP': $scope.general_examination.input[1].value ,
            'RR': $scope.general_examination.input[2].value ,
            'Built': $scope.general_examination.input[3].value ,
            'Cyanosis': $scope.general_examination.input[4].value ,
            'Pallor': $scope.general_examination.input[5].value ,
            'Clubbing': $scope.general_examination.input[6].value ,
            'Edema': $scope.general_examination.input[7].value ,
            'Icterus': $scope.general_examination.input[8].value ,
            'Lymphadenopathy': $scope.general_examination.input[9].value ,
            'Others': $scope.general_examination.input[10].value 
        }
         $scope.form.menstrual_history = {
            lmp: $scope.menstrual_history.lmp,
            edd: $scope.menstrual_history.edd,
            edd_by_usg1:$scope.menstrual_history.edd_by_usg1,
            edd_by_usg2:$scope.menstrual_history.edd_by_usg2,
            edd_by_usg3:$scope.menstrual_history.edd_by_usg3,
            edd_by_usg4:$scope.menstrual_history.edd_by_usg4,
            ANC:  $scope.menstrual_history.radiogroup[0].value,
            Tetanus_Immunization: [$scope.menstrual_history.checkbox[0].values[0].value, $scope.menstrual_history.checkbox[0].values[1].value],
            Hematinics:$scope.menstrual_history.input[0].value
        }
            console.log($scope.form);
            var successCallback=function(response) {
                // $scope.form.activated = true;
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