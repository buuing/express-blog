/* 用户控制器 */

const user = require('../models/user')
const md5 = require('blueimp-md5')

// 展示登录页面
exports.showLogin = (req, res, next) => {
  res.render('login.html')
}

// 处理登录请求
exports.login = (req, res, next) => {
  // 先获取客户端发送过来的数据
  const data = req.body
  // 判断邮箱是否存在
  user.isEmail(data.email, (err, ret) => {
    if (err) {
      return next(err)
    }
    if (!ret) {
      return res.status(200).json({
        code: 10003,
        message: '404 not found'
      })
    }
    if (md5(data.password) !== ret.password) {
      return res.status(200).json({
        code: 10004,
        message: '404 not found'
      })
    }
    // 使用session存储登录状态
    req.session.user = ret
    return res.status(200).json({
      code: 10000,
      message: 'success'
    })
  })
}

// 展示注册页面
exports.showRegister = (req, res, next) => {
  res.render('register.html')
}

// 处理注册请求
exports.register = (req, res, next) => {
  // 获取客户端发送过来的数据
  const data = req.body
  // 判断邮箱是否被占用
  user.isEmail(data.email, (err, ret) => {
    if (err) {
      return next(err)
    }
    if (ret) {
      return res.status(200).json({
        code: 10001,
        message: '该邮箱已被注册...'
      })
    }
    // 判断昵称是否被占用
    user.isNickname(data.nickname, (err, ret) => {
      if (err) {
        return next(err)
      }
      if (ret) {
        return res.status(200).json({
          code: 10002,
          message: '该昵称已被注册...'
        })
      }
      data.password = md5(data.password)
      // 插入数据
      user.save(data, (err, results) => {
        if (err) {
          return next(err)
        }
        res.status(200).json({
          code: 10000,
          message: 'success'
        })
      })
    })
  })
}

// 处理退出请求
exports.logout = (req, res, next) => {
  // 清除session信息
  delete req.session.user
  // 跳转到首页
  res.redirect('/')
}
