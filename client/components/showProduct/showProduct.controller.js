class ShowProductController {
  constructor (ProductsModel, $stateParams, $state) {
    'ngInject'

    this.$stateParams = $stateParams
    this.ProductsModel = ProductsModel
    this.$state = $state
    this.showForm = false
    this.productId = this.$stateParams.productId
  }
  $onInit () {
    this.ProductsModel.getProduct(this.productId)
      .then(response => {
        this.product = response.data
      })
  }
  toggleForm () {
    this.showForm = !this.showForm
  }
  update (product) {
    this.ProductsModel.updateProduct(product)
      .then(response => {
        this.product = response.data.product
      })
  }
  deleteProduct (product) {
    this.ProductsModel.deleteProduct(product)
      .then(response => {
        return this.$state.go('products')
      })
  }
}

export default ShowProductController
