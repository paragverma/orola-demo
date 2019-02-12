const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const path = require('path')
const cred = require('./server/config/cred');

// Basic usage
mongoose.connect('mongodb://localhost/orola');

app.use('/api', expressJwt({secret: cred.secret}));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

app.use(function(err, req, res, next){
  if (err.constructor.name === 'UnauthorizedError') {
    res.status(401).send('Unauthorized');
  }
});

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
