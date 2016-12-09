/* eslint-env mocha */
const request = require('supertest')
const server = require('../../bin/www')

describe('server', function () {
  describe('home page', function () {
    it('should respond to GET', function (done) {
      request(server)
        .get('/')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)
          done()
        })
    })
  })
})
