var express = require('express')
var bodyParser = require('body-parser')

var Products = require('../models/Products')

var productRouter = express.Router()
productRouter.use(bodyParser.json())

productRouter.route('/')
  .get(function (req, res, next) {
    var limit = req.query.limit
      ? parseInt(req.query.limit)
      : 0

    if (req.query.cat) {
      Products.find({ category: req.query.cat }).limit(limit)
        .exec(function (err, products) {
          if (err) return next(err)
          res.json(products)
        })
      return
    }

    Products.find({}).limit(limit)
      .exec(function (err, products) {
        if (err) return next(err)
        res.json(products)
      })
  })
  .post(function (req, res, next) {
    Products.create(req.body, function (err, product) {
      if (err) {
        return next(err)
      }
      var data = {
        message: 'Product created!',
        product: product
      }

      res.json(data)
    })
    // Categories.findOne({ name: req.body.category })
    //   .exec(function (err, cat) {
    //     if (err) {
    //       return next(err)
    //     }
    //     req.body.category = cat._id
    //     Products.create(req.body, function (err, product) {
    //       if (err) {
    //         return next(err)
    //       }
    //       var data = {
    //         message: 'Product created!',
    //         product: product
    //       }
    //
    //       res.json(data)
    //     })
    //   })
  })

productRouter.route('/:productId')
  .get(function (req, res, next) {
    Products.findById(req.params.productId, function (err, product) {
      if (err) return next(err)
      res.json(product)
    })
  })
  .put(function (req, res, next) {
    Products.findByIdAndUpdate(req.params.productId, {
      $set: req.body
    }, {
      new: true
    }, function (err, modifiedProduct) {
      if (err) return next(err)
      var data = {
        message: 'Product modified',
        product: modifiedProduct
      }

      res.json(data)
    })
  })
  .delete(function (req, res, next) {
    Products.findByIdAndRemove(req.params.productId, {}, function (err, response) {
      if (err) return next(err)
      res.json(response)
    })
  })

module.exports = productRouter
