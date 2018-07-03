// 加载模块
const express = require('express')
// 创建服务器实例
const app = express()

// 请求 / 时
app.get('/', (req, res) => res.send('hello nodejs') )

// 监听3000端口
app.listen(3000, () => console.log(new Date()) )