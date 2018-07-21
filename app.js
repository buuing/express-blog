// 加载模块
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const moment = require('moment')
const responseTime = require('response-time')
const morgan = require('morgan')
const compression = require('compression')
const config = require('./config')

// 连接到数据库存储登录状态
const sessionStore = new MySQLStore(config.dbConfig)

// 创建服务器实例
const app = express()

// 压缩所有请求响应
app.use(compression())

// 加载路由模块
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const topicRouter = require('./routes/topic')
const commentRouter = require('./routes/comment')
// 配置response-time
app.use(responseTime())

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
  // 持久化存储
  store: sessionStore,
  // 配置cookie
  cookie: {
    // 过期时间(单位为毫秒)
    maxAge: 1000 * 60 * 60 * 12 * 1
  },
  resave: false,
  // 使用session才会配发秘钥
  saveUninitialized: false
}))

// 配置全局模板对象
app.use((req, res, next) => {
  app.locals.user = req.session.user
  next()
})

// 打印请求日志
app.use(morgan('tiny'))

// 挂载路由(路由中间件)
app.use(indexRouter)
app.use(userRouter)
app.use('/topic', topicRouter)
app.use('/topic', commentRouter)

// 配置全局错误处理(err中间件)
app.use((err, req, res, next) => {
  res.status(500).send({
    error: err.message
  })
})

// 配置404页面(404中间件)
app.use((req, res) => {
  res.render('404.html')
})

// 监听3000端口
app.listen(8080, () => console.log(moment().format('YYYY-MM-DD HH:mm:ss')))
