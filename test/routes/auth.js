/* eslint-env mocha */
const request = require('supertest')
const server = require('../../bin/www')
const assert = require('chai').assert
const removeMongooseModels = require('../removeMongooseModels')

describe('auth routes', function () {
  after(function (done) {
    removeMongooseModels(done)
  })
  describe('api/register', function () {
    it('should register a user via api', function (done) {
      const str = require('../../fixtures/utils').makeid()
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
          done()
        })
    })
  })
})
