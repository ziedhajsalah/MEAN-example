import angular from 'angular'

import ProductsModel from './products.model'
import CategoriesModel from './categories.model'
import AuthService from './auth.service'

const ModelsModule = angular.module('models', [])
  .service('ProductsModel', ProductsModel)
  .service('CategoriesModel', CategoriesModel)
  .service('authService', AuthService)

export default ModelsModule
