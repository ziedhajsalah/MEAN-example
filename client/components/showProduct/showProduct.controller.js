class ShowProductController {
  constructor (ProductsModel, CategoriesModel, $stateParams, $state) {
    'ngInject'

    this.$stateParams = $stateParams
    this.ProductsModel = ProductsModel
    this.CategoriesModel = CategoriesModel
    this.$state = $state
    this.showForm = false
    this.productId = this.$stateParams.productId
  }

  $onInit () {
    this.ProductsModel.getProduct(this.productId)
      .then(response => {
        this.product = response.data
        this.getCategory(this.product.category)
      })

    this.CategoriesModel.getCategories()
      .then(response => {
        this.categories = response.data
      })
  }
  getCategory (category) {
    this.CategoriesModel.getCategory(category)
      .then(response => {
        this.category = response.data
      })
  }
  toggleForm () {
    this.showForm = !this.showForm
  }

  update (product) {
    this.ProductsModel.updateProduct(product)
      .then(response => {
        this.product = response.data.product
        this.getCategory(this.product.category)
        this.showForm = false
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
