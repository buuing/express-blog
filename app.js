// 加载模块
const express = require('express')
// 创建服务器实例
const app = express()

// 加载路由模块
const router = require('./router')
// 挂载路由容器到app中,使路由生效
app.use(router)

// 开放静态资源
app.use('/node_modules', express.static('./node_modules/'))
app.use('/public', express.static('./public/'))

// 配置模板引擎
app.engine('html', require('express-art-template'))

// 监听3000端口
app.listen(3000, () => console.log(new Date()) )