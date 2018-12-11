const Router = require('koa-router')
const pug = require('pug')
//拿到操作 user表 的逻辑对象
const user = require('../control/user-C')
//拿到操作 article表 的逻辑对象
const article = require('../control/article')
const router = new Router

//设计主页，打开浏览看到的页面
router.get("/", user.keepLogin, article.getList)
router.get(/^\/user\/(?=regist|login)/, async(ctx)=>{
    const show = /login$/.test(ctx.path)
    await ctx.render("reg",{
        show
    })    
})
//用户登录 路由
router.post("/user/login",user.login)

// 用户退出 路由
router.get("/user/logout", user.logout)

//用户注册 路由
router.post("/user/regist", user.regist)

//轮播图 路由
router.get("/user/autoPic", user.keepLogin, async (ctx) => {
    await ctx.render('autoPic', {
        session: ctx.session
    })
})

//添加文章发表页面 路由
router.get("/user/addArticlePage", user.keepLogin, article.addArticlePage)
//文章的发表 路由
router.post("/user/addArticlePage", user.keepLogin, article.addArticle)
//文章分页路由
router.get("/page/:id", user.keepLogin, article.getList)


module.exports = router