const express = require("express");
const route = express.Router();

const student_Route = require("../StudentController/studentController");

// authenticate middleware
const {verifyAccessToken } = require('../helpers/JwtHelper');
const restrctUser = require('../helpers/JwtHelper')

//get all students from the database
route.get("/getAllStudents", student_Route.getAllStudents);


//add a student to the database
//verifyAccessToken, restrctUser.restrict('user', 'admin') 
route.post("/Addstudent",student_Route.Addstudent);

//get a student by id
//verifyAccessToken, restrctUser.restrict('user', 'admin'), 
route.get("/getStudent/:id", student_Route.getStudent);


//update a student by id

//verifyAccessToken, restrctUser.restrict('user', 'admin'), 
route.put("/updateStudent/:id", student_Route.updateStudent);

route.patch("/updateStudent/:id", student_Route.updateStudent);


//delete a student by id
//verifyAccessToken, restrctUser.restrict('user', 'admin'),
route.delete('/deleteStudent/:id', student_Route.deleteStudent);


module.exports = route;

