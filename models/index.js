/* 首页模型 */

const {query} = require('../tools/db-pool')

// 查询topics中所有的数据
exports.findAll = (callback) => {
  const sql = 'SELECT * FROM `topics` ORDER BY `createdAt` DESC LIMIT 0,10'
  query(sql, callback)
}

// 根据categoryId查询数据
exports.findByTab = (tab, callback) => {
  const sql = 'SELECT * FROM `topics` WHERE `categoryId` = ? ORDER BY `createdAt` DESC'
  query(sql, [tab], callback)
}
