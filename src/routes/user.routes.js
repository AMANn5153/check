const {Router} = require("express");
const{ createUser, loginUser, logoutUser }= require("../controllers/user.controller")
const upload = require("../middlewares/multer.middleware.js");
const { authentication } = require("../middlewares/auth.middleware.js");

const userRoute = Router();

userRoute.route("/createUser").post(upload.single("profilePic"),createUser);

userRoute.route("/loginUser").post(loginUser);

userRoute.route("/logoutUser").delete(authentication,logoutUser)

module.exports = userRoute;