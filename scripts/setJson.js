const jwt = require("jsonwebtoken");
const {tokenKey} = require("../super-ultra-hyper-mega-secret/token");
module.exports = setJSONToken = (userLogin, userStatus, userId) => {
    return jwt.sign({login:userLogin, status: userStatus, id: userId}, tokenKey);
}