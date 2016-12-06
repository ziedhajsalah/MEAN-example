class LoginController {
  constructor (authService, $state) {
    'ngInject'

    this.authService = authService
    this.$state = $state
    this.credentials = {
      email: '',
      password: ''
    }
  }
  login () {
    this.authService
      .login(this.credentials)
      .error(err => {
        console.log(err)
      })
      .then(() => {
        this.$state.go('home')
      })
  }
}

export default LoginController
