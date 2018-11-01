const { db } = require('../Schema/config')
const UserSchema = require('../Schema/user-S')
//导入加密模块
const crypto = require('../util/tool')
//通过 db 对象创建操作user数据库的模型对象  users为数据库名
const User = db.model('users', UserSchema)
//用户注册
exports.regist = async (ctx) =>{
    //用户注册 post发过来的数据
    const user = ctx.request.body
    const username = user.name
    const password = user.pwd 
    console.log('用户的登录名'+username)
    console.log('用户的密码'+password)
    
    await new Promise((resolve, reject) =>{
        User.find({username: username}, (err, data)=>{
            
            if(err) return reject(err)
            if(data.length !== 0 ){
                return resolve('')
            }
            //用户名不存在 需要存在数据库
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
            await ctx.render('success')
        }else{
            await ctx.render('fail')
        }
    })
    .catch(async(err) =>{
        await ctx.render('repeat')
    })
}
//用户登陆
exports.login = async (ctx) =>{
    //用户登陆 post 发过来的数据
    const user = ctx.request.body
    const username = user.name
    const password = user.pwd 
    console.log('用户的登录名'+username)
    console.log('用户的密码'+password)
    
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
            await ctx.render('密码错误')
        }else{
            await ctx.render('登陆成功')
        }
    })
    .catch(async(err) =>{
        await ctx.render('repeat')
    })
}