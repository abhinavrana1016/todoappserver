const nodemailer = require("nodemailer");
const {MAIL_USER_NAME,MAIL_PASSWORD,MAIL_HOST,MAIL_PORT} = process.env
const sendMail = async(email,otp,) =>{
    try{
        console.log(MAIL_USER_NAME,MAIL_PASSWORD,MAIL_HOST,MAIL_PORT)
        let transporter = nodemailer.createTransport({
            host: MAIL_HOST,
            port: MAIL_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
              user: MAIL_USER_NAME, // generated ethereal user
              pass: MAIL_PASSWORD, // generated ethereal password
            },
          });
          let info = await transporter.sendMail({
            from: MAIL_USER_NAME, // sender address
            to: email, // list of receivers
            subject: "Please verify your Account", // Subject line
            text: `Your OTP  is ${otp}`, // plain text body  // html body
          });
    }
    catch(error) {
console.log(error)
    }
}

module.exports = {
    sendMail,
}