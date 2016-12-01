class SideBarController {
  constructor (CategoriesModel) {
    'ngInject'

    this.CategoriesModel = CategoriesModel
  }
  $onInit () {
    this.CategoriesModel.getCategories()
      .then(response => {
        this.categories = response.data
      })
  }
}

export default SideBarController
