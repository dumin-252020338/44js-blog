const { db } = require('../Schema/config')
const ArticleSchema = require('../Schema/article')

//通过 db 对象创建操作article数据库的模型对象  articles为数据库名
const Article = db.model('articles', ArticleSchema)

//
exports.publishArticle = async(ctx)=>{
    console.log(db)
    console.log(123)

    //发表文章 post 发过来的数据
    console.log("这是处理发表文章的中间件")
    const article = ctx.request.body
    console.log(article)
    const title = article.title //标题
    const keyword = article.keyword //关键词
    const interest = article.interest //文章类型
    const desc = article.desc //文章内容
    
    await new Promise((resolve, reject) =>{
        Article.find({title: title}, (err, data)=>{
            if(err) return reject(err)
            if(data.length === 0 ){
                return reject('文章不存在')
            }
            //把用户传过来的密码，加密后跟数据库的比对
            // console.log(data[0])
            // if(data[0].password === crypto(password)){
            //     return resolve(data)
            // }
            resolve("")
        })
    })
    .then(async (data) =>{
        // if(!data){
            await ctx.render('nav', {
                // status: "密码错误，请重新登录",
                // back: "即将返回登录页面"
            })
        // }else{
        //     ctx.cookies.set('username', username, {
        //         domain: 'http://localhost:3000',
        //         path: '/',
        //         maxAge: 1000*60*60,
        //         httpOnly: false,//前端浏览器是否能访问到
        //         overwrite: false,
        //         signed: true
        //     })

        //     ctx.cookies.set('uid', data[0]._id, {
        //         domain: 'http://localhost:3000',
        //         path: '/',
        //         maxAge: 1000*60*60,
        //         httpOnly: false,//前端浏览器是否能访问到
        //         overwrite: false,
        //         signed: true
        //     })
            
        //     ctx.session = {
        //         username: username,
        //         uid: data[0]._id
        //     }
        //     await ctx.render('success', {
        //         status: "登录成功",
        //         back: "即将跳转到发表文章页",
        //         session: ctx.session
        //     })
        // }
    })
    .catch(async(err) =>{
        await ctx.render('fail', {
            status: "密码错误，请重新登录",
            back: "即将返回登录页面"
        })
    })    
}