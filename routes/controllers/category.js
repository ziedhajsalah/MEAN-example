var Categories = require('../../models/Categories')

var getCategories = function (req, res, next) {
  Categories.find({}, function (err, categories) {
    if (err) return next(err)
    res.json(categories)
  })
}

var addCategory = function (req, res, next) {
  Categories.create(req.body, function (err, category) {
    if (err) return next(err)
    var data = {
      message: 'Category created!',
      category: category
    }

    res.json(data)
  })
}

var getCategory = function (req, res, next) {
  Categories.findById(req.params.catId, function (err, category) {
    if (err) return next(err)
    res.json(category)
  })
}

var updateCategory = function (req, res, next) {
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
}

var deleteCategory = function (req, res, next) {
  Categories.findByIdAndRemove(req.params.catId, {}, function (err, response) {
    if (err) return next(err)
    res.json(response)
  })
}

var CategoryController = {
  getCategories: getCategories,
  addCategory: addCategory,
  getCategory: getCategory,
  updateCategory: updateCategory,
  deleteCategory: deleteCategory
}

module.exports = CategoryController
