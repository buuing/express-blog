/* 文章控制器 */

const topic = require('../models/topic')

// 展示发表文章页
exports.showCreate = (req, res, next) => {
  topic.findAll((err, topics) => {
    if (err) {
      return next(err)
    }
    // console.log(topics)
    res.render('topic/create.html', {
      topics
    })
  })
}

// 处理文章发布请求
exports.create = (req, res, next) => {
  // 文章数据
  const data = {
    ...req.body,
    createdAt: null,
    userId: req.session.user.id
  }
  console.log(data)
  // 保存文章数据
  topic.save(data, (err, results) => {
    if (err) {
      return next(err)
    }
    res.status(200).json({
      code: 10000,
      message: 'success'
    })
  })
}

exports.showTopic = (req, res, next) => {
  res.send('showTopic')
}

exports.showEdit = (req, res, next) => {
  res.send('showEdit')
}

exports.edit = (req, res, next) => {
  res.send('edit')
}

exports.del = (req, res, next) => {
  res.send('del')
}
