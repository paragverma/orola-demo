const express = require('express');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const path = require('path');
const formidable = require('express-formidable');
const cred = require('./server/config/cred');
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());


app.use('/secure', expressJwt({
	secret: cred.jwtSecret,
	getToken: function fromCookieorHeader (req) {
	    if (req.get("Authorization") && req.get("Authorization").split(' ')[0] === 'Bearer') {
		console.log(req.get("Authorization").split(' ')[1])
       		 return req.get("Authorization").split(' ')[1];
    } else if (req.cookies && req.cookies.jtoken) {
      return req.cookies.jtoken;
    }
    return null;
  }
}));

app.use(function(err, req, res, next) {
if(err.name === 'UnauthorizedError') {
 console.log('Unauthorized token!');
 req.user = false;
}
next();
});

app.use(express.static(__dirname + '/client'));

// Basic usage
mongoose.connect('mongodb://127.0.0.1:27017/orola');
console.log(cred.jwtSecret);

require('./server/routes/doctor')(app);
require('./server/routes/user')(app);


app.get('*', function(req, res) {
	res.sendFile(path.resolve('./client/index.html'));
});


app.listen(80, function (err) {
  if(err){
	  console.log("Could not start server at port 80");
  }
  else{
	  console.log('Example app listening on port 80!');
  }
})