const Router = require('koa-router')
const pug = require('pug')
//拿到操作 user表 的逻辑对象
const user = require('../control/user-C')
//拿到操作 article表 的逻辑对象
const article = require('../control/article')
const router = new Router

//设计主页，打开浏览看到的页面
router.get("/", user.keepLogin, async(ctx)=>{
    await ctx.render("nav", {
        session: ctx.session
    })
})
router.get(/^\/user\/(?=regist|login)/, async(ctx)=>{
    const show = /login$/.test(ctx.path)
    await ctx.render("reg",{
        show
    })    
})
//用户登录  
router.post("/user/login",user.login)

// 用户退出
router.get("/user/logout", user.logout)

//用户注册
router.post("/user/regist", user.regist)

//轮播图
router.get("/user/autoPic", user.keepLogin, async (ctx) => {
    await ctx.render('autoPic', {
        session: ctx.session
    })
})

//发表评论
router.get("/user/publishArticle", user.keepLogin, async(ctx)=>{
    await ctx.render("publishArticle", {
        session: ctx.session
    })
})


async(ctx)=>{
    await ctx.render("publishArticle", {
        session: ctx.session
    })
}

module.exports = router