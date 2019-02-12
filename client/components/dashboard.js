angular.module('app')
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default').primaryPalette('indigo');
})

.component('dashboard', {
  templateUrl:  './views/dashboard.html',

  controller: function($scope,$state,$http, $log, $mdSidenav, $mdToast, $window) {
    console.log('in dashboard controller')
    $scope.image = "img/med-team-3.jpg";
    if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
  }
    $scope.now = Date.now() / 1000 | 0;
    $scope.redirect = function(clicked_appointment) {
      console.log('appointment is :'+ clicked_appointment)
console.log($scope.doctor_forms[$scope.doctor_type]);
console.log($scope.doctor_type);
var object = {};
object.apt = clicked_appointment;
object.readOnly = false;
      $state.go($scope.doctor_forms[profile.speciality], {obj:object});

    }


    $scope.redirect2 = function(clicked_appointment, speciality) {
      console.log(clicked_appointment)
console.log($scope.doctor_forms[speciality]);
console.log($scope.doctor_type);
var object = {};
object.apt = clicked_appointment;
object.readOnly = true;
      $state.go($scope.doctor_forms[speciality], {obj:object});

    }

    $scope.redirectToRecord = function (record) {
        $window.open(record, '_blank');
    };
    var profile = {};
    var successCallback=function(response) {
			console.log(response);
            if(response.data.success) {
              profile = response.data.profile;
              console.log(profile);
              $scope.data.user.name = profile.name;
              $scope.data.user.email = profile.email;
              $scope.attributes.appointments = profile.appointments;
              if(profile.image_url != ""){
                $scope.image = profile.image_url;
                console.log("already saved-image url copied to scope variable");
              }
                  
              $scope.doctor_type = profile.speciality;                            
            }
            else {
              $log.log('Success is set to false');
			  if(response.data.redirect == "login"){
					alert("Please Log In");
					console.log("redirect hai");
			  }
				
				
			  if(response.data.redirect){
					$state.go(response.data.redirect);
			  }
            }
          };
       var errorCallback = function(response) {
            alert( "failure message: " + JSON.stringify(response));
            $state.go('logout');
          };

    $http.post('/secure/doctor/get_profile', $scope.user).then(successCallback, errorCallback);
    $scope.doctor_forms = {
        'Radiologist' : 'page9',
        'Gynaecologist' : 'page5',
        'Dermatologist' : 'page2',// change
        'Psychiatrist' : 'page2',// change
        'Orthopediatrist' : 'page2',// changed from 3 to 2
        'Medicine' : 'page2',// changed from 4 to 2
        // 'X-ray Lab' : 'page6',// change //removed
        'Biochemical Lab' : 'page8',
        'Pathology Lab' : 'page10',
        'Microbiology' :'page9',//added
        'ENT': 'page2',//added
        'Surgery': 'page2',//added
        'General Physician': 'page2'//added

    };
    
  $scope.toggleSidenav = function(menu) {
    $mdSidenav(menu).toggle();
  }
  $scope.view = 'appointments';
      $scope.show_medical_history = false;  
  $scope.toast = function(message) {
    if(message == 'Appointments'){
      $scope.view = 'appointments';
      $scope.show_medical_history = false;
    }
    if(message == 'Previous Appointments') {
      $scope.view = 'previous_app';
      $scope.show_medical_history = false;      
    }
    if(message == 'Edit Profile'){
      $state.go('signup2');
    }
    var toast = $mdToast.simple().content('You clicked ' + message).position('bottom right');
    $mdToast.show(toast);
  };
  $scope.toastList = function(message) {
    var toast = $mdToast.simple().content('You clicked ' + message + ' having selected ' + $scope.selected.length + ' item(s)').position('bottom right');
    $mdToast.show(toast);
  };
  $scope.selected = [];
  $scope.toggle = function(item, list) {
    var idx = list.indexOf(item);
    if (idx > -1) list.splice(idx, 1);
    else list.push(item);
  };
  $scope.data = {
    title: 'Dashboard',
    user: {
      name: 'Doctor name',
      email: 'doctor@gmail.com',
      icon: 'face'
    },
    // toolbar: {
    //   buttons: [{
    //     name: 'Button 1',
    //     icon: 'add',
    //     link: 'Button 1'
    //   }],
    //   menus: [{
    //     name: 'Menu 1',
    //     icon: 'message',
    //     width: '4',
    //     actions: [{
    //       name: 'My Appointments',
    //       message: 'My Appointments',
    //       completed: true,
    //       error: true
    //     },
    //     {
    //       name: 'Previous Appointments',
    //       message: 'Previous Appointments',
    //       completed: true,
    //       error: true
    //     }, {
    //       name: 'Edit Profile(signup2)',
    //       message: 'Edit Profile',
    //       completed: false,
    //       error: false
    //     }, {
    //       name: 'Action 3',
    //       message: 'Action 3',
    //       completed: true,
    //       error: true
    //     }]
    //   }]
    // },
    sidenav: {
      sections: [{
        name: 'Section 1',
        expand: true,
        actions: [{
          name: 'Appointments',
          icon: 'assignment',
          link: 'Appointments'
        }, 
        // {
        //   name: 'Previous Appointments',
        //   // icon: 'settings',
        //   link: 'Previous Appointments'
        // },
        {
          name: 'Edit Profile',
          icon: 'settings',
          link: 'Edit Profile'
        }
        ]
      // }, 
      // {
      //   name: 'Section 2',
      //   expand: true,
      //   actions: [{
      //     name: 'Edit Profile',
      //     icon: 'settings',
      //     link: 'Edit Profile'
      //   }]
      // }, {
      //   name: 'Section 3',
      //   expand: false,
      //   actions: [{
      //     name: 'Action 4',
      //     icon: 'settings',
      //     link: 'Action 4'
      //   }, {
      //     name: 'Action 5',
      //     icon: 'settings',
      //     link: 'Action 5'
      //   }, {
      //     name: 'Action 6',
      //     icon: 'settings',
      //     link: 'Action 6'
      //   }]
      }]
    },
    content: {
      lists: [{
        name: 'List 1',
        menu: {
          name: 'Menu 1',
          icon: 'settings',
          width: '4',
          actions: [{
            name: 'Action 1',
            message: 'Action 1',
            completed: true,
            error: true
          }]
        },
        items: [{
          name: 'Item 1',
          description: 'Description 1',
          link: 'Item 1'
        }, {
          name: 'Item 2',
          description: 'Description 2',
          link: 'Item 2'
        }, {
          name: 'Item 3',
          description: 'Description 3',
          link: 'Item 3'
        }]
      }]
    }
  }

  $scope.attributes = {

    appointments:[{
        // title: 'Appointment scheduled',
        patient_name: '',
        time:  '12:30 pm',
        patient_id: ''
        // icon: 'assignment'
      }]
  };
  $scope.prev_appointments = [];
  $scope.send ={};
  
  $scope.postData = function(search) {
    $scope.send.searchText = search;
    $scope.send.user = $scope.user;
    $scope.view = 'previous_app';
    $scope.show_medical_history = false;    
  var success = function(response) {
            if(response.data.success) {
              $scope.prev_appointments = response.data.appointments;
              console.log(response.data.appointments);                          
            }
            else {
              $log.log('Unauthorized access');
            }
          };
       var error = function(response) {
            alert( "failure message: " + JSON.stringify(response));
          };
  $http.post('/secure/doctor/get_appointment', $scope.send).then(success, error);

  $scope.today = new Date();

}


////////////////////////////////////////////
    $scope.get_medical_history = function(patient_id){
      console.log('in medical history');
      console.log(patient_id);
      $scope.show_medical_history = true;

      var success_records = function(response) {
          if(response.data.success) {
            $scope.records_url = response.data.records_url;
            console.log(response.data.records_url);
          }
          else {
            $log.log('Unauthorized access');
          }
      };
      var error_records = function(response) {
          alert( "failure message: " + JSON.stringify(response));
      };
      $http.post('/secure/doctor/get_records', {patient_id:patient_id}).then(success_records, error_records);


      var success_medical_history = function(response) {
          if(response.data.success) {
            $scope.medical_history = response.data.medical_history;
            console.log(response.data.medical_history);                          
          }
          else {
            $log.log('Unauthorized access');
          }
      };
      var error_medical_history = function(response) {
          alert( "failure message: " + JSON.stringify(response));
      };

      $http.post('/secure/doctor/get_medical_history', {patient_id:patient_id}).then(success_medical_history, error_medical_history);

      
    }
  }
});
