const asyncHandler = require('../utils/asyncHandler.js');
const ApiError = require("../utils/apiError.js");
const ApiResponse = require("../utils/apiResponse.js");
const User = require("../models/user.model.js");
const uploadOnCloudinary = require("../utils/cloudinary.js")

const createUser = asyncHandler(async (req, res)=>{
    // get infomation from client
    // validate any of the them is null or defined
    // user already exist?
    // upload profilePic on the server
    // check if profilePic is uploaded on the server
    // now upload user info on database;
    // get user info excluding refresh token and password
    // send response

    const {username, email, name, password} = req.body;

    if([username, email, name, password].some((val)=> val === "")){
        throw new ApiError(409, "some fields are misssing !!");
    }


    const userExists = await  User.findOne({$or:[{username}, {email}]});

    if(userExists){
        throw new ApiError(409, "username or email already exists");
    }

    const localPathOfProfile = req.file?.path;


    const uploadPath = await uploadOnCloudinary(localPathOfProfile,{
        public_id : "profilePIC"
    });

    if(!uploadPath){
        throw new ApiError(409, "please also put your profile photo");
    }

    const createdUser = await User.create({
        username: username.toLowerCase(),
        email,
        name,
        password,
        profilePic: uploadPath.url
    }); 

    const isUser = User.findOne({_id: createdUser._id}).select("-password -refresh_token");

    if(!isUser){
        throw new Error(500, "user can't be saved");
    }

    return res.status(200).json(new ApiResponse(201, "userCreated", isUser));
});

const loginUser = asyncHandler(async(req, res)=>{
    // get info req.info
    // null values 
    // check email or id
    // password check
    // access token and refresh token
    // send these token in secure cookies
    
    const {email, username, password} = req.body;

    if(!email && !username){
        throw new ApiError(409, "null credentials !");
    }

    const isUserExist = await User.findOne({$or:[{email},{username}]});

    if(!isUserExist){
        throw new ApiError(409, "can't find user !")
    }

    const isPasswordMatch = await isUserExist.isPassword(password);

    if(!isPasswordMatch){
        throw new ApiError(401, "inValid credentials !")
    }

    const accessToken  = await isUserExist.accessToken();
    const refreshToken = await isUserExist.refreshToken();
    
    const options = {
        httpOnly : true,
        secure: true
    }

    const user = User.findById(isUserExist._id).select("-password -refresh_token");

    res.status(200).cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options).json(
      new ApiResponse(201,"userCreated", user));

});


const logoutUser = asyncHandler(async(req, res)=>{
    
    await User.findOneAndUpdate(
        {_id : req.user._id},
        {$set:{refresh_token:undefined}},{new:true});
    

    res.status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, "logged Out"));
    
});


module.exports = {createUser, loginUser, logoutUser};