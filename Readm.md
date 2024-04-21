 ***** FOLLOW below steps for project creation ****

1.Create Project npm init

/*

echo "# Bakcend-Practice" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/ManmeetSingh1012/Bakcend-Practice.git
git push -u origin main


for update:

git status 
git add .
git commit -m "message"
git push

cd.. to go back from current directory
*/

2.to create .gitignore file genrate it from google 

3. create env file to ignore , to create .env.sample to share on git hub

4. create src folder for all the files and data

5. create files like app.js , index.js , constant.js

6  add type in package.json "module" : import karne ka  trika

7  To stop and run the server again use nodemon : npm i -D nodemon will install dependecny for the dev mode

8. create  a dev script in package file 

9. install dotenv as well 

10. Create folder controller , routes , database , middlewares , utility 

11 Install prettier for dev mode will make code pretter and create 2 files .prettierignore .prettierrc  and create these file online 

   ignore file which will git ignore will not touch 


12.Download cookie parser and CORS : Used in middlewares : Cross origin resource sharing , cookie related data

13.Custom api error handling class creation 

14.Download mongoose-aggregate-paginate-v2 for writting querries for pagination for mongodb in mongoose.

15 install bcrypt : hash your passwords.

16. install json web token : for jwt genrator

17. Multer : helps to take vedio , imaage as input

18.cloudnary : cloud srvice



****** DataBase : Mongo DB Setup ******
1.See code for setting up database
In api we have req and res next flag :- see docs for more detail 


************ HTTP CRASH COURSE *********

http stands for hyper text transfer protocol.
URL , URI , URN : uniform resource locater , indentifier, name .


http headers : Meta Data -> data of data it is stored in the form of key-value pair.
http headers are used for caching , auth , state manage , getting info of the user.


types : req header , res header , representation header  , payload header


Most common Header:
accept : application/json :- data it accepts
user-agent : traffic source :- browser , mobile browser etc.
auth : for auth , jwt token
content_type : for type
cookie and cache control , CORS , Security Headers are also there used by big tech company


HTTP METHODS:
GET , POST , PUT ,DELETE , PATCh  rare used : TRACE , OPTIONS


HTTP Status Code :
100 range :- Informational , 200 range :- sucess  , 300 :- redirection , 400:- client error , 500 :- server error

200 - ok , 201 - created, 202 -accepted , 307 : temp redirection , 308 : premanent redirection , 
400 :- bad req , 401 :- unauthorized , 402 : - payment required , 404 :- not found , 500:- internal server err , 504 :- gateway time out

ACESS TOKEN  :- Used to authenticate user , have short life span
REFRESH TOKEN :- Used to authenticate user , have long life span 

acess token can be genrated when expired , from refresh token.


***** WARNING *****
File Uploading code not working and searching if user exist is not working in register user part , data is not going through form data :- only json data accepting
