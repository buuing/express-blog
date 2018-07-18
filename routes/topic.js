/* 用户路由模块 */

const express = require('express')
const router = express.Router()

const topicController = require('../controllers/topic')
const {checkAuth} = require('../middlewares/handle')

router
  .get('/create', topicController.showCreate)
  .post('/create', topicController.create)
  .get('/:topicId', topicController.showTopic)
  .get('/:topicId/edit', topicController.showEdit)
  .post('/:topicId/edit', checkAuth, topicController.edit)
  .post('/:topicId/del', checkAuth, topicController.del)

module.exports = router
