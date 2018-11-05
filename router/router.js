const Router = require('koa-router')
const pug = require('pug')
//拿到操作 user表 的逻辑对象
const user = require('../control/user-C')
const router = new Router

//设计主页，打开浏览看到的页面
router.get("/", async(ctx)=>{
    url = 'http://localhost:3000'
    // console.log('1')
    await ctx.render("nav")
})
router.get(/^\/user\/(?=regist|login)/, async(ctx)=>{
    const show = /login$/.test(ctx.path)
    // console.log(show)
    // console.log('2')
    await ctx.render("reg",{
        show
    })    
})
//用户登录  
router.post("/user/login", user.login)

//用户已登录
// router.post("/user/login/in", async(ctx)=>{
    
//     await ctx.render('03')    
// })

//用户注册
router.post("/user/regist", user.regist)

module.exports = router