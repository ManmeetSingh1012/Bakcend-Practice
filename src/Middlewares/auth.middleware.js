import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from '../utility/ApiError.js';



// this is the middleware to check the user is authenticated / login or not using the acess tokens


export const verifyJWT = (async(req, _, next) => {
   try {

    
      // this is the middle ware so the user will send the token in header(mobile device) or in cookie form 
       const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
       
       // console.log(token);

       if (!token) {
           throw new ApiError(401, "Unauthorized request")
       }
       
       // this will decode the token and get the user id from the token
       console.log(`${process.env.ACESS_TOKEN_SECRET}`)
       const decodedToken = jwt.verify(token, process.env.ACESS_TOKEN_SECRET)
   
       const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
   
       if (!user) {
           
           throw new ApiError(401, "Invalid Access Token")
       }
   
       req.user = user;
       // my work is finish u can move to other middleware
       next()
   } catch (error) {
       throw new ApiError(401, error?.message || "Invalid access token")
   }
   
})