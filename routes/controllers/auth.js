const User = require('../../models/User')
const passport = require('passport')
const validator = require('validator')
require('../../config/passport')

const getLoginPage = function (req, res, next) {
  res.render('login', { 'title': 'Login' })
}

const getRegisterPage = function (req, res, next) {
  res.render('register', { 'title': 'Register' })
}

const register = function (req, res, next) {
  if (!validator.isEmail(req.body.email)) {
    // req.assert('email', 'email not valid').isEmail()
    req.flash('errors', 'L\'email introduit est invalide')
    return res.redirect('/auth/register')
  }

  let user = {
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

const login = function (req, res, next) {
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

const logout = function (req, res, next) {
  req.logout()
  res.redirect('/')
}

/* API */

const isAuth = function (req, res, next) {
  res.json({
    status: req.isAuthenticated()
  })
}

const apiRegister = function (req, res, next) {
  let user = {
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

const apiLogin = function (req, res, next) {
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

const facebookLogin = function (req, res, next) {
  passport.authenticate('facebook', {scope: ['email']})(req, res, next)
}

const facebookLoginCallback = function (req, res, next) {
  passport.authenticate('facebook', function (err, user, info) {
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

const AuthController = {
  getLoginPage: getLoginPage,
  getRegisterPage: getRegisterPage,
  register: register,
  login: login,
  logout: logout,
  isAuth: isAuth,
  apiRegister: apiRegister,
  apiLogin: apiLogin,
  facebookLogin: facebookLogin,
  facebookLoginCallback: facebookLoginCallback
}

module.exports = AuthController
