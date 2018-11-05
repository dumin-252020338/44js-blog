const pug = require('pug')
const Koa =require('koa')
const views = require('koa-views')
const body = require('koa-body')
const static = require('koa-static')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const {join} = require('path')
const router = require("./router/router.js")
//生成koa实例
const app = new Koa

//注册日志模块
app.use(logger())

//配置koa-body 处理post请求的数据
app.use(body())
app.use(cors())

//配置静态资源目录
app.use(static(join(__dirname, "js-css")))

//配置视图模板
app.use(views(join(__dirname, 'views'), {
  extension: "pug"  //设置为pug模板
}))




//注册路由信息
app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000, ()=>{
    console.log('监听在3000端口')
  })