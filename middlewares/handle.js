/* handle中间件 */

const topic = require('../models/topic')

// 错误处理中间件
exports.handleErr = (err, req, res, next) => {
  res.status(500).send({
    error: err.message
  })
}

// 判断是否登录
exports.isLogin = (req, res, next) => {
  if (!req.session.user) {
    // 请求类型同步/异步
    const reqType = req.get('X-Requested-With')
    // 如果为异步则
    if (reqType && reqType === 'XMLHttpRequest') {
      return res.sendStatus(401)
    }
    // 否则就是同步请求
    return res.redirect('/login')
  }
  next()
}

// 校验用户是否有修改删除权限
exports.checkAuth = (req, res, next) => {
  // 使用解构赋值拿到文章id
  const {topicId} = req.params
  // 处理逻辑
  topic.selectById(topicId, (err, result) => {
    if (err) {
      return next(err)
    }
    if (!result) {
      return res.status(200).json({
        code: 10007,
        message: '该资源不存在或已被删除'
      })
    }
    if (result.userId !== req.session.user.id) {
      return res.status(200).json({
        code: 10008,
        message: '您对该文章没有操作权限, 请联系管理员...'
      })
    }
    // 校验通过则继续执行后面的逻辑
    next()
  })
}
