const jwt = require('jsonwebtoken')
const userModel = require("../models/user.model")
const { Success, Error, success, error } = require('../util/response.util');
const isAuthenticated = async(req,res,next) =>{
try{
const {token} = req.cookies;
console.log(token)

if(!token) {
   return error({message:""})
}
const  decodeData = jwt.verify(token,process.env.JWT_SECRET)
 req.user = await userModel.findById(decodeData._id)
next()
}
catch(error)
{
    console.log(error)
}
}
module.exports = {
    isAuthenticated 
}