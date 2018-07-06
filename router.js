/* 路由模块 */

const express = require('express')
// 
const indexController = require('./controllers/index')
const userController = require('./controllers/user')
const topicController = require('./controllers/topic')
const commentController = require('./controllers/comment')
// 创建路由实例
const router = express.Router()

// 首页相关
router
  .get('/', indexController.showIndex)

// 用户相关
router
  .get('/login', userController.showLogin)
  .post('/login', userController.login)
  .get('/register', userController.showRegister)
  .post('/register', userController.register)
  .get('/logout', userController.logout)

// 文章相关
// router
//   .get('/topic/create', userController.showCreate)
//   .post('/topic/create', userController.create)
//   .get('/topic/:topicId', userController.showTopic)
//   .get('/topic/:topicId/edit', userController.showEdit)
//   .post('/topic/:topicId/edit', userController.edit)
//   .post('/topic/:topicId/del', userController.del)

// 评论相关

// 导出路由模块
module.exports = router