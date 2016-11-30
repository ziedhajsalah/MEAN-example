var express  = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

var Categories = require('../models/Categories')
var categoriesRouter = express.Router()
categoriesRouter.use(bodyParser.json())

categoriesRouter.route('/')
  .get(function (req, res, next) {
    Categories.find({}, function (err, categories) {
      if (err) return next(err)
      res.json(categories)
    })
  })
  .post(function (req, res, next) {
    Categories.create(req.body, function (err, category) {
      if (err) return next(err)
      var data = {
        message: 'Category created!',
        category: category
      }

      res.json(data)
    })
  })

categoriesRouter.route('/:catId')
  .get(function (req, res, next) {
    Categories.findById(req.params.catId, function (err, category) {
      if (err) return next(err)
      res.json(category)
    })
  })
  .put(function (req, res, next) {
    Categories.findByIdAndUpdate(req.params.catId, {
      $set: req.body
    }, {
      new: true
    }, function (err, modifiedCategory) {
      if (err) return next(err)

      var data = {
        message: 'Category updated',
        category: modifiedCategory
      }

      res.json(data)
    })
  })
  .delete(function (req, res, next) {
    Categories.findByIdAndRemove(req.params.catId, {}, function (err, response) {
      if (err) return next(err)
      res.json(response)
    })
  })

module.exports = categoriesRouter