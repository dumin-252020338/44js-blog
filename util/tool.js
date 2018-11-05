const crypto = require('crypto')

//加密对象 --》返回加密成功的数据
module.exports = function(password, key='dumin-252020338'){
    const hmac = crypto.createHmac('sha256',key)
    hmac.update(password)
    const pwdHmac = hmac.digest('hex')
    return pwdHmac  
}