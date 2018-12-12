const { db } = require('../Schema/config')
const ArticleSchema = require('../Schema/article')
//通过 db 对象创建操作article数据库的模型对象  articles为数据库名
const Article = db.model('articles', ArticleSchema)

//通过 db 对象创建操作user数据库的模型对象  users为数据库名
const UserSchema = require('../Schema/user-S')
const User = db.model('users', UserSchema)

//返回文章发表页面
exports.addArticlePage = async(ctx)=>{
    await ctx.render("layui", {
        session: ctx.session
    })
}
//添加发表文章
exports.addArticle = async(ctx)=>{
    const data = ctx.request.body
    data.author = ctx.session.uid
    await new Promise((resolve, reject) =>{
        new Article(data).save((err, data)=>{
            if(err){ return reject(err)}
            resolve(data)
        })
    })
    .then( 
        async (data)=>{
        await ctx.render('back', {
            status: "发表成功",
            back: "即将跳转到首页",
            session: ctx.session
        }
    )})
    .catch( 
        async (err)=>{
        await ctx.render('back', {
            status: "发表失败",
            back: "文章标题已存在，请重新发表",
            session: ctx.session
        }
    )})
}
//返回文章列表
exports.getList = async(ctx) =>{
    let page = ctx.params.id || 1 //默认在第一页
        page--

    const maxNum = await Article.estimatedDocumentCount((err,data)=>err? console.log(err):data) //获取数据库所有的数据
    console.log(maxNum)
    let artList = await Article
        .find() //找到所有数据
        .sort("-created") //倒序排序
        .skip(3 * page) //跳过 20*页数 的数据
        .limit(3) //每页显示2条
        .populate({
            path: "author",
            select: "_id username headPhoto"
        })
        .then(data => data)
        .catch(err =>console.log(err))
    await ctx.render("nav", {
        // title:title,
        session: ctx.session,
        artList: artList,
        maxNum,
    })
}

//文章详情页
exports.articleDetails = async(ctx) =>{
    //获取动态路由内的 id
    const _id = ctx.params.id
    //找到article数据库的数据，并关联作者
    const article = await Article
    .findById(_id)
    .populate({
        path: 'author',
        select:'username',
    })
    .then(data => data)
    await ctx.render('articleDetails',{
        title:article.title,
        session:ctx.session,
        article:article,
    })
}