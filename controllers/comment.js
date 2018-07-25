/* 评论控制器 */

const Comment = require('../models/comment')

// 获取当前文章中所有评论
exports.getComment = (req, res, next) => {
  // 获取查询字符串数据
  const {page = 1, limit = 5} = req.query
  // console.log(page, limit)
  // 获取文章id
  const {topicId} = req.params
  // 调用静态方法
  Comment.findByTopicId({topicId, page, limit}, (err, comments) => {
    if (err) {
      return next(err)
    }
    Comment.countById(topicId, (err, count) => {
      if (err) {
        return next(err)
      }
      console.log(count)
      return res.status(200).json({
        code: 10000,
        comments,
        count
      })
    })
  })
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
