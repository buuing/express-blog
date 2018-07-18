/* 文章控制器 */

const topic = require('../models/topic')
const marked = require('marked')

// 展示发表文章页
exports.showCreate = (req, res, next) => {
  topic.findCategory((err, topics) => {
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
  // 保存文章数据
  topic.save(data, (err, results) => {
    if (err) {
      return next(err)
    }
    // console.log(results.insertId)
    res.status(200).json({
      code: 10000,
      message: 'success',
      topicId: results.insertId
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

// 展示编辑页面
exports.showEdit = (req, res, next) => {
  topic.findCategory((err, topics) => {
    if (err) {
      return next(err)
    }
    // 获取文章id
    const topicId = req.params.topicId
    // 根据文章id查询内容
    topic.selectById(topicId, (err, results) => {
      if (err) {
        return next(err)
      }
      return res.render('topic/edit.html', {
        topics,
        topicId,
        results
      })
    })
  })
}

// 处理编辑请求
exports.edit = (req, res, next) => {
  // 获取文章id
  const topicId = req.params.topicId
  // 获取表单提交的数据
  const data = req.body
  // 根据文章id修改内容
  topic.editById(topicId, data, (err, results) => {
    if (err) {
      return next(err)
    }
    if (!results) {
      return res.status(200).json({
        code: 10007,
        message: '资源不存在'
      })
    }
    return res.status(200).json({
      code: 10000,
      message: 'success',
      topicId
    })
  })
}

// 处理删除请求
exports.del = (req, res, next) => {
  // 获取文章id
  const topicId = req.params.topicId
  // 执行删除
  topic.deleteById(topicId, (err, results) => {
    if (err) {
      return next(err)
    }
    return res.status(200).json({
      code: 10000,
      message: 'success'
    })
  })
}
