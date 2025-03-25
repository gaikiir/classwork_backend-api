//const { response } = require('express');
const { mongoose } = require('mongoose');
const Student = require('../models/StudentModels');//import the student model
const createError = require('http-errors');//import createError
// module exports 
module.exports = {
 getAllStudents:async(request,response,next)=>{
  try{
    const result = await Student.find();
    response.send(result);
  } catch(error){
    console.error(err.message)
  }
},

Addstudent:async(request,response,next)=>{
  try{
    const student = new Student(request.body);
    const result = student.save();
    response.send(result);
  }catch(error){
    console.log(error.message);
    if(error.name === "validationError"){
      return next(createError(422, error.message));
    }
    next(error);
  }
},

getStudent:async(request,response,next)=>{
  const  id = request.params.id;
  try{
    const student = await Student.findById(id);
    if(!student){
      throw (createError(404, "student does not exist"))
    }
    response.send(student);
  }catch(error){
    console.log(error.message);
    if(error instanceof mongoose.CastError){
      return next(createError(400,"Invalid student Id"))
    }
    next();
  }
},

updateStudent:async(request,response,next)=>{
  //get student by their Id 
  const id = request.params.id;
    console.log("Received ID:", id); // Debugging: Check if the ID is correct
    
  try{
    const update = request.body;
    const options = {new:true};
    result = await Student.findByIdAndUpdate(id,update,options);
    if(!result){
      throw(createError(404,'Student does not exist'))
    }
    response.send(result);
  } catch(error){
    console.log(error.message);
    if(error instanceof mongoose.CastError){
      next(createError(400, 'Invalid Student Id'));
      return
    }
    next(error)
  }
  },

  deleteStudent:async(request,response,next)=>{
    try{
      const id = request.params.id;
      const student = Student.findByIdAndDelete(id);
      if(!student){
        throw(createError(404,'Student does not exist'))
      }
      response.send(student);
    } catch(error){
      console.log(error.message);
      if(error instanceof mongoose.CastError){
        return next(createError(400, 'Invalid student Id'));
      }
      next(error);
    }

  }

}