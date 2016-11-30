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
}

export default ProductsModel
