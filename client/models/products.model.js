class ProductsModel {
  constructor ($http, $q) {
    'ngInject'

    this.$http = $http
    this.$q = $q
    this.products = []

    this.getProducts = this.getProducts.bind(this)
  }
  getProducts () {
    var deferred = this.$q.defer()
    this.$http.get('/products')
      .then(function (data) {
        deferred.resolve(data)
      }, function (error) {
        deferred.reject(error)
      })

    this.products = deferred.promise

    return this.$q.when(this.products)
  }
}

export default ProductsModel
