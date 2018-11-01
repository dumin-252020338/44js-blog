const crypto = require('crypto')

module.exports = function(password, key='44js'){
    const hmac = crypto.createHmac('sha256',key)
    hmac.update(password)
    const pwdHmac = hmac.digest('hex')
    return pwdHmac  
}