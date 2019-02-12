const Doctor = require('../models/Doctors')
const User = require('../models/Users')
const accountUtil = require('../controller/accountUtil')
const crypto = require('crypto')
const cred = require('../config/cred.js')
const jwt = require('jsonwebtoken');
const moment = require('moment');
// const NodeGeocoder = require('node-geocoder');
var formidable = require('formidable');
const path = require('path')
var multer = require('multer');
var fs = require('fs');
var connect = require('connect');

module.exports = function(app) {      

var counter =0;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './client/records/')
        console.log("destination set")
    },
    filename: function (req, file, cb) {
        console.log(req.body);
        //TODO: Change the name accrodingly
         counter++;
        cb(null, req.body.email + '-' + Date.now() + path.extname(file.originalname))
    },
    onError : function(err, next) {
      console.log(err);
      // res.json({'result':false});
      next(err);
    }
})

app.post('/secure/upload/record',function(req, res) {
    counter = 0
    var upload = multer({
        storage: storage
    }).single('image')
    upload(req, res, function(err) {
       
        if(err){
            console.log(err)
             res.json({'result':false});
        }
        User.findOneAndUpdate({ email: req.user.email },
                { $addToSet: { "records" : {url: req.file.filename , comment: req.body.comment} },  },
                {safe: true},
                function(error, user) {
                    if(error){
                        console.log(err);
                        res.json({
                        success:false
                        }).end();
                    }
                    // else{
                    //     res.json({
                    //     success:true
                    //     }).end();
                    // }
                });
        res.json({'result': true, url: "records/"+req.file.filename})
    })
});

var storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './client/clinic/')
        console.log("destination set")
    },
    filename: function (req, file, cb) {
        console.log(req.body);
        //TODO: Change the name accrodingly
            
         counter++;
        
        cb(null, req.user.email + '-' + "clinic" + '-'+ Date.now() + path.extname(file.originalname))
    },
    onError : function(err, next) {
      console.log(err);
      // res.json({'result':false});
      next(err);
    }

})
app.post('/secure/upload/clinic_images',function(req, res) {
    counter = 0;
    if(!req.user) {
		res.json({success: false,message: "Unauthorized", redirect: "login"}).end();
	return;
	}
    var i = 0
    console.log('in clinic images upload')
    var upload = multer({
        storage: storage2
    }).array('files[]')
    upload(req, res, function(err) {
        var temp = []
        req.files.forEach(function(file) {
            temp.push("clinic/"+file.filename)
        });
        if(err){
            console.log(err)
             res.json({'result':false});
        }
        Doctor.update({ email: req.user.email },
                { $set: { "clinic_images_url" : temp },  },
                function(error, doctor) {
                    if(error){
                        console.log(err);
                        res.json({
                        success:false
                        }).end();
                    }
                    // else{
                    //     res.json({
                    //     success:true
                    //     }).end();
                    // }
                });

        res.json({'result': true, url: temp})
    })
});


    app.post('/secure/upload',function(req,res){
		
        console.log('heyy')
		
        // console.log(req)
        var file_name;
        console.log("in file upload")
        console.log(req.body);
		if(!req.user) {
			res.json({success: false,message: "Unauthorized", redirect: "login"}).end();
			return;
		}
        var form = new formidable.IncomingForm();
        form.uploadDir = path.join(__dirname +'/../../client/uploads');
        //file upload path
        form.parse(req, function(err, fields, files) {
            //you can get fields here
        });
        form.on ('fileBegin', function(name, file){
            console.log("fileBegin")
            var extension = file.name.split('.').pop()
            file.name = req.user.email + '.' + extension;
            file.path = form.uploadDir + "/" + file.name;
            file_name = file.name;
            console.log(file_name);
            //modify file path
            
        });
        form.on ('end', function(){
            console.log("on end");
            return res.json({url: "uploads/"+file_name
                }).end();
            //when finish all process    
        });
        
    });


// end of image uploads

app.post('/secure/save_urls', function(req, res){
    console.log('in save_urls');
	    if(!req.user){
	    	res.json({success: false,message:"Unauthorized"});;
		return;
	    }
        if(req.body.which_url == "clinic_images_url"){
                Doctor.update({ email: req.user.email },
                { $set: { "clinic_images_url" : req.body.urls },  },
                function(error, doctor) {
                    if(error){
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
                });
        }

        if(req.body.which_url == "records_url"){
                User.findOneAndUpdate({ email: req.user.email },
                { $addToSet: { "records" : req.body.urls },  },
                {safe: true},
                function(error, user) {
                    if(error){
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
                });
        }
});


    app.get('/secure/doctor/restricted', function(req, res) {
	if(!req.user) {
	res.json({success: false,message: "Unauthorized"}).end();
	return;
	}
            res.send('Welcome back ' + req.user.name).end();
    });


    app.post('/doctor/login', function(req, res) {
        var email = req.body.email;
        var password = req.body.password;

        Doctor.findOne({
            email: email,
        }, function(err, doctor) {
            if (err) {
                console.log('db_error');
                return res.json({
                    success: false,
                    extras: {
                        msg: accountUtil.DB_ERROR
                    }
                    // redirect:'/doctor/login'
                });
                res.end()

            }
            if (doctor) {
                console.log('account_exists');
                accountUtil.checkPassword(password, doctor.passwordSalt, function(err, passwordHash) {
                    if(err)
                    console.log('error in checkpassword');
                    if (passwordHash == doctor.passwordHash) {
                        var profile = {
                            id: doctor._id,
                            email: doctor.email,
                            name: doctor.name,
                            activated: doctor.activated
                        };
// console.log('here is your profile ' +profile)
                        // We are sending the profile inside the token
                        var token = jwt.sign(profile, cred.jwtSecret, {
                            expiresIn: 60 * 5
                        });
                        if(doctor.activated){//if  activated
                            console.log('to set dashboard as redirect');
                            var redirect = 'dashboard';
                        }
                        else {               //not activated
                            var redirect = 'signup2';
                            var msg = 'PLEASE COMPLETE YOUR PROFILE';
                            console.log('to set signup2 as redirect');
                        }
// console.log('password matched');
                        res.cookie("jtoken",token,{httpOnly:true});
                        res.json({
                            success: true,
                            redirect: redirect,
                            extras: {
                                msg: msg
                            }
                        }).end();

                    } else {
// console.log('password not matched');
                        return res.json({
                            success: false,
                            extras: {
                                msg: accountUtil.INVALID_PWD
                            },
                            redirect:'login'

                        }).end();
                        // res.redirect('/doctor/login');
                    }
                });
            } else {
                //console.log('account_not_found');
                return res.json({
                    success: false,
                    extras: {
                        msg: accountUtil.EMAIL_NOT_FOUND
                    },
                    redirect:'login'
                });
                // res.redirect('/doctor/login');
                res.end()

            }
        });
    });

    app.post('/secure/doctor/signup_complete', function(req, res) {

	    if(!req.user) {
			res.json({success: false,message: "Unauthorized", redirect: "login"}).end();
			return;
		}

        console.log('in signup');
        console.log(req.user);
        var home_address = req.body.home_address;
        var clinic_address = req.body.clinic_address;
        var image_url = req.body.image_url;
        console.log(image_url);
        var fees = req.body.fees;
        var age = req.body.age;
        var working_days = [];
        var working_hours = [];
        var appointment_duration = req.body.appointment_duration.split(' ')[0];
        var qualification = req.body.qualifications;
        var speciality = req.body.speciality;
	    var experience = req.body.experience;
        var location = [req.body.latitude, req.body.longitude];
        var redirect = 'login';
        if(req.body.activate == true){
            redirect = 'dashboard';
        }
        console.log(location);
        for(i=0;i<req.body.working_days.length;i++) {
          if(req.body.working_days[i].value == true){
            working_days.push(i);
          }
        }

        for(i=0;i<req.body.working_hours.length;i++) {
        //   console.log(req.body.working_hours[i].start_time + "-" + req.body.working_hours[i].end_time);
          working_hours.push(moment(req.body.working_hours[i].start_time, ["h:mm A"]).format("HH:mm"));
          working_hours.push(moment(req.body.working_hours[i].end_time, ["h:mm A"]).format("HH:mm"));
        }       
        
        Doctor.findOneAndUpdate({
            email: req.user.email
            },
            {
            home_address: home_address,
            clinic_address: clinic_address,
            appointment_duration: appointment_duration,
            qualification: qualification,
            speciality: speciality,
            working_days : working_days,
            working_hours : working_hours,
            fees:fees,
            experience: experience,
            age: age,
            activated: true,
            location: location,
            image_url:image_url
            },
            function(err, doc){
            if(err){
                console.log("Something wrong when updating data!");
                // console.log(err)
                return res.json({
                    success: false,
                    extras: {
                        msg: accountUtil.DB_ERROR
                    }
                }).end();
            }
            console.log("Data updated successfully");
            return res.json({
                success: true,
                redirect: 'dashboard',
            }).end();
        });
        // setTimeout(saveSignup, 3000);
        });


    app.post('/doctor/signup', function(req, res) {
        console.log('in signup');
        console.log(req.body);
        var email = req.body.email;
        var password = req.body.password;
        var sex = req.body.sex; //M/F
        var mobile = req.body.mobile;
        var name = req.body.firstname + " " + req.body.lastname;
        var total_ratings = 0;
        var total_stars = 0;

        var passwordSalt = crypto.randomBytes(128).toString('base64');
        crypto.pbkdf2(password, passwordSalt, 10000, 64, 'sha512', function(err, passwordHash) {

            Doctor.findOne({
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
                    var newDoctor = new Doctor({
                        name: name,
                        email: email,
                        passwordHash: passwordHash,
                        passwordSalt: passwordSalt,
                        sex: sex,
                        mobile: mobile,
                        total_ratings: total_ratings,
                        total_stars: total_stars
                        // appointments:[{patient_name:"patient name", time: Date.now(), patient_id: "123"}]
                    });
                    newDoctor.save(function(err, numAffected) {
                        if (err) {
                            console.log('error occured while saving');
                            console.log(err);
                            return res.json({
                                success: false,
                                extras: {
                                    msg: accountUtil.DB_ERROR
                                },
                                redirect: 'signup'
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

    app.post('/secure/doctor/get_profile', function(req, res) {
    if(!req.user) {
        res.json({success: false,message: "Unauthorized", redirect: "login"}).end();
        return;
	}
    if(!req.user.activated){
        res.json({success: false, message: 'Unactivated account', redirect: 'login'}).end();
        return;
    }
    file_name = "";
        var profile = {};
        Doctor.findOne({ email: req.user.email },'name email speciality appointments experience home_address clinic_address appointment_duration qualification speciality working_days working_hours fees age image_url reviews votes clinic_images_url').lean().exec(function(error, doctor) {
       var temp=[];
        var now = moment().unix();
        for(i=0;i<doctor.appointments.length;i++){
                if(doctor.appointments[i].time > now){
                        temp.push(doctor.appointments[i])
                }
        }
        // doctor.image_url=path.join(__dirname +'/../../client/uploads'+req.body.image_file_name);
        doctor.appointments = temp;


        return res.json({
          success : true,
          profile: doctor
        });
      });
    });
    app.post('/secure/doctor/check_login', function(req, res) {
        var isLoggedIn = false;
        if(req.user){
            isLoggedIn = true;
        }
        return res.json({
            success:true,
            isLoggedIn:isLoggedIn
        });
    });
    app.post('/secure/doctor/get_appointment', function(req, res){
        if(!req.user) {
        res.json({success: false,message: "Unauthorized"}).end();
        return;
	}
    
        Doctor.findOne({ email: req.user.email },'appointments').lean().exec(function(error, doctor) {
            var temp=[];
            var now = moment().unix();
            for(i=0;i<doctor.appointments.length;i++){
                    if((doctor.appointments[i].time < now) && ((doctor.appointments[i].patient_name).search(new RegExp(req.body.searchText, "i")) != -1)){           
                            temp.push(doctor.appointments[i]);
                    }
            }
            return res.json({
            success : true,
            appointments: temp 
            });
      });
    })
    app.post('/doctor/logout', function(req, res){
        res.clearCookie('jtoken');
        return res.json({
            success : true,
            redirect : 'home',
            extras: {
                msg: 'Successfully logged out'
            }
        });
    });

app.post('/secure/doctor/save_form', function(req, res){
    console.log('in save_forms');
	    if(!req.user){
	    	res.json({success: false,message:"Unauthorized"});;
		return;
	    }
      Doctor.update({
        email: req.user.email,
        appointments: { $elemMatch: {time: req.body.appointment.time } }
    },
    { $set: { "appointments.$.form" : req.body.form },  },
    function(error, doctor) {
         if(error){
            console.log(error);
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
app.post('/secure/doctor/get_form', function(req, res){
    console.log('in get_forms');
	    if(!req.user){
	    	res.json({success: false,message:"Unauthorized"});;
		return;
	    }
        file_name = req.body.appointment.time;
        Doctor.findOne({ email: req.user.email ,appointments: { $elemMatch: {time: req.body.appointment.time } } },'appointments.$.form').lean().exec(
        function(error, doctor) {
         if(error){
            console.log(err);
            res.json({
              success:false
            }).end();
          }
          else{
              console.log(doctor.appointments[0].form);
            res.json({
              success:true,
              form: doctor.appointments[0].form
            }).end();
          }
        }
    );

});

    app.post('/doctor/save_ratings', function(req, res) {
        console.log("in save_ratings");
        var review = {};
        review.username = req.body.patient_name;
        review.stars = req.body.stars;
        review.time =  Date.now();
        review.comment = req.body.comment;
        Doctor.findOneAndUpdate({ _id: req.body.doctor_id ,appointments: { $elemMatch: {_id: req.body.appointment_id } } },
            {
             $set: { "appointments.$.review" : review },
             $inc: {total_stars: review.stars, total_ratings: 1},
            },
            function(err, doc){
            if(err){
                console.log("Something wrong when updating data!");
                // console.log(err)
                return res.json({
                    success: false,
                    extras: {
                        msg: accountUtil.DB_ERROR
                    }
                }).end();
            }
            console.log("Ratings saved updated successfully");
            return res.json({
                success: true,
            }).end();
        });
        
        });


    app.post('/secure/doctor/get_medical_history', function(req, res){
        console.log("in get medical history");
        console.log(req.body);
        console.log(req.body.patient_id);
       var temp = []
          Doctor.find({"appointments.patient_id": req.body.patient_id }, function (err, doctors) {
            if(err){
              console.log(err);
              return res.json({success : false});
            }
            if(doctors){
                for(i = 0; i < doctors.length; i++){
                // console.log(doctors[i].appointments.length);
                if(doctors[i].appointments){
                    for(j = 0; j < doctors[i].appointments.length; j++){
                        if(doctors[i].appointments[j].patient_id == req.body.patient_id){ //&& doctors[i].appointments[j].form != null){
                            var apt = {};
                            apt.doctor = doctors[i].name;
                            apt.doctor_id = doctors[i]._id;
                            apt.speciality = doctors[i].speciality;
                            apt.time = doctors[i].appointments[j].time;
                            apt.apt_id = doctors[i].appointments[j]._id;
                            apt.apt_form = doctors[i].appointments[j].form;
                            apt.appointment = doctors[i].appointments[j];
                            temp.push(apt);
                        }
                    }
                }
                
            }
            console.log(temp.length);
                console.log(doctors.length);

            }
            // console.log(doctors.length);
            return res.json({success: true, medical_history : temp});
        });

        
  });

    app.post('/secure/doctor/get_records', function(req, res) {
        if(!req.user) {
            res.json({success: false,message: "Unauthorized"}).end();
            return;
        }
        User.findById(req.body.patient_id,'records').lean().exec(function(error, user) {
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
            console.log(user);
            return res.json({
            success : true,
            records_url: user.records
            });
        });
    });

    app.post('/secure/doctor/get_clinic_images', function(req, res) {
        if(!req.user) {
            res.json({success: false,message: "Unauthorized"}).end();
            return;
        }
        var profile = {};
        Doctor.findById(req.user.id,'clinic_images_url').lean().exec(function(error, user) {
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
            console.log(user);
            return res.json({
            success : true,
            records_url: user.clinic_images_url
            });
        });
    });


}