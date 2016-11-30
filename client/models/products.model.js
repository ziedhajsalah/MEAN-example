class ProductsModel {
  constructor ($http, $q) {
    'ngInject'

    this.$http = $http
    this.$q = $q
    this.products = []

    this.getProducts = this.getProducts.bind(this)
  }

  getProducts () {
    const deferred = this.$q.defer()
    this.$http.get('/products')
      .then(function (data) {
        deferred.resolve(data)
      }, function (error) {
        deferred.reject(error)
      })

    this.products = deferred.promise

    return this.$q.when(this.products)
  }

  addProduct (product) {
    const deferred = this.$q.defer()
    this.$http.post('/products', product)
      .then(data => {
        deferred.resolve(data)
      }, error => {
        deferred.reject(error)
      })

    const newProduct = deferred.promise

    return this.$q.when(newProduct)
  }

  getProduct (product) {
    const deferred = this.$q.defer()
    this.$http.get('/products/' + product)
      .then(data => {
        deferred.resolve(data)
      }, error => {
        deferred.reject(error)
      })

    const fetchedProduct = deferred.promise

    return this.$q.when(fetchedProduct)
  }

  updateProduct (product) {
    const deferred = this.$q.defer()
    this.$http.put('/products/' + product._id, product)
      .then(data => {
        deferred.resolve(data)
      }, error => {
        deferred.reject(error)
      })

    const updatedProduct = deferred.promise

    return this.$q.when(updatedProduct)
  }

  deleteProduct (product) {
    const deferred = this.$q.defer()
    this.$http.delete('/products/' + product._id, product)
      .then(data => {
        deferred.resolve(data)
      }, error => {
        deferred.reject(error)
      })

    const deletedProduct = deferred.promise

    return this.$q.when(deletedProduct)
  }

  getCategoryProducts (category) {
    const deferred = this.$q.defer()
    this.$http.get('/products?cat=' + category._id)
      .then(data => {
        deferred.resolve(data)
      }, error => {
        deferred.reject(error)
      })

    const products = deferred.promise

    return this.$q.when(products)
  }
}

export default ProductsModel
