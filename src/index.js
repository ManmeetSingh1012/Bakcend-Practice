import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import ConnectDB from './Database/index.js';
import app from './app.js';




/*
promise containes reslove and reject , that we can use in then()
async and await also returns promise and u can use then catch as well.
*/

ConnectDB()
  .then(() => {
    // Start the server after successful database connection
      app.listen(process.env.PORT || 4000, () => {
      console.log(`Server running at port ${process.env.PORT || 4000}`);

    });
  })
  .catch((error) => {
    console.log(
      {"MongoDB Error " : error.errors,
      "Mongo DB Status Code " : error.statusCode, }
   ); // here we have used api error class to handle error
    
  });


// Handle server errors
app.on("error", (error) => {
  console.log("Server Errors :", error);
});