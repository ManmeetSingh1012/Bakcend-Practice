import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

// first we will take file to our server then upload it to cloudinary
// to take file and to store it on our  server we will use multer and fs : file system


cloudinary.config({
   cloud_name: process.env.CLOUD_NAME,
   api_key: process.env.CLOUD_API_KEY,
   api_secret: process.env.CLOUD_API_SECRET
});

const uploadoncloudinary = async (file) => {
   try {
      if (!file) return null;
      // if not null upload the file

      const response = await cloudinary.uploader.upload(file,
         { 'resource_type': 'auto' });

      console.log("file response", response);
      fs.unlinkSync(file);
      return response


   } catch (error) {
      // this will remove file from the server if it is not uploaded to cloudinary
      console.log("cloudnary",error)
      fs.unlinkSync(file);
      return null;
   }
}



export default uploadoncloudinary;
