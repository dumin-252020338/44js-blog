const { Schema } = require('./config')

const UserSchema = new Schema({
    username:String,
    phone:Number,
    password:String,
    passwords:String,
    emali:String,
    headPhoto:{
        type:String,
        default:"/img/default.jpg"
    }
}, {versionKey: false})

module.exports = UserSchema