var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  name: {type: String, index: true},
  activated : {type:Boolean, default:false},
  mobile: {type: String, max: 14},
  sex: {type: String, enum:["M","F"]},
  blood_group: {type: String, max:4},
  weight: Number,
  dob:String,
  email: String,
  passwordHash: String,
  passwordSalt: String,
  provider_id: String,
  martial_staus:String,
  emergency_contact:{type:String,max:14},
  records:[{url:String, comment: String}]
});

module.exports = mongoose.model('Users', UserSchema);
