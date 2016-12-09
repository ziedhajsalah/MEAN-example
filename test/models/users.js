/* eslint-env mocha */
const chai = require('chai')
chai.should()
const mongoose = require('mongoose')
const User = require('../../models/User')

mongoose.connection.on('error', function (err) {
  console.log('mongoose err: ', err)
})

describe('user model', function () {
  before(function (done) {
    mongoose.connect('mongodb://localhost:27017/exampletest')
    User.remove({}, function (err) {
      if (err) { return done(err) }
      done()
    })
  })

  after(function (done) {
    mongoose.models = {}
    mongoose.modelSchemas = {}
    mongoose.disconnect(function () {
      // console.log('mongoose disconnected')
      done()
    })
  })

  it('should save a new user', function (done) {
    const user = new User({ email: 'Foo' })
    user.save(function (err, doc) {
      if (err) { return done(err) }
      if (!doc) { return done('User was not persisted') }
      doc.should.have.property('email')
      doc.email.should.equal('Foo')
      done()
    })
  })

  it('should not save users with duplicate email', function (done) {
    const user = new User({ email: 'Foo' })
    user.save(function (err) {
      err.should.not.be.empty
      err.toString().should.match(/duplicate key error collection/)
      done()
    })
  })

  it('should encrypt the password', function (done) {
    const user = new User({
      email: 'mail@mail.com',
      password: 'password'
    })
    user.save(function (err, doc) {
      if (err) return done(err)
      doc.password.should.not.equal('password')
      done()
    })
  })
})
