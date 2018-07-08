/* 用户路由模块 */

const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')

router
  .get('/login', userController.showLogin)
  .post('/login', userController.login)
  .get('/register', userController.showRegister)
  .post('/register', userController.register)
  .get('/logout', userController.logout)

module.exports = router
