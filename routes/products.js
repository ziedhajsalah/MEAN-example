var express = require('express')
var bodyParser = require('body-parser')
var jwt = require('express-jwt')

var auth = jwt({
  secret: 'mot de passe', // TODO
  userProperty: 'payload'
})

var ProductsController = require('./controllers/product')

var productRouter = express.Router()
productRouter.use(bodyParser.json())

productRouter.route('/')
  .get(ProductsController.getProducts)
  .post(auth, ProductsController.addProduct)

productRouter.route('/:productId')
  .get(ProductsController.getProduct)
  .put(auth, ProductsController.updateProduct)
  .delete(auth, ProductsController.deleteProduct)

module.exports = productRouter
