/* 用户路由模块 */

const express = require('express')
const router = express.Router()

const commentController = require('../controllers/comment')

router
  // 获取当前文章中所有评论
  .get('/:topicId/comment', commentController.getComment)
  // 发表评论
  .post('/:topicId/comment', commentController.postComment)
  // 获取编辑评论内容
  .get('/:topicId/comment/:commentId/edit', commentController.showEdit)
  // 处理编辑请求
  .post('/:topicId/comment/:commentId/edit', commentController.edit)
  // 处理删除请求
  .post('/:topicId/comment/:commentId/del', commentController.del)

module.exports = router
