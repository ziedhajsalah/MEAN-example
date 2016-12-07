const express = require('express')
const router = express.Router()

const AuthController = require('./controllers/auth')

router.get('/register', AuthController.getRegisterPage)

router.get('/login', AuthController.getLoginPage)

router.post('/register', AuthController.register)

router.post('/login', AuthController.login)

router.get('/logout', AuthController.logout)

router.get('/facebook', AuthController.facebookLogin)

router.get('/facebook/callback', AuthController.facebookLoginCallback)

/* API routes */

router.post('/api/status', AuthController.isAuth)
router.post('/api/register', AuthController.apiRegister)
router.post('/api/login', AuthController.apiLogin)

module.exports = router
