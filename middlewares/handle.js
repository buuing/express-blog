/* handle中间件 */

// 错误处理中间件
exports.handleErr = (err, req, res, next) => {
  res.status(500).send({
    error: err.message
  })
}

// 判断是否登录
exports.isLogin = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login')
  }
  next()
}
