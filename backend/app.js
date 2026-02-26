var createError = require('http-errors');
var express = require('express');
var path = require('path');
const jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser');
const cors = require('cors');
var logger = require('morgan');
const db = require('./models')


// Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/auth');
var adminRouter = require('./routes/admin');
var eventsRouter = require('./routes/events');

var app = express();

db.sequelize.sync({ force: false })


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Cors
app.use(cors({
  origin: 'http://localhost:5173', //Replace with front-end url later
  credentials: true
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/events', eventsRouter);
app.use('/admin', adminRouter);


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
