/* 用户控制器 */

const user = require('../models/user')

// 展示登录页面
exports.showLogin = (req, res) => {
  res.render('login.html')
}

// 处理登录请求
exports.login = (req, res) => {
  res.send('register')
}

// 展示注册页面
exports.showRegister = (req, res) => {
  res.render('register.html')
}

// 处理注册请求
exports.register = (req, res) => {
  // 获取客户端发送过来的数据
  const data = req.body
  // 判断邮箱是否被占用
  user.isEmail(data.email, (err, ret) => {
    if (err) {
      return res.status(500).json({
        error: err.message
      })
    }
    if (ret) {
      return res.status(200).json({
        code: 10001,
        message: '该邮箱已被注册...'
      })
    }
    res.status(200).json({
      code: 10000,
      message: '该邮箱可以使用...'
    })
  })
}

// 处理退出请求
exports.logout = (req, res) => {
  res.send('logout')
}
