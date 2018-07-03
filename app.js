// 加载模块
const express = require('express')
// 创建服务器实例
const app = express()

// 加载路由模块
const router = require('./router')
// 挂载路由容器到app中,使路由生效
app.use(router)

// 监听3000端口
app.listen(3000, () => console.log(new Date()) )