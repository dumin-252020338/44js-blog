const { db } = require('../Schema/config')
const UserSchema = require('../Schema/user-S')
//导入加密模块
const crypto = require('../util/tool')
//通过 db 对象创建操作user数据库的模型对象  users为数据库名
const User = db.model('users', UserSchema)

//用户注册
exports.regist = async (ctx) =>{
    console.log("这是处理用户注册的中间件")
    //用户注册 post发过来的数据
    const user = ctx.request.body
    console.log(user)
    const username = user.username
    const phone = user.phone
    const password = user.password 
    const passwords = user.passwords 
    const email = user.email 
    
    let status =""
    let back =""
    await new Promise((resolve, reject) =>{
        //去 users 数据库查询
        User.find({username: username}, (err, data)=>{
            if(err) return reject(err)
            //数据库查询没有出错的话，还有可能没有数据
            if(data.length !== 0 ){
                //查询数据库 --》用户名已存在
                return resolve('')
            }
            //用户名不存在 需要存到数据库
            const _user = new User({
                username,
                password: crypto(password)
            })

            _user.save((err, data) => {
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
             })
        })
    })
    .then(async (data) =>{
        if(data){
            await ctx.render('success', {
                status: "注册成功",                
                back: "即将跳转登录页面"
            })
        }else{
            await ctx.render('fail', {
                status: "用户名已存在,请重新注册",
                back: "即将返回注册页面"
            })
        }
    })
    .catch(async(err) =>{
        await ctx.render('fail',{
            status: "用户名已存在,请重新注册",
            back: "即将返回注册页面"
        })
    })
}

//用户登陆
exports.login = async (ctx) =>{
    //用户登陆 post 发过来的数据
    const user = ctx.request.body
    console.log(user)
    const username = user.username
    const password = user.password 
    
    await new Promise((resolve, reject) =>{
        User.find({username: username}, (err, data)=>{
            if(err) return reject(err)
            if(data.length === 0 ){
                return reject('用户名不存在')
            }
            //把用户传过来的密码，加密后跟数据库的比对
            console.log(data[0])
            if(data[0].password === crypto(password)){
                return resolve(data)
            }
            resolve("")
        })
    })
    .then(async (data) =>{
        if(!data){
            await ctx.render('login-again', {
                status: "密码错误，请重新登录",
                back: "即将返回登录页面"
            })
        }else{
            ctx.cookies.set('username', username, {
                domain: 'http://106.14.118.126:6868',
                path: '/',
                maxAge: 1000*60*60,
                httpOnly: false,//前端浏览器是否能访问到
                overwrite: false,
                signed: true
            })

            ctx.cookies.set('uid', data[0]._id, {
                domain: 'http://106.14.118.126:6868',
                path: '/',
                maxAge: 1000*60*60,
                httpOnly: false,//前端浏览器是否能访问到
                overwrite: false,
                signed: true
            })
            
            ctx.session = {
                username: username,
                uid: data[0]._id
            }
            await ctx.render('success', {
                status: "登录成功",
                back: "即将跳转发表评论",
                session: ctx.session
            })
        }
    })
    .catch(async(err) =>{
        await ctx.render('login-again', {
            status: "密码错误，请重新登录",
            back: "即将返回登录页面"
        })
    })
}

//保持用户登录
exports.keepLogin = async (ctx, next) => {
    if (ctx.session.isNew) {//判断session是否为新值 ，为新值则用户没有登陆
        // user has not logged in
        if(ctx.cookies.get('username')){
            ctx.session = {
               username : ctx.cookies.get('username'),
               uid : ctx.cookies.get('uid')
        }
      } else {//session值不是新值，则用户已经登陆过
        // user has already logged in
      }
    }
    await next()
}

//用户退出的中间件
exports.logout = async (ctx) =>{
    ctx.session = null
    ctx.cookies.set('username', null, {
        maxAge: 0
    })
    ctx.cookies.set('uid', null, {
        maxAge: 0
    })
    ctx.redirect('/')
    
}

//发表评论
exports.article = async (ctx) =>{
    await ctx.render('article', {
        session: ctx.session
    })
}

//轮播图
exports.autoPic = async (ctx) => {
    // const imgSrc = document.querySelectorAll("#wrap img")
    // console.log(imgSrc)
    // for(let i=1; len<imgSrc.length, i<len; i++){
    //     imgSrc.src = "../js-css/img/0 "+ i +".jpg"
    // }
    await ctx.render('autoPic'),{
        // src: imgSrc
    }
}

//文章
exports.articlePug = async(ctx) =>{
    await ctx.render('layuiArticle'),{
        // src: imgSrc
    }
}