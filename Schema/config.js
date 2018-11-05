//连接数据库，导出db和schema
const mongoose = require('mongoose')
const db = mongoose.createConnection('mongodb://localhost:27017/blogproject')
//用原生es6的promis 代替mongoose的promise
mongoose.Promise = global.Promise
//把mongoose的schema取出来并导出去
const Schema = mongoose.Schema


db.on('error', ()=>{
    console.log('数据库连接失败')
})
//
db.on('open', ()=>{
    console.log('blogproject数据库连接成功')
})
console.log(db)
module.exports = {
    db,
    Schema
}