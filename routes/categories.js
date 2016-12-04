var express = require('express')
var bodyParser = require('body-parser')

var CategoryController = require('./controllers/category')

var categoriesRouter = express.Router()
categoriesRouter.use(bodyParser.json())

categoriesRouter.route('/')
  .get(CategoryController.getCategories)
  .post(CategoryController.addCategory)

categoriesRouter.route('/:catId')
  .get(CategoryController.getCategory)
  .put(CategoryController.updateCategory)
  .delete(CategoryController.deleteCategory)

module.exports = categoriesRouter
