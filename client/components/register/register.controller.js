class RegisterController {
  constructor (authService, $state) {
    'ngInject'

    this.authService = authService
    this.$state = $state
    this.credentials = {
      email: '',
      password: ''
    }
  }

  register () {
    this.authService
      .register(this.credentials)
      .error(err => {
        console.log(err)
      })
      .then(() => {
        this.$state.go('home')
      })
  }
}

export default RegisterController
