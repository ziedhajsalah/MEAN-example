var bcrypt = require('bcrypt-nodejs')
var mongoose = require('mongoose')
var moment = require('moment')
var jwt = require('jsonwebtoken')

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  // passwordResetToken: String,
  // passwordResetExpires: Date,

  facebook: String

  // profile: {
  //   name: String,
  //   gender: String,
  //   location: String,
  //   picture: String
  // }
}, { timestamps: true })

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save (next) {
  var user = this
  if (!user.isModified('password')) { return next() }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err) }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err) }
      user.password = hash
      next()
    })
  })
})

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}

userSchema.methods.generateJWT = function () {
  var expire = moment().add(7, 'days').valueOf() / 1000

  return jwt.sign({
    _id: this._id,
    email: this.email,
    exp: expire
  }, process.env.JWT_SECRET) // TODO : add jwt secret to .env
}

var User = mongoose.model('User', userSchema)

module.exports = User
