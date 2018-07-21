/* 评论控制器 */

const Comment = require('../models/comment')

// 获取当前文章中所有评论
exports.getComment = (req, res, next) => {
  res.send('getComment')
}

// 发表评论
exports.postComment = (req, res, next) => {
  // 获取用户id和文章id还有评论内容
  const userId = req.session.user.id
  const {topicId} = req.params
  const {content} = req.body
  // new对象然后调方法
  new Comment({
    userId,
    topicId,
    content
  }).insert((err, results) => {
    if (err) {
      return next(err)
    }
    res.status(200).json({
      code: 10000,
      message: 'success'
    })
  })
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
