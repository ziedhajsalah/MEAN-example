class AuthService {
  constructor ($http, $q, $window) {
    'ngInject'

    this.$http = $http
    this.$q = $q
    this.$window = $window
  }

  saveToken (token) {
    this.$window.localStorage[ 'auth-token' ] = token
  }

  getToken () {
    return this.$window.localStorage[ 'auth-token' ]
  }

  logout () {
    this.$window.localStorage.removeItem('auth-token')
  }

  isAuthenticated () {
    const token = this.getToken()

    if (token) {
      let payload = token.split('.')[ 1 ] // extract the payload from the token
      payload = this.$window.atob(payload) // decode the payload
      payload = JSON.parse(payload) // convert string decoded to object

      return payload.exp > Date.now()
    }

    return false
  }

  currentUser () {
    if (this.isAuthenticated()) {
      let payload = this.getToken().split('.')[ 1 ]
      payload = this.$window.atob(payload)
      payload = JSON.parse(payload)

      return {
        email: payload.email
      }
    }
  }

  login (user) {
    return this.$http.post('/auth/api/login', user)
      .success(data => {
        this.saveToken(data.token)
      })
  }

  register (user) {
    return this.$http.post('/auth/api/register', user)
      .success(data => {
        this.saveToken(data.token)
      })
  }
}

export default AuthService
