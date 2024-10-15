require("dotenv").config({path:"./env"});
const  connectDB  = require("./db/db.connect.js");
const {PORT} = require("./constants.js");
const app = require("./app.js")





connectDB()
.then(app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
}))
.catch((e)=>{
    console.log("monogoDB unable to connect !!", e);
})