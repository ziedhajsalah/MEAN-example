class NavBarController {
  constructor (authService, $scope, $rootScope) {
    'ngInject'

    this.authService = authService
    this.$scope = $scope
    this.$rootScope = $rootScope
    this.isAuthenticated = false
  }

  $onInit () {
    this.isAuthenticated = this.authService.isAuthenticated()
    this.currentUser = this.authService.currentUser()

    this.$scope.$on('onLogout', () => { this.isAuthenticated = false })
    this.$scope.$on('onLogin', () => { this.isAuthenticated = true })
  }

  logout () {
    this.authService.logout()
  }
}

export default NavBarController
