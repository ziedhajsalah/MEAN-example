class ProductsController {
  constructor (ProductsModel) {
    'ngInject'

    this.ProductsModel = ProductsModel
  }
  $onInit () {
    this.ProductsModel.getProducts()
      .then(response => {
        this.products = response.data
      })
  }
}

export default ProductsController
