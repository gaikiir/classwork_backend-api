const respond = require('express');//import express
const Student = require('../models/StudentModels');//import the student model
const createError = require('http-errors');//import createError
const mongoose = require('mongoose');//import mongoose

// module exports 
module.exports = {
  // get all students route handler 
    getAllStudents: async(request,respond,next)=>{
      try{
        // find all students from the database using find() method
        const result =  await Student.find();
        // send the result back to the client
        respond.send(result)

      } 
      // catch block to handle any errors that occur during the process
      catch(error){
        console.log(error.message)
  } 
},
//add a new student route handler  - adds a new student to the database  
addStudent: async(request,respond,next)=>{
  try{
    // create a new student instance from the request body data
    const student= new Student(request.body);
// save the new student to the database using save() method
    const result = await student.save();
    // send the saved student back to the client
    respond.send(result);

  } 
  // catch block to handle any errors that occur during the process
  catch(error){
    console.log(error.message);

    // if the error is a validation error, throw a custom error
    if(error.name === 'ValidationError'){
      // throw a custom error for invalid data
      next( createError('InvalidationError'));
      return;
    }
    next(error);
    }
},
// update a student route handler - updates an existing student in the database  
  updateStudent: async(request,respond,next)=>{
    try{
      // get the id of the student to be updated from the request parameters
     const id = request.params.id;
     // get the updates to be made from the request body data
     const updates = request.body;
     // use findByIdAndUpdate() method to update the student in the database with the provided updates and options
     const options = {new:true};
     // send the updated student back to the client
     const result = await Student.findByIdAndUpdate(id,updates,options);
     // if the student does not exist, throw a custom error
     if(!result){
      throw(createError(404,"student does not exist, Please try again"));
     }
    } catch(error){
      console.log(error.message);
      if(error instanceof mongoose.CastError){
        next(createError(400,"Invalid student id"));
        return;
      }
      next(error);
    }
  },
  // get a student by id route handler - retrieves a student from the database based on its id
  getStudentById: async(request, respond, next)=>{
    // get the id of the student to be retrieved from the request parameters
     const id = request.params.id;
    try{
      // find the student by id from the database using findById() method
    const student = Student.findById(id);
    // if the student does not exist, throw a custom error
    if(!Student){
      throw(createError(404,"student does not exist, Please try again"));
    }
    }
    catch(error){
    console.log(error.message);
    if(error instanceof mongoose.CastError){
      next(createError(400,"Invalid student id"));
      return;
    }
  }
},


deleteStudent: async(request,respond,next)=>{
  try{
    const id = request.params.id;
    const stundet = await Student.findByIdAndDelete(id);
    if(!stundet){
      throw(createError(404,"student does not exist, Please try again"));
    }
  } catch(error){
    console.log(error.message);
    if(error instanceof mongoose.CastError){
      next(createError(400,"Invalid student id"));
      return;
  }
}
}
}