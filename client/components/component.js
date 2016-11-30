import angular from 'angular'
import uiRouter from 'angular-ui-router'

import HomeComponent from './home/home.component'
import ProductsComponent from './products/product.component'
import SowProductComponent from './showProduct/showProduct.component'
import CategoriesComponent from './categories/categories.component'
import ShowCategoryComponent from './showCategory/showCategory.component'

const ComponentsModule = angular.module('components', [
  uiRouter
])
  .component('home', HomeComponent)
  .component('products', ProductsComponent)
  .component('showProduct', SowProductComponent)
  .component('categories', CategoriesComponent)
  .component('showCategory', ShowCategoryComponent)
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
      .state('categories', {
        url: '/categories',
        template: '<categories></categories>'
      })
      .state('showCategory', {
        url: '/categories/{catId}',
        template: '<show-category></show-category>'
      })

    $urlRouterProvider.otherwise('/')
  })

export default ComponentsModule
