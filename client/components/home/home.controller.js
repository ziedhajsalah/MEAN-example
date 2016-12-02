class HomeController {
  constructor (CategoriesModel, ProductsModel) {
    'ngInject'

    this.CategoriesModel = CategoriesModel
    this.ProductsModel = ProductsModel
  }

  $onInit () {
    this.CategoriesModel.getCategories()
      .then(response => {
        this.categories = response.data
        this.categories.map(category => {
          this.ProductsModel.getCategoryProducts(category)
            .then(res => {
              category.products = res.data
            })
        })
      })
  }
}

export default HomeController
