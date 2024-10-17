const ApiError = require("./apiError.js");

const asyncHandler = (ReqHandler) => {
    return async(req, res, next)=>{
        try{
            await ReqHandler(req, res, next);
        }
        catch(error){
          res.status(error.code || 500).json({
            success : false,
            message : error.message
          });
        }
    }
}

module.exports = asyncHandler;