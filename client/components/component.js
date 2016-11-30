import angular from 'angular'
import uiRouter from 'angular-ui-router'

import HomeComponent from './home/home.component'
import ProductsComponent from './products/product.component'
import SowProductComponent from './showProduct/showProduct.component'

const ComponentsModule = angular.module('components', [
  uiRouter
])
  .component('home', HomeComponent)
  .component('products', ProductsComponent)
  .component('showProduct', SowProductComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    'ngInject'

    $stateProvider
      .state('home', {
        url: '/',
        // component: 'home'
        template: '<home></home>'
      })
      .state('products', {
        url: '/products',
        // component: 'products'
        template: '<products></products>'
      })
      .state('showProduct', {
        url: '/products/{productId}',
        template: '<show-product></show-product>'
      })

    $urlRouterProvider.otherwise('/')
  })

export default ComponentsModule
