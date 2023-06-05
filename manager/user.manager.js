const userModel = require("../models/user.model");
var bcrypt = require("bcryptjs");
const { Success, Error, success, error } = require('../util/response.util');
const {sendMail} = require('../util/sendMail');
const { sendtoken } = require("../util/sendtoken");
const registerUser = async (body,res) => {
  try {
    console.log(body);
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(body?.password, salt);
    // check for duplicate email,mobile no, userName
    const emailExist = await userModel.exists({ email: body?.email });
    const mobileExist = await userModel.exists({ mobileno: body?.mobileno });
    const userName = await userModel.exists({ userName: body?.userName });
    if (emailExist) {
        console.log("emil")
      return  res.status(500).json({success:false,message:"email already exist"})
    }
    else if (mobileExist) {

      return  res.status(500).json({success:false, message: "mobile no already exist" });
    }
    else if (userName) {
      return  res.status(500).json({success:false, message: "user Name already exist" });
    }
    else {
      const otp = Math.floor(Math.random()*1000000)
        const user = await userModel({
            firstName:body?.firstName,
            lastName:body?.lastName,
            userName:body?.userName,
            email:body?.email,
            mobileno:body?.mobileno,
            password:hashPassword,
            dateofbirth:body?.dateofbirth,
            otp:otp,
            otpExpiray:new Date(Date.now()+30000)
        }).save()
        await sendMail(body.email,otp);
        sendtoken(res,user,200,"OTP Send to your account please Verified")
       // return success({ message: "Registration successfully" });
    }
  } catch (error) {
    console.log(error);
  }
};
const verifyOtp = async(req,res) =>{  
  try{
const otp = req.user.otp
console.log(otp)
const user = await userModel.findById(req.user._id)
console.log(user)
if(user.otp.toString() !== otp.toString()) {
  res.status(500).json({success:false, message: "Invalid Otp" });
}
user.verified = true
user.otp = null
user.otpExpiray = null
 await userModel.updateOne({_id:user.id},{$set:{verified:true,otp : null,otpExpiray : null}})
sendtoken(res,user,200,"Account Verifed")

  }
  catch(error) {
    console.error(error)
  }
}
const loginuser = async(body,res) => {
  try {
    const {email,password} = body
    console.log(email)
    const user = await userModel.findOne({email:email},{password:1})
if(!user) {
  return res.status(400).json({success:false,message:"Invalid email or password"})
}else {
console.log(user.password,password)
const isMatch = await bcrypt.compare(password,user.password);
console.log(isMatch)
if(isMatch)
  sendtoken(res,user,200," login successfully")
else {
  console.log("lkgbk")
  return res.status(500).json({success:false,message:"Invalid Email or Password"})
}
}
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  registerUser,
  verifyOtp,loginuser
};
