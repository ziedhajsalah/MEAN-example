/* eslint-env node */
const express = require('express')
const path = require('path')
// const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
// const lusca = require('lusca')
const expressValidator = require('express-validator')
const dotenv = require('dotenv')
const flash = require('express-flash')

/**
 * Load environment variables from .env file
 */
dotenv.load({ path: '.env' })

// use the global Promise instead of mongoose promise library deprecated
mongoose.Promise = Promise
mongoose.connect(
  process.env.MONGODB_URI || process.env.MONGOLAB_URI
)

/**
 * routes declaration
 */
const routes = require('./routes/index')
const auth = require('./routes/auth')
const users = require('./routes/users')
const products = require('./routes/products')
const categories = require('./routes/categories')

const app = express()

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
app.use(flash())
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
app.use('/auth', auth)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found')
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
