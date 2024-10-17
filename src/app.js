const express = require("express");
const cookieParser = require('cookie-parser');
const cors =  require("cors");
const userRoute = require("./routes/user.routes");


const app = express();

app.use(cors({
   origin: process.env.CORS,
   
}))
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/user", userRoute);



module.exports = app;