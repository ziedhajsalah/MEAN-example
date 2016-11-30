class ShowProductController {
  constructor (ProductsModel, $stateParams) {
    'ngInject'

    this.$stateParams = $stateParams
    this.ProductsModel = ProductsModel

    this.productId = this.$stateParams.productId
  }
  $onInit () {
    this.ProductsModel.getProduct(this.productId)
      .then(response => {
        console.log(response)
        this.product = response.data
      })
  }
}

export default ShowProductController
