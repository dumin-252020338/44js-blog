const { db } = require('../Schema/config')
const ArticleSchema = require('../Schema/article')
//通过 db 对象创建操作 article 数据库的模型对象  articles 为数据库名
const Article = db.model('articles', ArticleSchema)

//通过 db 对象创建操作 user 数据库的模型对象  users 为数据库名
const UserSchema = require('../Schema/user-S')
const User = db.model('users', UserSchema)

//通过 db 对象创建操作 comment 数据库的模型对象  comments 为数据库名
const CommentSchema = require('../Schema/comment')
const Comments = db.model('comments', CommentSchema)

exports.addComment = async(ctx) =>{
    let message ={
        status: 0,
        msg:'登录才能发表',
    }
    if(ctx.session.isNew){
        return ctx.body = message
    }
    const data = ctx.request.body
    data.from = ctx.session.uid
    
    const _comment = new Comments(data)
    await _comment
        .save()
        .then(data =>{
            message={
                status: 1,
                msg:'评论成功'
            }
        })
        .catch(err => {
            message={
                status: 0,
                msg: err
            }
        })
    ctx.body = message
}