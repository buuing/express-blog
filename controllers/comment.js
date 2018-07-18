/* 评论控制器 */

// const comment = require('../models/comment')

// 获取当前文章中所有评论
exports.getComment = (req, res, next) => {
  res.send('getComment')
}

// 发表评论
exports.postComment = (req, res, next) => {
  res.send('postComment')
}

// 获取编辑评论内容
exports.showEdit = (req, res, next) => {
  res.send('showEdit')
}

// 处理编辑请求
exports.edit = (req, res, next) => {
  res.send('edit')
}

// 处理删除请求
exports.del = (req, res, next) => {
  res.send('del')
}
