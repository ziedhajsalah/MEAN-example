var mongoose = require('mongoose')
var Category = require('../models/Categories')
var Product = require('../models/Products')

function makeid () {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/example'
)

for (var i = 0; i < 10; i++) {
  Category.create({ name: 'cat ' + makeid() }, function (err, data) {
    if (err) console.log(err)
    console.log(data)
    for (var j = 0; j < 10; j++) {
      var prod = {
        name: 'product ' + makeid(),
        price: i + j,
        quantity: i,
        category: data._id
      }
      Product.create(prod, function (err, product) {
        if (err) console.log(err)
        console.log(product)
      })
    }
  })
}
