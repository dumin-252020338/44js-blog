const { db } = require('../Schema/config')
const ArticleSchema = require('../Schema/article')

//通过 db 对象创建操作article数据库的模型对象  articles为数据库名
const Article = db.model('articles', ArticleSchema)

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
            if(err){return reject(err)}
            resolve(data)
        })
    })
    .then((data)=>{
        console.log("发表成功")
        ctx.body = "发表成功"
    })
    .catch((err)=>{
        console.log("发表失败")
        ctx.body = "发表失败"
    })
}