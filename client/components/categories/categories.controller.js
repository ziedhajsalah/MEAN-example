class CategoriesController {
  constructor (CategoriesModel) {
    'ngInject'

    this.CategoriesModel = CategoriesModel
    this.showForm = false
    this.categories = []
    this.category = {}
  }
  $onInit () {
    this.CategoriesModel.getCategories()
      .then(response => {
        this.categories = response.data
      })
  }
  toggleForm () {
    this.showForm = !this.showForm
  }
  addCategory (category) {
    this.CategoriesModel.addCategory(category)
      .then(response => {
        this.categories.push(response.data.category)
      })

    this.category = {}
    this.showForm = false
  }
}

export default CategoriesController
