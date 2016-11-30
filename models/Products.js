var mongoose = require('mongoose')

require('mongoose-currency').loadType(mongoose)
var Currency = mongoose.Types.Currency

var ProductSchema = new mongoose.Schema({
  name: String,
  price: {
    type: Currency,
    default: 0
  },
  quantity: {
    type: Number,
    default: 0
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
}, { timestamps: true })

var Product = mongoose.model('Product', ProductSchema)

module.exports = Product
