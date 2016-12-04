/* eslint-env node */
var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var passport = require('passport')
var session = require('express-session')
var lusca = require('lusca')
var expressValidator = require('express-validator')

var passportConfig = require('./config/passport')

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/example'
)

var routes = require('./routes/index')
var users = require('./routes/users')
var products = require('./routes/products')
var categories = require('./routes/categories')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(expressValidator())
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET || 'secret',
  autoReconnect: true
}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize())
app.use(passport.session())
// uncomment to enable csrf protection
// app.use(function (req, res, next) {
//   if (req.path === 'api url') {
//     next()
//   } else {
//     lusca.csrf()(req, res, next)
//   }
// })
// app.use(lusca.xframe(''))
// app.use(lusca.xssProtection(true))

app.use('/', routes)
app.use('/users', users)
app.use('/products', products)
app.use('/categories', categories)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
