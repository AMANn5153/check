const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/user.model");


const authentication = asyncHandler(async(req, res, next)=>{
    // get the accessToken from cookie

    const accessToken = req.cookies?.accessToken;

    const decodedToken = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    if(!decodedToken){
        throw new ApiError(401, "Unauthorized request");
    }

    const user = await User.findById(decodedToken._id).select("-password -refresh_token");

    if(!user){
        throw new ApiError(401, "Invalid Access Token")
    }

    req.user = user;

    next();

});

module.exports = {authentication};