const { default: mongoose } = require('mongoose');
const Student = require('../models/Student_Models');
const createError = require('http-errors');

module.exports = {

     getAllStudents: async(req,res,next)=>{
    try{
        const result = await Student.find(req,body);
        res.send(result);
    } catch(error){
        console.log(error.message);
    }
  },
  AddStudent: async (req, res, next) => {
    try {
      const student = new Student(req, body);
      const result = await student.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      // if(error.name === 'validationError'){
      //     next(createError(422,error.message))
      // }
      next(error);
    }
  }
  ,

  getStudent: async(req,res,next)=>{
    const id = req.params.id;
    try{
        const student = await Student.findById(id);
        // if(!student){
        //     throw(createError(404,"student does not exist"))
        // }
        res.send(student);
    } catch(error){
        console.log(error.message);
        // if(error instanceof mongoose.CastError){
        //     next(createError(404,"Invalid Student id"));
        //     return;
        // }
        next(error)
    }
  },

  updateStudent: async(req,res,next)=>{
    try{
      const id = req.params.id;
      const update = req.body;
      const options = {new:true};
      const result = await Student.findByIdAndUpdate(id,update,options)
    }
  }
};



