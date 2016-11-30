import angular from 'angular'

import ProductsModel from './products.model'
import CategoriesModel from './categories.model'

const ModelsModule = angular.module('models', [])
  .service('ProductsModel', ProductsModel)
  .service('CategoriesModel', CategoriesModel)

export default ModelsModule
