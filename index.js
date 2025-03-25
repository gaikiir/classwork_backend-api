const express = require('express');//import express
const app = express();//initialize express
app.use(express.json());//use the json parser
require('dotenv').config();//import dotenv to use the environment variables
const rateLimit = require('express-rate-limit');//import rate limit middleware

//cors helps for security reason to allow cross-origin requests when

//  your api is running on different ports 4000 ,
//react is running on port 3000 cors help to allow the requests from different ports
const cors = require('cors')//initialize cors

require('./helpers/init_mongodb')//import the database connection

const studentRoutes = require('./routes/StudentRoute');//import the routes
const authRoute = require('./routes/authRoute');
const lecturerRoutes = require('./routes/Lecture_Route')
const createError = require('http-errors');//import createError
const helmet = require('helmet');//import helmet 


app.use(helmet());//use helmet for security
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,  // converting 60 seconds * 60 minutes * 1000 milliseconds = 1 hour
  mesage:'Too many requests from this IP plaese try again in an hour'
});

//securing the API by limiting number of requests 
app.use('/api',limiter);

const AllowedOrigins = ['http://localhost:3000'];
// app.use(cors({
//   origin:(origin,callback)=>{
//     if(origin) return callback(null, true);
//     if(AllowedOrigins.indexOf(origin) === -1){
//       const msg = `The cors policy does not allow access  from specified origin`;
//       return callback(new Error(msg),false)
//     }
//     return callback(null, false)
//   }
// }))
app.use(cors({
  origin:(origin,callback)=>{
    if(!origin || AllowedOrigins.includes(origin)){
      return callback(null, true);
    }else{
      callback(new Error('Not allowed by cors policy'));
    }
  }
}));

//this line of code  api/auth => auth  is like  placeholder for authetication route 
app.use('/api/auth',authRoute);
//this line of code  api/auth => student is like  placeholder for authetication route 
app.use('/api/students',studentRoutes);//use the route
app.use(lecturerRoutes);
//handling 404 error
app.use(async(request,respond,next)=>{
  //next(createError(404, "Page Not Found"));
  next(createError.NotFound());
})

//ERROR HANDLER
app.use((err,request,respond,next)=>{
  respond.status(err.status || 500);
  respond.send({
    error:{
      status:err.status|| 500,
      message:err.message
    }
  })
})

app.listen(process.env.port || 4000, function () {
  console.log("Now listening for request on: http://localhost:4000");
});
