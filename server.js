require('dotenv').config();
const express = require("express");
const cookieParser = require("cookie-parser")
const route = require("./routes/routes")
 const app = express()
const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log("server is running on port",port);
})

app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api',route);

app.get('/', (req, res) => {
    res.send('Hello World!')
  })