const { Schema } = require('./config')
const ObjectId = Schema.Types.ObjectId

const ArticleSchema = new Schema({
    title:String,//标题
    keyword:String,//关键词
    interest:Number,//文章类型
    desc:String,//文章内容
    author:{
        type: ObjectId,
        ref: "users"
    },//作者 关联users的表
}, {versionKey: false, timestamps:{
    createdAt:"created" //创建时间
}})

module.exports = ArticleSchema