//creating an ending point to connect to the Database

const mongoose = require('mongoose');

//createing the connector path way


//connect to the database

//use the environment variable to connect to the database
mongoose.connect(process.env.MONGODB_URI,{dbname: process.env.DB_NAME})
.then(()=>{
    console.log('MongoDB connected successfull');
}).catch((error)=>console.log(error.message));