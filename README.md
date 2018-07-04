
> git clone https://github.com/buuing/express-blog.git

<br>

## 项目介绍

使用express框架来构建node项目
> `npm i express`

```
// 加载模块
const express = require('express')
// 创建服务器实例
const app = express()
```

---

使用art-template模板引擎渲染页面和数据
> `npm i art-template express-art-template`

```
// 配置模板引擎
app.engine('html', require('express-art-template'))
```

---

使用router进行路由管理
```
// 创建路由实例
const router = express.Router()
// 挂载路由容器到app中,使路由生效
app.use(router)
```

---

使用body-parser处理表单POST请求
> `npm i body-parser`

```
// 配置 body-parser
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())
```

---

使用bootstrap和jquery渲染css样式布局和DOM操作
> `npm i bootstrap@3.3.7 jquery`

<br>

## 目录结构

- node_modules
- controller 控制器
- public 静态资源
- view 视图
- app.js 入口文件
- config.js 配置文件
- .gitignore 忽略文件
- package-lock.json
- README.MD 说明文件

<br>

## 路由设计

| 请求方法 | 请求路径 | 说明
| ------ | -------------------- | ----
| GET    | /                    | 渲染首页
| GET    | /login               | 渲染登录页
| POST   | /login               | 处理登录请求
| GET    | /register            | 渲染注册页
| POST   | /register            | 处理注册请求
| POST   | /logout              | 处理退出请求
| GET    | /topic/create        | 渲染文章发布页面
| POST   | /topic/create        | 处理文章发布请求
| GET    | /topic/:topicId      | 渲染文章页面
| GET    | /topic/:topicId/edit | 渲染文章修改页面
| POST   | /topic/:topicId/edit | 处理文章修改请求
| POST   | /topic/:topicId/del  | 处理文章删除请求

<br>

## 数据库设计

```
SET FOREIGN_KEY_CHECKS=0;
```

### 用户表

```
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `bio` varchar(100) DEFAULT '',
  `gender` bit(1) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `isDeleted` bit(1) DEFAULT b'0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8;
```

### 话题表

```
DROP TABLE IF EXISTS `topics`;
CREATE TABLE `topics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=172 DEFAULT CHARSET=utf8;
```

### 话题分类表

```
DROP TABLE IF EXISTS `topic_categories`;
CREATE TABLE `topic_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
```

### 评论表

```
DROP TABLE IF EXISTS `topic_comments`;
CREATE TABLE `topic_comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `userId` int(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

<br>

## Bug汇总

#### Bug NO.1

- 问题描述：

> 控制器中的`req.body`始终获取不到前端ajax发送过来的数据，页面中console.log打印表单数据有值，但客户端post过来之后，服务端却一直显示undefined

- 解决方案：

> 将挂载路由的代码`app.use(router)`放到所有的配置代码后面 -- 耗时4小时

---

<!-- #### Bug No.2

- 问题描述：

> ...

- 解决方案：

> ... -->

