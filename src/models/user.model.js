const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        index:true,
        lowercase:true
    },

    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true
    },

    name:{
        type:String,
        required:true,
        trim:true
    },

    password:{
        type:String,
        required:[true, "password required!"],
    },

    profilePic: {
        type: String,
    },

    refresh_token:{
        type: String
    }
},{timestamps:true});

//dont use arrow function because it does not have this

userSchema.pre("save", async function(next){
    try{
        if(!this.isModified("password"))return next();
        // Takes password field and and salt rounds
        this.password = await bcrypt.hash(this.password, 10);
        next();

    }catch(e){
        console.log("error in bycrptjs:", e);
    }
})

// using userSchema.methods -> creating isPassword

userSchema.methods.isPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.accessToken = function(){

    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        name: this.name,
    },

    process.env.ACCESS_TOKEN_SECRET

    ,{
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES
    })
}


userSchema.methods.refreshToken = function(){
    
    return jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET
    ,{
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES
    })
}

const User = mongoose.model("User", userSchema);


module.exports = User;
 

