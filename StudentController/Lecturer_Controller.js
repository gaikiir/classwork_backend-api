//importing the lecturer model
const Lecturer = require('../models/Lecturer_models');
//import mongoose
const mongoose = require('mongoose');
const createError = require('http-errors');



//creating the middleware

module.exports = {
    getAllLecturers: async(request,respond,next)=>{
        try{
            const result = await Lecturer.find();
            respond.send(result);
        } catch(error){
            console.log(error.message);
           // next(error);
        }
    },

    addLecturer:async(request,respond,next)=>{
        try{
            const newLecturer = new Lecturer(request.body);
            const newUser = await newLecturer.save();
            respond.send(newUser);
        } catch(error){
            console.log(error.message);
            if(error.name === 'validationError'){
               return  next(createError('invalidationError'))
            }
            next(error);
        }
    },

    getLecturerById: async(request,respond, next)=>{
        const  id = request.params.id;
        try{
            const lecturer = await Lecturer.findById(id);
            respond.send(lecturer)
            if (!lecturer) {
                throw (createError(400, "lecturer does not exist"));
            }
        }catch(error){
            console.log(error.message);
          if(error instanceof mongoose.CastError){
              next(createError(400, 'Invalid lecturer id'));
          }
          
        }
    },

    UpdateLecturer: async(request,respond,next)=>{
        try{
            const id = request.params.id;
            const updates = request.body;
            const options = {new:true};
            const result = await Lecturer.findByIdAndUpdate(id, updates,options);
            if(!result){
                throw(createError(400, 'lecturer does not exist, please try again'));
            }
            respond.send(result);
        }catch(error){
            console.log(error.message);
            if(error instanceof mongoose.CastError){
                return next(createError(400, 'Invalid lecturer id'));
            }
        }
    },

    deleteLecturer:async(request,respond,next)=>{
        const id = request.params.id;
        try{
            const output = await Lecturer.findByIdAndDelete(id);
            if(!output){
                throw(createError(400, "lecturer does not exist, please try again"));
            }
            respond.send('successfully deleted the lecturer');
        }catch(error){
            console.log(error.message);
            if(error instanceof mongoose.CastError){
                return next(createError(400, 'Invalid lecturer id'));
            }
        }
    }
    
    }


