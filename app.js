// 加载模块
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const moment = require('moment')
// 自定义处理中间件
const handle = require('./middlewares/handle')

// 创建服务器实例
const app = express()

// 加载路由模块
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const topicRouter = require('./routes/topic')

// 开放静态资源
app.use('/node_modules', express.static('./node_modules/'))
app.use('/public', express.static('./public/'))

// 配置 body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// 配置模板引擎
app.engine('html', require('express-art-template'))

// 配置session开启会话
app.use(session({
  // 自定义加密字符串
  secret: 'buuing.com',
  resave: false,
  // 使用session才会配发秘钥
  saveUninitialized: false
}))

// 配置全局模板对象
app.use((req, res, next) => {
  app.locals.user = req.session.user
  next()
})

// 打印路由
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

// 挂载路由
app.use(indexRouter)
app.use(userRouter)
app.use('/topic', handle.isLogin, topicRouter)

// 配置全局错误处理中间件
app.use(handle.handleErr)

// 配置404中间件
app.use((req, res) => {
  res.render('404.html')
})

// 监听3000端口
app.listen(3000, () => console.log(moment().format('YYYY-MM-DD HH:mm:ss')))