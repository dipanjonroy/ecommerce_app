const jwt  = require("jsonwebtoken")

module.exports.createToken = (payload, secret_key, expiresIn)=>{
  return jwt.sign(payload, secret_key, {expiresIn})
}