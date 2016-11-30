import 'bootstrap-css-only'
import angular from 'angular'
// import uiRouter from 'angular-ui-router'

import appComponent from './app.component'
import ComponentsModule from './components/component'
import ModelsModule from './models/models'

angular.module('app', [
  // uiRouter,
  ComponentsModule.name,
  ModelsModule.name
])
  .component('app', appComponent)
  // .config(($stateProvider, $urlRouterProvider) => {
  //   'ngInject'
  //
  //   $stateProvider
  //     .state('home', {
  //       url: '/',
  //       component: 'home'
  //     })
  //     .state('products', {
  //       url: '/products',
  //       component: 'products'
  //     })
  //
  //   $urlRouterProvider.otherwise('/')
  // })
