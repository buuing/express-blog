/* 用户路由模块 */

const express = require('express')
const router = express.Router()

const topicController = require('../controllers/topic')
const {isLogin, checkAuth} = require('../middlewares/handle')

router
  .get('/create', isLogin, topicController.showCreate)
  .post('/create', isLogin, topicController.create)
  .get('/:topicId', topicController.showTopic)
  .get('/:topicId/edit', isLogin, topicController.showEdit)
  .post('/:topicId/edit', isLogin, checkAuth, topicController.edit)
  .post('/:topicId/del', isLogin, checkAuth, topicController.del)

module.exports = router
