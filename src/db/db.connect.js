require("dotenv").config({path:"./.env"});
const mongoose = require("mongoose");
const {DB_NAME} = require("../constants");



const connectDB = async () =>{
    try{
        connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`MongoDB connected at DB host ${connectionInstance.connection.host}`);

    }catch(e){
        console.log("MongoDB connection failed:", e);
        process.exit(1);
    }
}

module.exports = connectDB;