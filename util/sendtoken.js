const sendtoken = async(res,user,statusCode,message)=>{
    try{
    const options = {
        httpOnly:true,
        expires:new Date(Date.now() + 30000000 )
    }
    const token = user.getJWTTOken();
        const userData = {
            userId:user._id,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,

        }
        res.status(statusCode).cookie("token",token,options).json({success:true,message,user:userData})

    }
    catch(error) {
console.log(error)
    }

}
module.exports = {
    sendtoken
}