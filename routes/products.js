var express = require('express')
var bodyParser = require('body-parser')

var ProductsController = require('./controllers/product')

var productRouter = express.Router()
productRouter.use(bodyParser.json())

productRouter.route('/')
  .get(ProductsController.getProducts)
  .post(ProductsController.addProduct)

productRouter.route('/:productId')
  .get(ProductsController.getProduct)
  .put(ProductsController.updateProduct)
  .delete(ProductsController.deleteProduct)

module.exports = productRouter
