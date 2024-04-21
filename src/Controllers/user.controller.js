import { ApiError } from '../utility/ApiError.js';
import { User } from '../models/user.model.js';
import uploadoncloudinary from '../Utility/cloudinary.js'
import { json } from 'express';
import jwt from 'jsonwebtoken';

/* 
1.get user detail 
2.validate the data 
3.check the user exist 
4.check the image and file
5.upload the files and get url
6.create the user object
7.remove password and refresh token field
8.check of user creation
9.return response*/

// throw error will always throw error in the console 

const RefreshAcessTokenGenrator = async (userId) => {
   try {

      console.log("id", userId)
      // here we are finding the user and then acessing the function not from the User Object
      const user = await User.findById(userId)
      const accessToken = user.genrateAcessToken()
      const refreshToken = user.generateRefreshToken()

      user.refreshToken = refreshToken
      // this will save the tokens in the database
      await user.save({ validateBeforeSave: false })

      return { accessToken, refreshToken }
   } catch (error) {
      console.log("error :", error)
      throw new ApiError(500, "Internal Server Error")
      
   }
}
const register = async (req, res) => {

   try {
      const { username, fullname, password, email } = req.body;
      console.log("body", req.body)
      console.log("body", req.files)

      // 2.Validate the data
      if (username === "" || fullname === "" || password === "" || email === "") {

         res.status(401).json({
            message: "field is empty"
         })
         throw new Error("filed is empty")

         return;
      }


      // 3.Check the user exist
      /*const existUser = User.findOne(
         {
            $or: [
               { username: username },
               { email: email }
            ]
         })

         console.log("exist",existUser)

      if (existUser) {
         res.status(401).json({
            message: "user exist alraady"
         })
         throw new Error("user exist alraady")

         return;

      }


      //console.log("exist",existUser)

      // 4.Check the image and file , ? :- is used to check if the file is present or not
      // we will geth the path of the file, file uplaoded using middleware multer.


      const avatarlocalpath = req.files?.avatar[0]?.path;
      const coverImagelocalpath = req.files?.coverImage[0]?.path;

      if (!avatarlocalpath) {
         res.status(401).json({
            message: "file is not uploaded"
         })
         throw new Error("file is not uploaded")

         

         return;

      }

      // 5.Upload the files and get url
      const avatar = await uploadoncloudinary(avatarlocalpath);
      const coverImage = await uploadoncloudinary(coverImagelocalpath);

      if (!avatar) {
         res.status(401).json({
            message: "something went wrong while uploading",
            error: String(avatar)
         })
         throw new Error("file is empty")

         return;

      }*/

      // 6.Create the user object
      const user = await User.create({
         username: username.toLowerCase(),
         fullname,
         email,
         //avatar: avatar.url,
         //coverImage: coverImage?.url || "",
         password
      })

      console.log("user", user)


      // it will remvove password and refresh token from the user object


      // 8.Check of user creation
      if (!user) {
         res.status(401).json({
            message: "something went wrong while creating user",
            error: String(created_user)
         })
         throw new Error("file is empty")

         return;
      }

      // 9.Return response
      console.log(typeof user)

      return res.status(201).json({
         status: "success",
         message: "User Created Successfully",
         data: user
      })


   } catch (error) {
      res.status(400).json({ error: JSON.stringify(error.message) })
      throw error
   }
}

const loginUser = async (req, res) => {
   /*
   1.get user detail
   2. login via username or email
   3.find the user in database.
   4.check the password
   5.acess and refresh token
   6. send cookie
   7. return response
   */

   // 1.get user detail
   const { username, email, password } = req.body;
   console.log("body", req.body)

   // check if the data is there or not
   if (!username || !email || !password) {
      res.status(401).json({
         message: "field is empty"
      })
      throw new ApiError(401, "field is empty")
      return;
   }

   // 3.find the user in database
   // or and  are the mongodb operators 
   const user = await User.findOne({
      $or: [{ username }, { email }]
   })

   if (!user) {
      res.status(401).json({
         message: "user not found"
      })
      throw new ApiError(401, "user not found")
      return;
   }

   // 4.check the password
   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
      throw new ApiError(401, "Invalid user credentials")
   }


   // 5. access and refresh token
   const { accessToken, refreshToken } = await RefreshAcessTokenGenrator (user._id)

   // fetching the user details again to remove the password and refresh token :- we send tokens in the cookie
   const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

   // these options will make the cookie secure and http only and no one can modify it .
   const options = {
      httpOnly: true,
      secure: true
   }

   return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        
         {"status" : 200,
            
         user: loggedInUser, accessToken, refreshToken
            ,
            message : "User logged In Successfully"}
         
      )




}


const logoutUser = async(req, res) => {
   // this will find and update
   await User.findByIdAndUpdate(
       req.user._id,
       {
           $set: {
               refreshToken: undefined // this removes the field from document
           }
       },
       {
           new: true
       }
   )

   const options = {
       httpOnly: true,
       secure: true
   }

   return res
   .status(200)
   .clearCookie("accessToken", options)
   .clearCookie("refreshToken", options)
   .json({
         status: 200,
         message: "User logged out successfully"
      
   })
}

// when our acess token gets expired we will use this function to get new acess token
const refreshAccessToken = async (req, res) => {
   const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

   if (!incomingRefreshToken) {
       throw new ApiError(401, "unauthorized request")
   }

   try {
       const decodedToken = jwt.verify(
           incomingRefreshToken,
           process.env.REFRESH_TOKEN
       )
   
       const user = await User.findById(decodedToken?._id)
   
       if (!user) {
           throw new ApiError(401, "Invalid refresh token")
       }
   
       if (incomingRefreshToken !== user?.refreshToken) {
           throw new ApiError(401, "Refresh token is expired or used")
         
       }
   
       const options = {
           httpOnly: true,
           secure: true
       }
   
       const {accessToken, refreshToken} = await RefreshAcessTokenGenrator(user._id)
   
       return res
       .status(200)
       .cookie("accessToken", accessToken, options)
       .cookie("refreshToken", refreshToken, options)
       .json(
           {
             staus : 200,
              "message" : "Access token refreshed",
              "tokens": [accessToken, refreshToken]
           }
               
       )
   } catch (error) {
       throw new ApiError(401, error?.message || "Invalid refresh token")
   }

}

export default register;
export { loginUser , logoutUser , refreshAccessToken}




