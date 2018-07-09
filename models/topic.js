/* 文章模型 */

const {query} = require('../tools/db-pool')

// 查询文章分类
exports.findAll = (callback) => {
  const sql = 'SELECT * FROM `topic_categories`'
  query(sql, callback)
}

// 保存数据
exports.save = (data, callback) => {
  const sql = 'INSERT INTO `topics` SET ?'
  query(sql, data, callback)
}