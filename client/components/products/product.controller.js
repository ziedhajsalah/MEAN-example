class ProductsController {
  constructor (ProductsModel, CategoriesModel) {
    'ngInject'

    this.ProductsModel = ProductsModel
    this.CategoriesModel = CategoriesModel
    this.showForm = false
    this.product = {}
  }
  $onInit () {
    this.ProductsModel.getProducts()
      .then(response => {
        this.products = response.data
      })

    this.CategoriesModel.getCategories()
      .then(response => {
        this.categories = response.data
      })
  }
  toggleForm () {
    this.showForm = !this.showForm
  }
  addProduct (product) {
    this.ProductsModel.addProduct(product)
      .then(response => {
        this.products.push(response.data.product)
      })

    this.product = {}
    this.showForm = false
  }
}

export default ProductsController
