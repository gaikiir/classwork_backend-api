//setting up our lecturer router
const express = require('express');//import express 
const Router = express.Router();//initialize express router

const Lect_Route_Controller = require('../StudentController/Lecturer_Controller');






Router.get('/getAllLecturers', Lect_Route_Controller.getAllLecturers);
Router.post('/addLecturer', Lect_Route_Controller.addLecturer);

Router.get('/getLecturerById/:id',Lect_Route_Controller. getLecturerById);
Router.put('/UpdateLecturer/:id', Lect_Route_Controller.UpdateLecturer);
Router.patch('/UpdateLecturer/:id', Lect_Route_Controller.UpdateLecturer);
Router.delete('/deleteLecturer/:id', Lect_Route_Controller.deleteLecturer);
//exporting the router
module.exports = Router;