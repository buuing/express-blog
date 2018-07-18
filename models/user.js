/* 用户模型 */

const {query} = require('../tools/db-pool')

// 判断邮箱是否存在
exports.isEmail = (email, callback) => {
  let sql = 'SELECT * FROM `users` WHERE `email`=?'
  query(sql, [email], (err, results) => {
    if (err) {
      return callback(err, undefined)
    }
    callback(null, results[0])
  })
}

// 判断用户名是否存在
exports.isNickname = (nickname, callback) => {
  let sql = 'SELECT * FROM `users` WHERE `nickname`=?'
  query(sql, [nickname], (err, results) => {
    if (err) {
      return callback(err, undefined)
    }
    callback(null, results[0])
  })
}

// 保存注册信息
exports.save = (user, callback) => {
  user.createdAt = null
  let sql = 'INSERT INTO `users` SET ?'
  query(sql, [user], (err, results) => {
    if (err) {
      return callback(err, undefined)
    }
    callback(null, results)
  })
}
