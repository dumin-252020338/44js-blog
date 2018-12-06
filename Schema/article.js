const { Schema } = require('./config')

const ArticleSchema = new Schema({
    title:String,//标题
    keyword:String,//关键词
    interest:Number,//文章类型
    desc:String,//文章内容
}, {versionKey: false})

module.exports = ArticleSchema