import angular from 'angular'

import ProductsModel from './products.model'

const ModelsModule = angular.module('models', [])
  .service('ProductsModel', ProductsModel)

export default ModelsModule
