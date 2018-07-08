/* 首页路由模块 */

const express = require('express')
const router = express.Router()

const indexController = require('../controllers/index')

router
  .get('/', indexController.showIndex)

module.exports = router
