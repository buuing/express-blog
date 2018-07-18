// 加载mysql模块
const mysql = require('mysql')
const {dbConfig} = require('../config')

// 创建连接池
const pool = mysql.createPool(dbConfig)

// 封装私有的执行sql方法
exports.query = (...args) => {
  const callback = args.pop()
  // 从连接池中获取连接
  pool.getConnection((err, connection) => {
    if (err) {
      return callback(err, undefined)
    }
    // 执行sql语句
    connection.query(...args, (err, results) => {
      // 释放连接
      connection.release()
      if (err) {
        return callback(err, undefined)
      }
      callback(null, results)
    })
  })
}
