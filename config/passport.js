var _ = require('lodash')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var FacebookStrategy = require('passport-facebook').Strategy

var User = require('../models/User')

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (err) { return done(err) }
    if (!user) {
      return done(null, false, { message: `Email ${email} not found.` })
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return done(err)
      }
      if (isMatch) {
        return done(null, user)
      }
      return done(null, false, { message: 'Invalid email or password.' })
    })
  })
}))

/**
 * Sign in with Facebook. //TODO
 */
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: [ 'emails', 'id' ],
  passReqToCallback: true
}, function (req, accessToken, refreshToken, profile, done) {
  User.findOne({ email: profile.emails[0].value }, (err, existingUser) => {
    if (err) { return done(err) }
    if (!existingUser) {
      var user = new User({
        email: profile.emails[0].value,
        facebook: profile.id
      })
      user.save(function (err) {
        if (err) {
          console.log(err)
          return
        }

        return done(null, user)
      })
    } else {
      if (existingUser.facebook === profile.id) {
        return done(null, existingUser)
      }
      existingUser.facebook = profile.id
      existingUser.save(function (err) {
        if (err) {
          console.log(err)
          return
        }
        return done(null, existingUser)
      })
    }
  })
}))

/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
  const provider = req.path.split('/').slice(-1)[ 0 ]

  if (_.find(req.user.tokens, { kind: provider })) {
    next()
  } else {
    res.redirect(`/auth/${provider}`)
  }
}
