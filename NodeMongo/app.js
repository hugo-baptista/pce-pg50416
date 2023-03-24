var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index.js');
var sensorsRouter = require('./routes/sensors.js');

const mongoose = require('mongoose');
const uri = "mongodb://localhost:9000/leituras";

var app = express();
mongoose.set('strictQuery', true);
mongoose.connect(uri)
  .then(() => console.log('Connected.'))
  .catch(() => console.log('Error connecting to MongoDB.'))

app.use(logger('dev'));
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/sensors', sensorsRouter);


module.exports = app;