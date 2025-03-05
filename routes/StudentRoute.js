const express = require("express");
const router = express.Router();

const student_Route = require("../StudentController/studentController");

// authenticate middleware
const {verifyAccessToken } = require('../helpers/JwtHelper');

//get all students from the database
router.get("/getAllStudents", verifyAccessToken, student_Route.getAllStudents);

//add a student to the database 
router.post("/addStudent", student_Route.addStudent);

//get a student by id
router.get("/getStudentById/:id", student_Route.getStudentById);

//update a student by id
router.put("/updateStudent/:id", student_Route.updateStudent);

//delete a student by id
router.delete('/deleteStudent/:id', student_Route.deleteStudent);

module.exports = router;
