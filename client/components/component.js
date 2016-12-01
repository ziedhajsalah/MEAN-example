import angular from 'angular'

import HomeComponent from './home/home.component'
import ProductsComponent from './products/product.component'
import SowProductComponent from './showProduct/showProduct.component'
import CategoriesComponent from './categories/categories.component'
import ShowCategoryComponent from './showCategory/showCategory.component'
import NavBarComponent from './navbar/navbar.component'
import SideBarComponent from './sidebar/sidebar.component'

const ComponentsModule = angular.module('components', [])
  .component('home', HomeComponent)
  .component('products', ProductsComponent)
  .component('showProduct', SowProductComponent)
  .component('categories', CategoriesComponent)
  .component('showCategory', ShowCategoryComponent)
  .component('navBar', NavBarComponent)
  .component('sideBar', SideBarComponent)

export default ComponentsModule
