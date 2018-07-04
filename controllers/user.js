/* 用户控制器 */

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
  console.log(req.body)
  res.status(200).json({code: 200})
}

// 处理退出请求
exports.logout = (req, res) => {
  res.send('logout')
}
