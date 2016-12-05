var User = require('../../models/User')
var passport = require('passport')

var getLoginPage = function (req, res, next) {
  res.render('login', { 'title': 'Login' })
}

var getRegisterPage = function (req, res, next) {
  res.render('register', { 'title': 'Register' })
}

var register = function (req, res, next) {
  var user = {
    email: req.body.email,
    password: req.body.password
  }

  User.findOne({ email: user.email }, function (err, existingUser) {
    if (err) {
      return next(err)
    }
    if (existingUser) {
      req.flash('errors', 'L\'email introduit existe deja')
      return res.redirect('/auth/register')
    }

    user = new User(user)
    user.save(function (err) {
      if (err) {
        next(err)
      }
      req.flash('success', 'Bienvenue')
      return res.redirect('/')
    })
  })
}

var login = function (req, res, next) {
  return passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
}

var AuthController = {
  getLoginPage: getLoginPage,
  getRegisterPage: getRegisterPage,
  register: register,
  login: login
}

module.exports = AuthController
