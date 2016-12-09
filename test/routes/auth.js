/* eslint-env mocha */
const request = require('supertest')
const server = require('../../bin/www')
const chai = require('chai')
const assert = chai.assert
chai.should()
const removeMongooseModels = require('../removeMongooseModels')

describe('auth routes', function () {
  after(function (done) {
    removeMongooseModels(done)
  })

  const str = require('../../fixtures/utils').makeid()
  describe('api/register', function () {
    it('should register a user via api', function (done) {
      request(server)
        .post('/auth/api/register')
        .send({
          email: 'mail' + str + '@mail.com',
          password: 'password'
        })
        .end(function (err, res) {
          if (err) return done(err)
          assert.property(res.body, 'token')
          assert.property(res.body, 'message')
          assert(res.status, 201)
          done()
        })
    })

    it('should not accept duplicated emails', function (done) {
      request(server)
        .post('/auth/api/register')
        .send({
          email: 'mail' + str + '@mail.com',
          password: 'password'
        })
        .expect(400)
        .expect({message: 'this email is already taken'}, done)
    })

    it('should validate the email before processing', function (done) {
      request(server)
        .post('/auth/api/register')
        .send({
          email: 'mail' + str,
          password: 'password'
        })
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err)
          assert.property(res.body, 'errors')
          res.body.should.have.property('errors').and.be.instanceOf(Array)
          done()
        })
    })

    it('should not validate short passwords', function (done) {
      request(server)
        .post('/auth/api/register')
        .send({
          email: 'maile' + str + '@mail.com',
          password: 'pass'
        })
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err)
          res.body.should.have.property('errors').and.be.instanceOf(Array)
          res.body.errors[0].should.have.property('param', 'password')
          done()
        })
    })
    // it.only('should login a valid user and return a token', function (done) {
    //   request(server)
    //     .post('/auth/api/login')
    //     .send({
    //       email: 'mail' + str + '@mail.com', // 'ziedhajsalah@hotmail.com',
    //       password: 'password'
    //     })
    //     .end(function (err, res) {
    //       if (err) return done(err)
    //       res.body.should.have.property('token')
    //       done()
    //     })
    // })
  })

  describe('api/login', function () {
    it('should login a valid user and return a token', function (done) {
      request(server)
        .post('/auth/api/login')
        .send({
          email: 'mailZZj0d@mail.com', // 'ziedhajsalah@hotmail.com',
          password: 'password'
        })
        .end(function (err, res) {
          if (err) return done(err)
          res.body.should.have.property('token')
          done()
        })
    })
  })
})
