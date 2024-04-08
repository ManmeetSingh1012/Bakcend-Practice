import mongoose from 'mongoose';
import { DB_NAME } from '../constant.js';
import { ApiError } from '../Utility/ApiError.js';




const ConnectDB = () => {
   return new Promise(async (resolve, reject) => {
      try {

         const connectionInstance = await mongoose.connect(`${process.env.Mongodb_url}/${DB_NAME}`);
         console.log('Connected to DB', connectionInstance.connection.host);
         resolve();
         
      } catch(error) {
         
         const errors = new ApiError(500, "Database Connection Error", error);
         reject(errors);
      }
   });
};


export default ConnectDB;