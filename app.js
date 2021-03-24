var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// initialize db
var mongo = require('./db');
console.log("Initialize mongo client");
mongo.initializeMongoClient();
console.log("After initialize mongo client");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var monitoring = require('./monitoring');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req,res,next) => {

  // monitoring.labels.path = req.path;
  console.log('request made');
  // increment total requests counter
  monitoring.requestCount.bind(monitoring.labels).add(1);

  next();

});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;