require('dotenv').config();
const express = require("express");
const cookieParser = require("cookie-parser")
const route = require("./routes/routes")
 const app = express()
const port = process.env.PORT || 500
app.listen(port,()=>{
    console.log("server is running on port",port);
})
const dbconfig = require("./config/db.config.js");
app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api',route);

app.get('*', (req, res) => {
    res.status(404).json({
        msg: 'Sorry, This route is not found on this server',
    });
});