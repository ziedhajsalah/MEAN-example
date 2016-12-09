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
  req.assert('email', 'email is not valid').isEmail()
  req.assert('password', 'password is short').len(6)

  const errors = req.validationErrors()

  if (errors) {
    return res.status(400).json({
      errors
    })
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
      return res.status(400).json({
        message: 'this email is already taken'
      })
    }

    user = new User(user)
    user.save(function (err) {
      if (err) {
        next(err)
      }
      return res.status(201).json({
        'token': user.generateJWT(),
        'message': 'User registered: ' + req.body.email
      })
    })
  })
}

const apiLogin = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return res.status(500).json(err)
    }

    if (!user) {
      console.log(info)
      return res.status(400).json(info)
    }

    return res.status(200).json({
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
  getLoginPage,
  getRegisterPage,
  register,
  login,
  logout,
  isAuth,
  apiRegister,
  apiLogin,
  facebookLogin,
  facebookLoginCallback
}

module.exports = AuthController
