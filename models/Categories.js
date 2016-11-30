var mongoose = require('mongoose')

var CategorySchema = new mongoose.Schema({
  name: String,
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
}, { timestamps: true })

var Category = mongoose.model('Category', CategorySchema)

module.exports = Category
