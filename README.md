
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

> express

## 数据库设计

### 用户表
### 话题表
### 话题分类表
### 评论表

## 路由设计

请求方法  | 请求路径        |  说明 
:------  | :-----         | :-----
GET      | /              | 渲染首页
GET      | /login         | 渲染登录页
POST     | /login         | 处理登录请求
GET      | /register      | 渲染注册页
POST     | /register      | 处理注册请求
POST     | /logout        | 处理退出请求
GET      | /register      | 渲染注册页
POST     | /topic/create  | 处理退出请求


