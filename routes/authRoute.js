const express = require('express');
const Router = express.Router();

const authController = require('../StudentController/authController');

Router.post('/register',authController.register)

Router.get('/login', authController.login);

module.exports = Router;

