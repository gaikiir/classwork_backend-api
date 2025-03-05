
const express = require('express');//import express

require('dotenv').config();//import dotenv to use the environment variables

require('./helpers/init_mongodb')//import the database connection

const app = express();//initialize express
app.use(express.json());//use the json parser

const studentRoutes = require('./routes/studentRoute');//import the routes
const authRout = require('./routes/authRoute')
app.use(authRout);
app.use(studentRoutes);//use the routes

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



