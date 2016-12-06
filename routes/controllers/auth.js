var User = require('../../models/User')
var passport = require('passport')
require('../../config/passport')

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
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err)
    }

    if (!user) {
      console.log(info)
      req.flash('errors', info.message)
      return res.redirect('/auth/login')
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err)
      }
      req.flash('success', 'Welcome again')
      res.redirect('/')
    })
  })(req, res, next)
}

var logout = function (req, res, next) {
  req.logout()
  res.redirect('/')
}

/* API */

var isAuth = function (req, res, next) {
  res.json({
    status: req.isAuthenticated()
  })
}

var apiRegister = function (req, res, next) {
  var user = {
    email: req.body.email,
    password: req.body.password
  }

  User.findOne({ email: user.email }, function (err, existingUser) {
    if (err) {
      return next(err)
    }
    if (existingUser) {
      res.json({
        message: 'this email is already taken'
      })
      return
    }

    user = new User(user)
    user.save(function (err) {
      if (err) {
        next(err)
      }
      res.status(200).json({
        'token': user.generateJWT(),
        'message': 'User registered: ' + req.body.email
      })
    })
  })
}

var apiLogin = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      res.status(404).json(err)
    }

    if (!user) {
      res.status(401).json(info)
    }

    res.status(200).json({
      token: user.generateJWT()
    })
  })(req, res, next)
}

var AuthController = {
  getLoginPage: getLoginPage,
  getRegisterPage: getRegisterPage,
  register: register,
  login: login,
  logout: logout,
  isAuth: isAuth,
  apiRegister: apiRegister,
  apiLogin: apiLogin
}

module.exports = AuthController
