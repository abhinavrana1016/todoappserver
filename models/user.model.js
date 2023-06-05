const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { Schema } = mongoose;
const userSchema = new mongoose.Schema({
    firstName:{type:String,require:true},
    lastName:{type:String,require:true},
    userName:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true,unique:true},
    dateofbirth:{type:Date,require:true},
    mobileno:{type:Number,require:true},
    avtar:{
        public_id:{type:String},
        url:{type:String},
    },
    otp:{type:String},
    otpExpiray:{type:Date},
    verified:{type:Boolean,default:false}
},{
    timestamps:true
})

userSchema.methods.getJWTTOken = function (){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET,{
        expiresIn:30000 
    })
}


module.exports = mongoose.model('user', userSchema);