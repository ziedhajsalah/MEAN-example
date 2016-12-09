/* eslint-env mocha */
const chai = require('chai')
chai.should()
const mongoose = require('mongoose')
const Products = require('../../models/Products')
const removeMongooseModels = require('../removeMongooseModels')

describe('products model', function () {
  before(function (done) {
    mongoose.connect('mongodb://localhost:27017/exampletest')
    Products.remove({}, function (err) {
      if (err) { return done(err) }
      done()
    })
  })

  after(function (done) {
    removeMongooseModels(done)
  })

  it('should save a new product', function (done) {
    const product = new Products({ name: 'Foo' })
    product.save(function (err, doc) {
      if (err) { return done(err) }
      if (!doc) { return done('product was not persisted') }
      doc.should.have.property('name')
      doc.name.should.equal('Foo')
      done()
    })
  })

  it('should be able to update a product', function (done) {
    Products.findOne({ name: 'Foo' }, function (err, doc) {
      if (err) { return done(err) }
      doc.price = 3
      doc.save(function (err) {
        if (err) { return done(err) }
        done()
      })
    })
  })

  it('should be able to delete a product', function (done) {
    Products.findOne({ name: 'Foo' }, function (err, doc) {
      if (err) return done(err)
      doc.remove(function (err) {
        if (err) return done(err)
        done()
      })
    })
  })

  it('should be able to return all products', function (done) {
    Products.remove({}, function (err) {
      if (err) return done(err)
      done()
    })
  })
})

