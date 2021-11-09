var createError = require('http-errors');
var express = require('express');
var path = require('path');
var dotenv = require('dotenv');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
var app = express();
dotenv.config();

//session Database Option Define
var options = {
  host: process.env.MySQL_URL,
  port: process.env.MySQL_PORT,
  user: process.env.MySQL_ID,
  password: process.env.MySQL_PW,
  database: process.env.MYSQL_DATABASES
};
var sessionStore = new MySQLStore(options);

//session Define
app.use(session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: true,
      store: sessionStore
    })
);

//router Defining
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dbRouter = require('./routes/db');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/db', dbRouter);

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
