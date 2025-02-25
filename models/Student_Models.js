const mongoose = require('mongoose'); //declare mongoose to use in our api
const Schema = mongoose.Schema; //creating our schema to handle complex user data

//User model schema to handle user details 
const Student_Schema = new Schema({
    Fname:{
        type : String,
        required: [true, 'Fname is required']
    },
    Lname:{
        type: String,
        required: [true, 'Lname required']
    },
    Gender:{
        type: String
    }
});

//creating the model to represent our collection in DB
const Student = mongoose.model('student',Student_Schema);

//exporting models file so we can use it in other files
module.exports = Student;