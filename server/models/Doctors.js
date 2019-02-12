var mongoose = require("mongoose");

var DoctorSchema = new mongoose.Schema({
  name: {type: String, index: true},
  home_address : String,
  clinic_address : String,
  image_url : String,
  clinic_images_url : [String],
  activated : {type:Boolean, default:false},
  email: String,
  email_activated : {type:Boolean, default:false},
  passwordHash: String,
  passwordSalt: String,
  age: {type: Number, min:18,max:100},
  sex: {type: String, enum:["M","F"]},
  mobile: {type: String, max: 10, unique:true},
  phone: {type: String, max: 14},
  speciality : String,
  experience : {type : Number, max:100},
  appointments:[{patient_name:String, time: {type: Number}, patient_id: String, form: Object, review: {time: Date, username: String, stars: Number, comment: String}}],
  appointment_duration: {type: Number,min:10,max:300},
  working_hours: [String],
  working_days: [Number],
  qualification: Object,
  fees: {type:Number,min:0,max:5000},
  reviews: [{time: Date, username: String, stars: Number}],
  total_ratings: Number,
  total_stars: Number,
  votes : Number,
  location : {type:[Number]},
});

module.exports = mongoose.model('Doctors', DoctorSchema);
