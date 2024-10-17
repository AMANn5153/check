const {v2} = require('cloudinary');
const fs = require("fs");
const cloudinary = v2;

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET
})


const uploadOnCloudinary = async (localFilePath)=>{
    try{
        if(!localFilePath)return console.log(`file path is not defined`);
        
        const response = await cloudinary.uploader.upload(localFilePath);
        
        console.log(response);
        return response;

    }catch(e){
        console.log(e);
    }
    finally{
        fs.unlinkSync(localFilePath, (err)=>{
            console.log("unable to delete file !");
        })
    }
}

module.exports = uploadOnCloudinary;