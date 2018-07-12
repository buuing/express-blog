/* 文章控制器 */

const topic = require('../models/topic')
const marked = require('marked')

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
    console.log(results)
    res.status(200).json({
      code: 10000,
      message: 'success'
    })
  })
}

// 展示文章页面
exports.showTopic = (req, res, next) => {
  // req.params可以获取到路由id参数
  const topicId = req.params.topicId
  // 根据id拿到数据
  topic.selectById(topicId, (err, topic) => {
    if (err) {
      return next(err)
    }
    topic && ( topic.content = marked(topic.content) )

    res.render('topic/show.html', {
      topic
    })
  })
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
