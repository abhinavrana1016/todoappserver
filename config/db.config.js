const mongoose = require('mongoose')
const mongodbUrl = process.env.MONGODB_URL;
mongoose.connect(mongodbUrl)
const connection = mongoose.connection;
connection.on('connected',()=>{
    console.log("mongodb connected successsfully to ",process.env.DB_NAME);
})
connection.on('error',(error)=>{
    console.log("error in mongodb connection",error)
})
module.exports =  mongoose
