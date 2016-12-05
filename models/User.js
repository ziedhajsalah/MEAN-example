var bcrypt = require('bcrypt-nodejs')
var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,

  facebook: String,

  profile: {
    name: String,
    gender: String,
    location: String,
    picture: String
  }
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

var User = mongoose.model('User', userSchema)

module.exports = User
