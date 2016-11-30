var mongoose = require('mongoose')

require('mongoose-currency').loadType(mongoose)
var Currency = mongoose.Types.Currency

var ProductSchema = new mongoose.Schema({
  name: String,
  price: Currency,
  quantity: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
}, { timestamps: true })

var Product = mongoose.model('Product', ProductSchema)

module.exports = Product
