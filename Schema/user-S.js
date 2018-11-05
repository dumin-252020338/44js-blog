const { Schema } = require('./config')

const UserSchema = new Schema({
    username:String,
    phone:Number,
    password:String,
    passwords:String,
    emali:String,
}, {versionKey: false})

module.exports = UserSchema