/* 评论模型 */

const {query} = require('../tools/db-pool')
const moment = require('moment')
const now = moment().format('YYYY-MM-DD HH:mm:ss')

// 评论类
module.exports = class Comment {
  // 当new的时候, 会自动调用构造函数
  constructor ({content, userId, topicId, createdAt = now}) {
    this.content = content
    this.userId = userId
    this.topicId = topicId
    this.createdAt = createdAt
  }

  // 实例方法, insert存储评论
  insert (callback) {
    const sql = 'INSERT INTO `topic_comments` SET ?'
    query(sql, this, callback)
  }

  // 静态方法, 根据文章id查询所有评论
  static findByTopicId (topicId, callback) {
    const sql = 'SELECT * FROM `topic_comments` WHERE `topicId` = ?'
    query(sql, [topicId], (err, results) => {
      if (err) {
        return callback(err, undefined)
      }
      return callback(null, results)
    })
  }

  // 静态方法, 根据id进行编辑
  static editById (commentId, comment, callback) {
    const sql = 'UPDATE `topic_comments` SET `content` = ? WHERE `id` = ?'
    query(sql, [comment.content, commentId], callback)
  }

  // 静态方法, 根据id进行删除
  static delById (commentId, callback) {
    const sql = 'DELETE FROM `topic_comments` WHERE `id` = ?'
    query(sql, [commentId], callback)
  }
}
