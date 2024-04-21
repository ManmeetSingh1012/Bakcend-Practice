import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"



const user = new mongoose.Schema({

   username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      indexe: true, // index help in searching

   }

   ,

   fullname: {
      type: String,
      required: true,
      trim: true,
      indexe: true, // index help in searching

   },

   avatar: {
      type: String, // third party image url
      required: false,
   },


   watchhistory: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Video"
      }
   ],

   password: {
      type: String,
      required: [true, "Password is required"],
   }
   ,

   refreshToken: {
      type: String
   }


}, { timestamps: true })

// This is pre hook in mongoose , it will run just  before saving the data in database or any other operation
// like : delete , update etc u can pass the operation type as as string , its part of mongoose middleware.
// next is flag for middleware 

// do not use arrow function here , as it will not have access to this keyword
user.pre("save", async function (next) {

   if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 12)
   }
   next()
})

// Methods are used to add custom methods to the schema , we attach the method to our model

// it is the method to check the password is correct or not , it will return true or false
user.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password, this.password)

}



user.methods.genrateAcessToken = function () {

 
   return jwt.sign(
      {
         _id : this._id ,
         email : this.email,
         username : this.username,
         fullname : this.fullname
      },
      process.env.ACESS_TOKEN_SECRET
      ,{
         expiresIn : process.env.ACESS_TOKEN_EXPIREY
      }
   )

   

}


user.methods.generateRefreshToken = function () {

   return jwt.sign(
      {
         _id : this._id 
      },
      process.env.REFRESH_TOKEN
      ,{
         expiresIn : process.env.REFRESH_TOKEN_EXPIREY
      }
   )
}


export const User = mongoose.model("User", user)