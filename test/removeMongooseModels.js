const mongoose = require('mongoose')

module.exports = function removeModel (done) {
  delete mongoose.models
  delete mongoose.modelSchemas
  mongoose.disconnect(function () {
    done()
  })
}
