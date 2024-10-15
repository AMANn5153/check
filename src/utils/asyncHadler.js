const asyncHandler = (ReqHandler) => {
    return async(req, res, next)=>{
        try{
            await ReqHandler(req, res, next);
        }
        catch(e){
            console.log(`Error in RequestHandler`);
            throw new Error(e);
        }
    }
}