class NavBarController {
  constructor (authService, $scope) {
    'ngInject'

    this.authService = authService
    this.$scope = $scope
    this.isAuthenticated = false
  }

  $onInit () {
    this.isAuthenticated = this.authService.isAuthenticated()
    this.$scope.$on('onLogout', () => { this.isAuthenticated = false })
    this.$scope.$on('onLogin', () => { this.isAuthenticated = true })
  }
  logout () {
    this.authService.logout()
  }
}

export default NavBarController
