const GoogleAuth = require('google-auth-library');
const accountUtil = require('../controller/accountUtil')
const crypto = require('crypto');
const auth = new GoogleAuth;
const Doctor = require('../models/Doctors')
const User = require('../models/Users')
const jwt = require('jsonwebtoken');
const cred = require('../config/cred.js')
const moment = require('moment')
/*var token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjQyMTcxMDE1MzMwZjEwN2FhN2QxYjg1NGJmY2Y1NGE0ZjVhNTA3MDUifQ.eyJhenAiOiIxMzQ0NzgyMDU1ODAtMDkyamJxbm8w'+
'djc1czljNmtna2loZDBmYnFybWlqN2cuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxMzQ0NzgyMDU1ODAtZTJoMzB0cjJnc2Q4Z25ncDZvYmJsMGMwcGJmMm42Zjk'+
'uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDU5NjE4NjYxMDM3NjUwMDM3MzciLCJlbWFpbCI6ImFtZXlhYXB0ZTFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZW'+
'QiOnRydWUsImlzcyI6Imh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbSIsImlhdCI6MTQ5NTE2NTg1NiwiZXhwIjoxNDk1MTY5NDU2LCJuYW1lIjoiQW1leWEgQXB0ZSIsInBpY3R1cm'+
'UiOiJodHRwczovL2xoNS5nb29nbGV1c2VyY29udGVudC5jb20vLWdMVTI0TFd4UWVzL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FIYWxHaG9mdXFpVFpXV3Z6RG1aWE9kcG9aWVI1Q'+
'2F0cUEvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IkFtZXlhIiwiZmFtaWx5X25hbWUiOiJBcHRlIiwibG9jYWxlIjoiZW4ifQ.j2Hyhqvkdhr_xtzmrsldA5djCez5iq25a'+
'SXUnqx6mx7hzZlK_BABnSQNShxMEX-MaX4ormmimmPvcxVZjNUpWFGh53_yiZpnQEecpyZT10MxKxcdPSWKtjde7RTps7UNh08-M-HLJyBA9pJlDJo_pGHEPGffP4bQAViejVvxGMuX'+
'BRe94KV0S3GkKw6Fui-zpFvGzlQSqs2ti5tcoCC1Kiqrx9LVxOH0oHq1EHeFkiZEvuDpZNTBpRcf0G1rpg1x63kt7sDB4dZsYcWa40FzxkXGOzdij57Ooozezk9OaPN3nthsK2OIPCnnjhsarTpboSHWnMX3DzhIKSXyDIIP2Q';
*/
const CLIENT_ID = '134478205580-e2h30tr2gsd8gngp6obbl0c0pbf2n6f9.apps.googleusercontent.com';
const client = new auth.OAuth2(CLIENT_ID, '', '');
module.exports = function(app){

app.post('/user/login', function(req, res){
      if(req.body.type == "google"){
      client.verifyIdToken(
          req.body.token,
          CLIENT_ID,
          function(e, login) {
            var payload = login.getPayload();
            var userid = payload['sub'];
            var email = payload['email'];
            var name = payload['name'];

            User.findOne({
                email: email
            }, function(err, user) {

                if (err) {
                    console.log('problem in db');
                    return res.json({
                        success: false,
                        extras: {
                            msg: accountUtil.DB_ERROR
                        }
                    }).end();
                }
                if (user) {
		    var profile = {
                    id: user._id,
                    email: email,
                    name: name,
                };
                // console.log('here is your profile ' +profile)
                // We are sending the profile inside the token
                var token = jwt.sign(profile, cred.jwtSecret);
                res.json({
                  success:true,
                  api_key: token
                });
		console.log(token)

                } else {
              var user = new User({
              'name':name,
              'email':email,
              'provider_id':userid,
            });

            user.save(function (err, result) {
              if(err) {
                res.json({
                  success:false,
                  api_key: null
                });
              }
              else {
                var profile = {
                    id: result._id,
                    email: email,
                    name: name,
                };
                // console.log('here is your profile ' +profile)
                // We are sending the profile inside the token
                var token = jwt.sign(profile, cred.jwtSecret);
                res.json({
                  success:true,
                  api_key: token
                });
              }
	    });
	}
            });
          });
        }
    });

    app.post('/secure/get_records', function(req, res) {
        if(!req.user) {
            res.json({success: false,message: "Unauthorized"}).end();
            return;
        }
        User.findById(req.user.id,'records').lean().exec(function(error, user) {
            if(error){
                console.log("DB error");
                console.log(error);
                return res.json({
                    success: false,
                    extras: {
                        msg: accountUtil.DB_ERROR
                    }
                }).end();
            }
            return res.json({
            success : true,
            records_url: user.records
            });
        });
    });

    app.post('/secure/user/book_appointment', function(req, res){
	    if(!req.user){
	    	res.json({success: false,message:"Unauthorized"});;
		return;
	    }
	    if(req.body.time < moment().unix()) {
            res.json({
              success:false
            }).end();
        }
      Doctor.findByIdAndUpdate(
        req.body.doctor_id,
        {$addToSet: {"appointments": {patient_name: req.body.name, patient_id: req.user.id, time: req.body.time}}},
        {safe: true},
        function(err, model) {
          if(err){
            console.log(err);
            res.json({
              success:false
            }).end();
          }
          else{
            res.json({
              success:true
            }).end();
          }
        }
    );

    });

	app.post('/secure/user/get_user_profile_by_email',function(req,res){
		if(req.body.email){
			User.findOne({email: req.body.email,activated:true},'name mobile sex blood_group weight dob email martial_status emergency_contact').lean().exec(function (err, doctors){
		
			return res.json(doctors);
		});
	}
  });
	app.post('/user/save_my_profile', function(req, res) {
		console.log('in save my profile users');
	      /*  var review = {};
		review.username = req.body.patient_name;
		review.stars = req.body.stars;
		review.time =  Date.now();*/
		// var blood_group=req.body.blood_group;
		// var weight = req.body.weight;
		// var sex =  req.body.sex ;
		// var mobile = req.body.mobile;
		// var martial_status = req.body.martial_status;
		User.findOneAndUpdate(
            {email:req.body.email},
		    {
		     blood_group: req.body.blood_group,
             weight : req.body.weight,
             sex: req.body.sex ,
             mobile :req.body.mobile,
             martial_status:req.body.martial_status,
             dob: req.body.dob,
             emergency_contact: req.body.emer_contact,
             activated: true
		    },
		    function(err, doc){
		    if(err){
		        console.log("Something wrong when updating data!");
		         console.log(err)
		        return res.json({
		            success: false,
		            extras: {
		                msg: accountUtil.DB_ERROR
		            }
		        }).end();
		    }
		    console.log("Profile  updated successfully");
		    return res.json({
		        success: true,
		    }).end();
		});
		});
	

    app.post('/secure/user/get_doctors', function(req, res){
	    if(!req.user){
	    	res.json({success: false,message:"Unauthorized"});
		return;
	    }
      if(req.body.email) {
      console.log(req.body.name);
      Doctor.findOne({'email':req.body.email, activated:true},'_id name home_address clinic_address email age sex mobile speciality experience working_hours working_days fees reviews votes total_ratings total_stars location appointment_duration appointments.time image_url clinic_images_url').lean().exec(function (err, doctors) {
       var temp=[];
        var now = moment().unix();
        for(i=0;i<doctors.appointments.length;i++){
                if(doctors.appointments[i].time > now){
                        temp.push(doctors.appointments[i])
                }
        }
        doctors.appointments = temp;
        console.log(doctors);

      return res.json(doctors);
        });
      }

      if(req.body.name) {
      console.log(req.body.name);
      Doctor.find({'name':new RegExp(req.body.name, "i"), activated:true},'_id name email speciality').lean().exec(function (err, doctors) {
      return res.json(doctors);
        });
      }

      if(req.body.speciality) {
      console.log(req.body.speciality);
      Doctor.find({'speciality':new RegExp(req.body.speciality, "i"), activated:true},'_id name email age experience fees image_url').lean().exec(function (err, doctors) {
      return res.json(doctors);
        });
      }
  });

   
    app.post('/secure/user/get_apt_byemail', function(req, res){
    // console.log(req.query.email);
    console.log(req.body);
    if(req.body.email) {
      temp = [];
      User.findOne({ email: req.body.email }, '_id' , function(err, user){
        if(err){
          console.log(err);
          return res.json({success : false});
        }
        pat_id = "";
        if(user){
          // console.log(user);
          pat_id = user._id;
        }
      
          Doctor.find({"appointments.patient_id": pat_id }, function (err, doctors) {
            if(err){
              console.log(err);
              return res.json({success : false});
            }
            // console.log(doctors.length);
            for(i = 0; i < doctors.length; i++){
              // console.log(doctors[i].appointments.length);
              for(j = 0; j < doctors[i].appointments.length; j++){

                  if(doctors[i].appointments[j].patient_id == pat_id ){
                    var apt = {};
                    apt.doctor = doctors[i].name;
                    apt.doctor_id = doctors[i]._id;
                    apt.speciality = doctors[i].speciality;
                    apt.time = doctors[i].appointments[j].time;
                    apt.apt_id = doctors[i].appointments[j]._id;
                    apt.apt_review = doctors[i].appointments[j].review;
                    // doctors[i].appointments[j].doctor = [];
                    // doctors[i].appointments[j].doctor.push(doctors[i].name);
                    // console.log(doctors[i].name);
                    // console.log(typeof(doctors[i].appointments[j]));
                    // console.log(typeof(doctors[i].appointments[j].form));
                    
                    // doctors[i].appointments[j].form = null;
                    // temp.push(doctors[i].appointments[j]);
                    temp.push(apt);
                     // console.log(doctors[i].appointments[j]);
                  }
                }
              }
            console.log(doctors.length);
            return res.json({success: true, appointments : temp});
        });
      });

    }
    else{
      return res.json({success : false});
    }
  });

  app.post('/secure/user/get_apt_byid', function(req, res){
    if(req.body.id){
      Doctor.findOne({"appointments._id": req.body.id}, 'appointments', function(err, doctor){
        if(err){
          console.log(err);
          return res.json({success : false});
        }
         // console.log(doctor);
        for(i = 0; i < doctor.appointments.length; i++){
          // console.log(doctor.appointments[i]._id);
          if(doctor.appointments[i]._id.equals(req.body.id)){
            return res.json({ success : true, 
                              form : doctor.appointments[i].form
                            });
          }
        }    

      });
    } 
    else{
      return res.json({success : false});  
    } 
  });

      app.post('/user/login2', function(req, res) {
          console.log('in login2');
        var email = req.body.email;
        var password = req.body.password;
        console.log('after setting email password in login2');
        User.findOne({
            email: email,
        }, function(err, user) {
            if (err) {
                console.log('db_error in user login2');
                return res.json({
                    success: false,
                    extras: {
                        msg: accountUtil.DB_ERROR
                    }
                    // redirect:'/user/login'
                });
                res.end()

            }
            console.log('its not a db_error in login2');
            if (user) {
                console.log('account_exists in login2');
                accountUtil.checkPassword(password, user.passwordSalt, function(err, passwordHash) {
                    if(err){
                        console.log('error in checkpassword in login2');
                        return res.json({
                            success: false,
                            extras: {
                                msg: 'error in checkpassword'
                            }

                        }).end();
                    }
                    console.log('no error in checkpassword in login2');
                    if (passwordHash == user.passwordHash) {
                        console.log('passwordHash == user.passwrordHash if')
                        var profile = {
                            id: user._id,
                            email: user.email,
                            name: user.name,
                        };
                        console.log('profile created');
// console.log('here is your profile ' +profile)
                        // We are sending the profile inside the token
                        var token = jwt.sign(profile, cred.jwtSecret);
                        console.log('token created in login2');
// console.log('password matched');
                        // res.cookie("jtoken",token,{httpOnly:true});
                        // console.log('cookie set in login2');
                        res.json({
                            success: true,
                            extras: {
                                msg: "logged in"
                            },
                            api_key: token
                        }).end();

                    } else {
// console.log('password not matched');
                        return res.json({
                            success: false,
                            extras: {
                                msg: accountUtil.INVALID_PWD
                            }

                        }).end();
                        // res.redirect('/user/login');
                    }
                });
            } else {
                //console.log('account_not_found');
                return res.json({
                    success: false,
                    extras: {
                        msg: accountUtil.EMAIL_NOT_FOUND
                    }
                });
                // res.redirect('/user/login');
                res.end()

            }
        });
    });

    app.post('/user/signup', function(req, res) {
        console.log('in user signup');
        console.log(req.body);
        var email = req.body.email;
        var password = req.body.password;
        var sex = req.body.sex; //M/F
        var mobile = req.body.mobile;
        var name = req.body.firstname + " " + req.body.lastname;

        var passwordSalt = crypto.randomBytes(128).toString('base64');
        crypto.pbkdf2(password, passwordSalt, 10000, 64, 'sha512', function(err, passwordHash) {

            User.findOne({
                email: email
            }, function(err, user) {

                if (err) {
                    console.log('problem in db');
                    return res.json({
                        success: false,
                        extras: {
                            msg: accountUtil.DB_ERROR
                        }
                    }).end();
                }
                if (user) {
                    console.log('email already exists')
                    return res.json({
                        success: false,
                        extras: {
                            msg: accountUtil.EMAIL_ALREADY_EXISTS
                        },
                        redirect: 'signup'
                    }).end();

                } else {
                    var newUser = new User({
                        name: name,
                        email: email,
                        passwordHash: passwordHash,
                        passwordSalt: passwordSalt,
                        sex: sex,
                        mobile: mobile,
                    });
                    newUser.save(function(err, numAffected) {
                        if (err) {
                            console.log('error occured while saving');
                            console.log(err);
                            return res.json({
                                success: false,
                                extras: {
                                    msg: accountUtil.DB_ERROR
                                },
                            }).end();
                        } else {
                            console.log('saved successfully');
                            var profile = {
                                email: email,
                                name: name,
                                activated: false
                            };
                            // console.log('here is your profile ' +profile)
                            // We are sending the profile inside the token
                                      var token = jwt.sign(profile, cred.jwtSecret, {
                                          expiresIn: 60 * 15
                                      });
                                      res.cookie("jtoken",token,{
                                        httpOnly:true,
                                      });
                                      return res.json({
                                          success: true
                                      }).end();
                        }
                    });
                }
            });
        });
    });

}
