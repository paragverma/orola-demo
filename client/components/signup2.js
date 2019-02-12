angular.module('app').component('signup2', {
  templateUrl:  './views/signup2.html',
  controller: function($scope,$state,$http, $window, $log, $timeout, Map) {
    $log.log('in signup2 controller');

    var remote = false;
    var no_file = true;//file is there
    var clinic_images_file = false;
    // for maps
    $scope.place = {};
    
    $scope.IsVisible = false;
    $scope.ShowHide = function () {
        //If DIV is visible it will be hidden and vice versa.
        $scope.IsVisible = $scope.IsVisible ? false : true;
    }

    $scope.search = function() {
        console.log('in search');
        $scope.apiError = false;
        Map.search($scope.searchPlace)
        .then(
            function(res) { // success
                Map.addMarker(res);
                $scope.place.name = res.name;
                $scope.data.clinic_address = $scope.searchPlace;
                $scope.place.lat = res.geometry.location.lat();
                $scope.place.lng = res.geometry.location.lng();
            },
            function(status) { // error
                $scope.apiError = true;
                $scope.apiStatus = status;
            }
        );
    }
    
    $scope.send = function() {
        alert($scope.place.name + ' : ' + $scope.place.lat + ', ' + $scope.place.lng);    
    }

    Map.init();

    var redirect = "";
// Post Data
    $scope.postData = function() {
      console.log('in postdata');
      console.log($scope.files);
      console.log($scope.image_files)
      if(!$scope.place.lat || !$scope.place.lng){
          alert("Search your clinic address location in map");
          $scope.search($scope.data.clinic_address);
      }
      $scope.data.latitude=$scope.place.lat;
      $scope.data.longitude=$scope.place.lng;

      if(clinic_images_file){
        clinic_images = new FormData();
        angular.forEach($scope.image_files,function(obj){
            if(!obj.isRemote){
              clinic_remote = false;
                clinic_images.append('files[]', obj.lfFile);
            }
            else{
              clinic_remote = true;
            }
        });
        if(!clinic_remote){
          $http.post('/secure/upload/clinic_images', clinic_images, {
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined}
          }).then(function(result){
              $scope.data.clinic_images_url = result.data.url;
              console.log($scope.data.clinic_images_url)
              // $http.post('/secure/save_urls', {urls: $scope.data.clinic_images_url, which_url: "clinic_images_url"}).then(function(response){
              //   if(response.data.success){
              //     console.log("url saved successfully");
              //   }
              // }, function(err){
              //   alert(err);
              // });
              // do sometingh                    
          },function(err){
            alert(err);
              // do sometingh 
          });
        }
      }

      var successCallback=function(response) {
		
		console.log(response);
		redirect = response.data.redirect;
		if(response.data.redirect == "login"){
			alert("Not logged in");
			console.log("redirect hai");
		}
		
        
		if(response.data.success){
			$state.go(redirect);
		}
		else{
			alert("An error occurred(key=success, val=false");
		}
        
      };

      var errorCallback = function(response) {
        alert( "failure message: " + JSON.stringify(response));
        $scope.loginStatus.error=true;
      };

      var formData = new FormData();
      angular.forEach($scope.files,function(obj){
          if(!obj.isRemote){
            remote = false;
              formData.append('files[]', obj.lfFile);
          }
          else{
            remote = true;
          }
      });
      

// Upload image files
      if(!remote){
        console.log("the image file is not remote so we upload it")
          $http.post('/secure/upload', formData, {
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined}
          }).then(function(result){
              console.log("in upload the image url saved in db is");
              console.log(result.data.url);
              $scope.data.image_url = result.data.url;
              $http.post('/secure/doctor/signup_complete', $scope.data).then(successCallback, errorCallback);
              // do sometingh                    
          },function(err){
            alert(err);
              // do sometingh 
          });      
        }
        else if(remote || no_file){
          if(no_file){
            console.log("there is no file so set the image_url = ''");
            $scope.data.image_url = "";
          }
          console.log("remote file so singup_complete requested");          
          $http.post('/secure/doctor/signup_complete', $scope.data).then(successCallback, errorCallback);
        }
      }
      


    $scope.data={
      image_url:"", home_address:"", clinic_address:"", latitude:"", longitude:"", speciality:"", appointment_duration:"", age: 24, fees:"", experience: 1,
      working_hours:[{ start_time:"", end_time:""}],
      qualifications:[{ degree:"MBBS", college:"", year:"" }, { degree:"PG", college:"", year:"" }],
      working_days:[{label:"Sun",value:"false"}, {label:"Mon",value:"false"},{label:"Tue",value:"false"},{label:"Wed",value:"false"},{label:"Thu",value:"false"},{label:"Fri",value:"false"},{label:"Sat",value:"false"}],
    }
    
    $scope.durations=[ '5 minutes', '10 minutes', '15 minutes', '30 minutes', '45 minutes', '60 minutes', '120 minutes'];

    /*for qualifications*/
    $scope.add = function(array) {
        array.push({ "degree": "", "college": "", "year": "" });
    }
    $scope.remove = function(array, ind) {
        array.splice(ind, 1);
    };

    $scope.minDate = new Date();
    $scope.minDate = $scope.minDate.setFullYear($scope.minDate.getFullYear()-90);

    $scope.maxDate = new Date();
    $scope.maxDate = $scope.maxDate.setFullYear($scope.maxDate.getFullYear()-20);


    $scope.timings = [ '06:00 AM', '06:15 AM', '06:30 AM', '06:45 AM', '07:00 AM', '07:15 AM', '07:30 AM', '07:45 AM', '08:00 AM', '08:15 AM', '08:30 AM', '08:45 AM', '09:00 AM', '09:15 AM', '09:30 AM', '09:45 AM', '10:00 AM', '10:15 AM', '10:30 AM', '10:45 AM', '11:00 AM', '11:15 AM', '11:30 AM', '11:45 AM', '12:00 PM', '12:15 PM', '12:30 PM', '12:45 PM', '01:00 PM', '01:15 PM', '01:30 PM', '01:45 PM', '02:00 PM', '02:15 PM', '02:30 PM', '02:45 PM', '03:00 PM', '03:15 PM', '03:30 PM', '03:45 PM', '04:00 PM', '04:15 PM', '04:30 PM', '04:45 PM', '05:00 PM', '05:15 PM', '05:30 PM', '05:45 PM', '06:00 PM', '06:15 PM', '06:30 PM', '06:45 PM', '07:00 PM', '07:15 PM', '07:30 PM', '07:45 PM', '08:00 PM', '08:15 PM', '08:30 PM', '08:45 PM', '09:00 PM', '09:15 PM', '09:30 PM', '09:45 PM', '10:00 PM', '10:15 PM', '10:30 PM', '10:45 PM', '11:00 PM'];
    $scope.specialities = [ 'Radiologist', 'Gynaecologist', 'Dermatologist', 'Psychiatrist', 'Orthopediatrist', 'Medicine', 'Biochemical Lab', 'Pathology Lab', 'Microbiology', 'ENT', 'Surgery', 'General Physician'];

    $scope.index = 0;
    $scope.getId = function getId(index){
      $scope.index=index;
      $scope.end_time="";
    }
    $scope.setId = function setId(){
      return $scope.index;
    }
    $scope.print = function(data){
      console.log(data);
    }


    var get_profile_success=function(response) {
      $log.log('in success of get profile');
      if(response.data.success) {
          profile = response.data.profile;
          console.log(profile);
          $scope.searchPlace = profile.clinic_address;
          $scope.search();
          $scope.data.home_address = profile.home_address;
          $scope.data.clinic_address = profile.clinic_address;
          $scope.data.appointment_duration = profile.appointment_duration + " minutes";
          $scope.data.qualifications = profile.qualification;
          $scope.data.speciality = profile.speciality;
          $scope.data.experience = profile.experience;
          $scope.data.image_url = profile.image_url;
          $scope.data.clinic_images_url = profile.clinic_images_url;
          if($scope.data.speciality != ""){
            $scope.data.activate = true;
          }
          else{
            $scope.data.activate = false;
          }
        $timeout(
          function(){
          console.log(profile.image_url);
            if($scope.data.image_url != "") {
              console.log("remote file from get_profile");
              remote = true;
              no_file = false;
              $scope.addRemoteFilesApi.addRemoteFile("/"+ $scope.data.image_url,'image.jpg','image');
            }
            else {
              no_file = true;
              console.log("image_url is '' from get_profile so there is no file so no remote");
              remote = false;
            }
            if(profile.clinic_images_url != [] && profile.clinic_images_url != null){
              clinic_remote = true;
              clinic_images = true;
              for(i = 0; i< profile.clinic_images_url.length; i++){
                $scope.addRemoteFilesApiClinic.addRemoteFile("/"+ $scope.data.clinic_images_url[i],'image.jpg','image');
              }


            }      
          }
        )
        console.log('after timeout');
        console.log($scope.image_files);
        console.log('printed image_ifles')
        clinic_images = new FormData();
        angular.forEach($scope.image_files,function(obj){
            if(!obj.isRemote){
              clinic_remote = false;
                clinic_images.append('files[]', obj.lfFile);
            }
            else{
              clinic_remote = true;
            }
        });
        console.log(clinic_images);
        console.log('printed clinic_images formdata')
        var length = profile.working_days.length;
        console.log(profile.working_days);
        for (var i = 0; i < length; i++) {
          $scope.data.working_days[profile.working_days[i]].value = true;
      }
      
      var length = profile.working_hours.length;

      // time format
      var get_time = function(time){
        if(time.split(':')[0] > 12){       
          if((time.split(':')[0] - 12) >=10){
            time = time.replace(time.split(':')[0], (time.split(':')[0] - 12));
          }
          else{
            time = time.replace(time.split(':')[0], '0' + (time.split(':')[0] - 12));
          }
          time += ' PM';
          console.log(time);
        }
        else if(time.split(':')[0] == 12){
          time += ' PM'
        }
        else{
          time += ' AM';
        }
        return time;
      }
      for (var i = 0; i < length; i += 2) {
        $scope.data.working_hours[i / 2].start_time = get_time(profile.working_hours[i]);
        $scope.data.working_hours[i / 2].end_time = get_time(profile.working_hours[i + 1]);
      }
      $scope.data.fees = profile.fees;
      $scope.data.age = profile.age;
    }
    else {$log.log(response.data.message);}
    };
    var get_profile_error = function(response) {
        alert( "failure message: " + JSON.stringify(response));
    };

    // get profile request
    $http.post('/secure/doctor/get_profile', $scope.user).then(get_profile_success, get_profile_error);
    
    $scope.$watch('files.length',function(newVal,oldVal){
        console.log("in watch");
        console.log($scope.files);
        if($scope.files && !$scope.files[0]){// scope.files should not be undefined and should be empty i.e. $scope.files == []
          console.log('no file');
          no_file = true;
        }
        else{
          no_file = false;
        }
      });
    $scope.$watch('image_files.length',function(newVal,oldVal){
        console.log("in watch");
        console.log($scope.image_files);
        if($scope.image_files && !$scope.image_files[0]){// scope.files should not be undefined and should be empty i.e. $scope.files == []
          console.log('no clinic images');
          clinic_images_file = false;
        }
        else{
          clinic_images_file = true;
        }
      });

    $scope.optoin08 = {
        "browseIconCls":"myBrowse",
        "removeIconCls":"myRemove",
        "captionIconCls":"myCaption",
        "submitIconCls":"mySubmit",
        "unknowIconCls":"myUnknow"
    };
    $scope.onFileClick = function(obj,idx){
        console.log(obj);
    };

    $scope.onSubmitClick = function(files) {
        console.log(files);
    }
    $scope.onSubmitFilesChange = function() {
        console.log($scope.submitButtonFiles);
    }

    $scope.onFileRemove = function(obj,idx){
        console.log(obj);
    };      
  }
})
