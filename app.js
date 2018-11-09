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
app.keys = ['some secret hurr'];//cookie的签名
const config = {
  key: 'dumin-252020338',
  maxAge: 60*60*1000,//cookie的过期时间
  overwrite: true,//是否可以被写入，can overwrite or not (default true)
  httpOnly: true,//true表示只有服务器端可以获取cookie
  signed: true,//默认 签名
  rolling: false,//在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false） 【需要修改】
  renew: false, //(boolean) renew session when session is nearly expired      【需要修改】 
}
app.use(session(config, app));
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