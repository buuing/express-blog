// 创建路由模块
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => res.send('index'))

// 导出路由模块
module.exports = router