import { Router } from "express";
import register from "../Controllers/user.controller.js";
import { upload } from "../Middlewares/multer.middleware.js"
import { loginUser , logoutUser } from "../Controllers/user.controller.js";
import { verifyJWT } from "../Middlewares/auth.middleware.js";
import { refreshAccessToken , ChangePassword ,getCurrentUser , updateAccountDetails , updateUserAvatar} from "../Controllers/user.controller.js";
import { get } from "mongoose";

import .meta.d
const userrouter = Router();

// injecting multer middleware for file upload
// using fields method takes array of objects : types of file u can upload 
userrouter.route("/register").post(
   upload.fields([
      {
         name :"avatar",
         maxCount : 1
      },{
         name :"coverImage",
         maxCount : 1
      }
   ])
   ,register)

userrouter.route("/login").post(loginUser)

userrouter.route("/logout").post(verifyJWT,logoutUser)

userrouter.route("/refresh-token").post(refreshAccessToken)

userrouter.route("/changepassword").post(verifyJWT,ChangePassword)

userrouter.route("/currentuser").get(verifyJWT,getCurrentUser)

userrouter.route("/updatedetails").patch(verifyJWT,updateAccountDetails)

userrouter.route("/updateavatar").patch(upload.single("avatar"),verifyJWT,updateUserAvatar)


export default userrouter;