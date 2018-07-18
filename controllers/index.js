/* 首页控制器 */

const index = require('../models/index')
const {findCategory} = require('../models/topic')

// 展示首页
exports.showIndex = (req, res, next) => {
  const {tab} = req.query
  findCategory((err, category) => {
    if (err) {
      return next(err)
    }
    if (!tab) {
      console.log('/')
      index.findAll((err, indexData) => {
        if (err) {
          return next(err)
        }
        res.render('index.html', {
          indexData,
          category
        })
      })
    } else {
      index.findByTab(tab, (err, indexData) => {
        console.log('1')
        if (err) {
          return next(err)
        }
        res.render('index.html', {
          indexData,
          category,
          tab
        })
      })
    }
  })
}
