const pug = require('pug')
const Koa =require('koa')
const views = require('koa-views')
const body = require('koa-body')
const logger = require('koa-logger')
const {join} = require('path')
const router = require("./router/router.js")

const app = new Koa
app.use(logger())

app.use(body())
app.use(views(join(__dirname, 'views'), {
  extension: "pug"
}))

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000, ()=>{
    console.log('监听在3000端口')
  })