class CategoriesModel {
  constructor ($http, $q) {
    'ngInject'

    this.$http = $http
    this.$q = $q
    this.categories = []
  }
  getCategories () {
    const deferred = this.$q.defer()
    this.$http.get('/categories')
      .then(data => {
        deferred.resolve(data)
      }, error => {
        deferred.reject(error)
      })

    this.categories = deferred.promise

    return this.$q.when(this.categories)
  }
  addCategory (category) {
    const deferred = this.$q.defer()
    this.$http.post('/categories', category)
      .then(data => {
        deferred.resolve(data)
      }, error => {
        deferred.reject(error)
      })

    const newCategory= deferred.promise

    return this.$q.when(newCategory)
  }
  getCategory (category) {
    const deferred = this.$q.defer()
    this.$http.get('/categories/' + category)
      .then(data => {
        deferred.resolve(data)
      }, error => {
        deferred.reject(error)
      })

    const fetchedCategory = deferred.promise

    return this.$q.when(fetchedCategory)
  }
  updateCategory (category) {
    const deferred = this.$q.defer()
    this.$http.put('/categories/' + category._id, category)
      .then(data => {
        deferred.resolve(data)
      }, error => {
        deferred.reject(error)
      })

    const updatedCategory= deferred.promise

    return this.$q.when(updatedCategory)
  }
  deleteCategory (category) {
    const deferred = this.$q.defer()
    this.$http.delete('/categories/' + category._id, category)
      .then(data => {
        deferred.resolve(data)
      }, error => {
        deferred.reject(error)
      })

    const deletedCategory= deferred.promise

    return this.$q.when(deletedCategory)
  }
}

export default CategoriesModel
