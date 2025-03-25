// const express = require('express');
const mongoose = require('mongoose');

//creating the schema
const Schema = mongoose.Schema;

//creating the lecturer schema
const lecturerSchema = new Schema({
  
    Fulname:{
        type:String,
        required:[true,"Name is required"]
    },
    phone:{
        type:String,
        required:[true,"phone number is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"]
    },
    gender:{
        type:String
    }
});

//creating the model
const lecturerModel = mongoose.model('lecturers',lecturerSchema);

//exporting the model
module.exports = lecturerModel;