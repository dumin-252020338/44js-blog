const { Schema } = require('./config')
const ObjectId = Schema.Types.ObjectId

const CommentSchema = new Schema({
    content:String,//评论内容
    from:{
        type: ObjectId,
        ref: "users",
    },//作者 关联 users 的表
    article:{
        type: ObjectId,
        ref: "articles",
    },//文章 关联 articles 的表
}, {versionKey: false, timestamps:{
    createdAt:"created" //创建时间
}})


module.exports = CommentSchema