var express = require('express')
var router = express.Router()

var AuthController = require('./controllers/auth')

router.get('/register', AuthController.getRegisterPage)

router.get('/login', AuthController.getLoginPage)

router.post('/register', AuthController.register)

router.post('/login', AuthController.login)

router.get('/logout', AuthController.logout)

module.exports = router
