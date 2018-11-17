const pug = require('pug')
const Koa =require('koa')
const views = require('koa-views')
const body = require('koa-body')
const static = require('koa-static')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const session = require('koa-session')
const {join} = require('path')
const router = require("./router/router.js")
//生成koa实例
const app = new Koa

//注册日志模块
app.use(logger())

//配置session模块
app.keys = ['dumin-252020338']
const config = {
  key: 'koa:session', 
  maxAge: 1000*60*60,
  overwrite: true, 
  httpOnly: true, 
  signed: true, 
  rolling: false, 
  renew: false, 
}
app.use(session(config, app))

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
  .listen(6868, ()=>{
    console.log('监听在6868端口')
  })