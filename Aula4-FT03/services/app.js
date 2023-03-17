var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index.js');
var usersRouter = require('./routes/users');
var sensorsRouter = require('./routes/sensors');

const mongoose = require('mongoose');
const uri = "mongodb://localhost:9000/leituras";

var app = express();

mongoose.connect(uri).then(() => console.log('Connected!'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sensors', sensorsRouter);

module.exports = app;
