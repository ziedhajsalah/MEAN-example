class ShowCategoryController {
  constructor (ProductsModel, CategoriesModel, $stateParams) {
    'ngInject'

    this.ProductsModel = ProductsModel
    this.CategoriesModel = CategoriesModel
    this.$stateParams = $stateParams
    this.catId = this.$stateParams.catId
  }
  $onInit () {
    this.CategoriesModel.getCategory(this.catId)
      .then(response => {
        this.category = response.data
        this.getProducts()
      })
  }
  getProducts () {
    this.ProductsModel.getCategoryProducts(this.category)
      .then(response => {
        this.products = response.data
      })
  }
}

export default ShowCategoryController
