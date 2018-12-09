const { db } = require('../Schema/config')
const ArticleSchema = require('../Schema/article')
//通过 db 对象创建操作article数据库的模型对象  articles为数据库名
const Article = db.model('articles', ArticleSchema)

//通过 db 对象创建操作user数据库的模型对象  users为数据库名
const UserSchema = require('../Schema/user-S')
const User = db.model('users', UserSchema)

//返回文章发表页面
exports.addArticlePage = async(ctx)=>{
    // console.log(db)
    console.log(123)
    await ctx.render("publishArticle", {
        session: ctx.session
    })
}
//添加发表文章
exports.addArticle = async(ctx)=>{
    // console.log(db)
    console.log(123456)
    const data = ctx.request.body
    data.author = ctx.session.username
    await new Promise((resolve, reject) =>{
        new Article(data).save((err, data)=>{
            // console.log(data.author)
            if(err){
                console.log("adsd")
                return reject(err)}
            console.log("rty")
            console.log(data)
            resolve(data)
        })
    })
    .then( 
        async (data)=>{
        console.log("发表成功")
        await ctx.render('back', {
            status: "发表成功",
            back: "即将跳转到首页",
            session: ctx.session
        }
        // ctx.body = "发表成功"
    )})
    .catch( 
        async (err)=>{
        console.log("发表失败zzz")
        await ctx.render('back', {
            status: "发表失败",
            back: "文章标题已存在，请重新发表",
            session: ctx.session
        }
        // ctx.body = "发表失败"
    )})
}

//返回文章列表
exports.getList = async(ctx) =>{
    await ctx.render("nav", {
        // title:title,
        session: ctx.session
    })
}