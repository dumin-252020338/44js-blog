const { db } = require('../Schema/config')
const ArticleSchema = require('../Schema/article')
//通过 db 对象创建操作article数据库的模型对象  articles为数据库名
const Article = db.model('articles', ArticleSchema)

//通过 db 对象创建操作user数据库的模型对象  users为数据库名
const UserSchema = require('../Schema/user-S')
const User = db.model('users', UserSchema)

//返回文章发表页面
exports.addArticlePage = async(ctx)=>{
    console.log(1)
    await ctx.render("publishArticle", {
        session: ctx.session
    })
}
//添加发表文章
exports.addArticle = async(ctx)=>{
    console.log("添加发表文章")
    const data = ctx.request.body
    console.log(data)
    data.author = ctx.session.uid
    await new Promise((resolve, reject) =>{
        new Article(data).save((err, data)=>{
            // console.log(data.author)
            if(err){ return reject(err)}
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
    )})
    .catch( 
        async (err)=>{
        console.log("发表失败")
        await ctx.render('back', {
            status: "发表失败",
            back: "文章标题已存在，请重新发表",
            session: ctx.session
        }
    )})
}
//返回文章列表
exports.getList = async(ctx) =>{
    console.log("000")
    let page = ctx.params.id || 1 //默认在第一页
        page--
    let artList = await Article
        .find() //找到所有数据
        .sort("-created") //倒序排序
        .skip(2 * page) //跳过 20*页数 的数据
        .limit(2) //每页显示2条
        .populate({
            path: "author",
            select: "_id username headPhoto"
        })
        .then(data => data)
        .catch(err =>console.log(err))
    console.log(artList)
    await ctx.render("nav", {
        // title:title,
        session: ctx.session,
        artList: artList,
    })
}